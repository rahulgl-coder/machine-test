 Notification Feed API



##  Features
- JWT Authentication
- Follow, Like, Comment Notifications
- Real-time Notifications (Socket.IO)
- Mark as Read/Unread (Bulk supported)
- Pagination Support
- Notification Preferences
- Unread Count
- Modular Code Structure

---

##  Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/rahulgl-coder/machine-test



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
npm start
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

### POST
- `POST/api/post/add`-Add Post

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

##  Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Socket.IO
- dotenv, bcryptjs, cors

---

