# DevifyX - Notification Feed API

A complete Node.js + Express + MongoDB backend API for handling user notification feeds for actions like **follow**, **like**, and **comment**. Includes real-time updates using Socket.IO.

## ✅ Features
- JWT Authentication
- Follow, Like, Comment Notifications
- Real-time Notifications (Socket.IO)
- Mark as Read/Unread (Bulk supported)
- Pagination Support
- Notification Preferences
- Unread Count
- Modular Code Structure

---

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd devifyx-notification-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devifyx
JWT_SECRET=your_jwt_secret_key
```

### 4. Start Server
```bash
npm run dev
```

### 5. WebSocket Connection (Client Sample)
```js
const socket = io('http://localhost:5000', {
  auth: { token: '<your_jwt_token>' }
});

socket.on('new_notification', (data) => {
  console.log('📬 New Notification:', data);
});
```

---

## 🔌 API Documentation

### Auth
- `POST /api/auth/signup` – Register user
- `POST /api/auth/login` – Login user

### Notifications
- `POST /api/notifications` – Create a notification (`follow`, `like`, `comment`)
- `GET /api/notifications?page=1&limit=10` – Get paginated notification feed
- `PATCH /api/notifications/:id/read` – Mark as read
- `PATCH /api/notifications/:id/unread` – Mark as unread
- `PATCH /api/notifications/read/all` – Bulk mark all as read
- `GET /api/notifications/unread/count` – Get unread count
- `PATCH /api/notifications/preferences` – Update notification preferences

### Headers
Use the following header for all protected routes:
```http
Authorization: Bearer <jwt_token>
```

---

## 📂 Folder Structure
```
.
├── controllers
├── middleware
├── models
├── routes
├── server.js
├── .env
├── README.md
```

---

## ✅ Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Socket.IO
- dotenv, bcryptjs, cors

---

## 📮 Submission
Submit your GitHub repo + live URL if hosted.

Form: [Assignment Submission Form](https://forms.gle/LAvLWFmHRLXswwsx5)

---

> © 2025 DevifyX – All rights reserved.
