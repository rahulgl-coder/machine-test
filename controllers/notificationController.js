// controllers/notificationController.js
const Notification = require('../Models/Notification');
const User = require('../Models/User');

exports.createNotification = async (req, res) => {
  try {
    const { recipientId, type, postId } = req.body;
    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ error: 'Recipient not found' });

    // Respect user notification preferences
    if (!recipient.notificationPreferences[type]) return res.status(200).json({ message: 'Preference disabled' });

    const notification = await Notification.create({
      recipient: recipientId,
      sender: req.user._id,
      type,
      postId: postId || null
    });

    // Send real-time notification
    const io = req.app.get('io');
    io.to(recipientId).emit('new_notification', notification);

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('sender', 'username');

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const updated = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { read: true },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.markAsUnread = async (req, res) => {
  try {
    const updated = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { read: false },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, read: false }, { read: true });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ recipient: req.user._id, read: false });
    res.status(200).json({ unreadCount: count });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { notificationPreferences: updates },
      { new: true }
    );
    res.status(200).json(user.notificationPreferences);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
