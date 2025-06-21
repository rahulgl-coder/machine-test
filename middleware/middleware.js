
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: 'Invalid token' });

    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No token')); 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(new Error('Invalid user'));

    socket.userId = user._id.toString();
    next();
  } catch (err) {
    next(new Error('Unauthorized socket connection'));
  }
};

module.exports = {
  authenticateUser,
  authenticateSocket
};
