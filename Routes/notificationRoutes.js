
const express = require('express');
const router = express.Router();
const { 
  createNotification,
  getNotifications,
  markAsRead,
  markAsUnread,
  markAllAsRead,
  getUnreadCount,
  updatePreferences
} = require('../controllers/notificationController');

const { authenticateUser } = require('../middleware/middleware');

router.post('/', authenticateUser, createNotification);
router.get('/', authenticateUser, getNotifications); 
router.patch('/:id/read', authenticateUser, markAsRead);
router.patch('/:id/unread', authenticateUser, markAsUnread);
router.patch('/read/all', authenticateUser, markAllAsRead);
router.get('/unread/count', authenticateUser, getUnreadCount);
router.patch('/preferences', authenticateUser, updatePreferences);

module.exports = router;
