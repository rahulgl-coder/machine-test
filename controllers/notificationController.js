
const Notification = require('../Models/Notification');
const User = require('../Models/User');

exports.createNotification = async (req, res) => {
  try {
    const { recipientId, type, postId} = req.body;
  
    
    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ error: 'Recipient not found' });

console.log(req.user._id);
console.log(recipient.notificationPreferences);


 
    if (!recipient.notificationPreferences[type]) return res.status(200).json({ message: 'Preference disabled' });

  
   const notification = await  Notification.create({
  recipient: recipientId,
  sender: req.user._id,
  type,
  postId: postId || null
})
.then(notification => {
  console.log('Notification created:', notification);
})
.catch(err => {
  console.error('Notification creation failed:', err);
});


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

    const total = await Notification.countDocuments({ recipient: req.user._id });

    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('sender', 'username');

    res.status(200).json({
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalNotifications: total,
      notifications
    });
  } catch (err) {
    console.error(err);
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
