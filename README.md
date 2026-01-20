# InformAid 🧑‍🦽

**Government Scheme Information Portal for Persons with Disabilities**

A full-stack web application that helps persons with disabilities discover and access government welfare schemes tailored to their needs.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://informaid-portal.web.app)
[![Backend API](https://img.shields.io/badge/API-Render-blue?style=for-the-badge)](https://informaid-api.onrender.com/health)

---

## ✨ Features

- **🔐 User Authentication** - Secure signup/login with email OTP verification
- **📂 Category-Based Browsing** - Schemes organized by disability type (Visual, Hearing, Locomotor, etc.)
- **🔍 Smart Search** - Fast client-side search using **Trie** data structure
- **🎯 Personalized Recommendations** - Graph-based (BFS/DFS) scheme recommendations
- **🌙 Dark Mode** - Toggle between light and dark themes
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Create React App)
- **Material UI** - Component library
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM
- **JWT** - Authentication tokens
- **Nodemailer** - Email OTP service
- **bcrypt** - Password hashing

### Data Structures & Algorithms
- **Trie** - Efficient prefix-based search
- **Graph (BFS/DFS)** - Scheme recommendations

---

## 🏗️ Architecture

```
┌─────────────────────────────┐     ┌─────────────────────────────┐
│   Firebase Hosting (Free)   │     │     Render.com (Free)       │
│   informaid-portal.web.app  │────▶│   informaid-api.onrender.com│
│        React Frontend       │     │     Express Backend         │
└─────────────────────────────┘     └──────────────┬──────────────┘
                                                   │
                                    ┌──────────────▼──────────────┐
                                    │      MongoDB Atlas          │
                                    │       (Free Tier)           │
                                    └─────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Gmail account for OTP emails

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yusufamjhera-code/InformAid.git
   cd InformAid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the root directory
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/informaid
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   JWT_SECRET=your-secret-key
   ```

4. **Start the backend server**
   ```bash
   node server.js
   ```

5. **Start the React development server** (in a new terminal)
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📁 Project Structure

```
informaid/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components (Home, Login, Signup, etc.)
│   ├── utils/            # Utility functions
│   ├── api.js            # Centralized Axios instance
│   └── App.js            # Main app component with routing
├── server.js             # Express backend server
├── package.json          # Dependencies
└── README.md
```

---

## 🌐 Deployment

The application is deployed using free-tier services:

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Firebase Hosting | [informaid-portal.web.app](https://informaid-portal.web.app) |
| Backend | Render.com | [informaid-api.onrender.com](https://informaid-api.onrender.com) |
| Database | MongoDB Atlas | Cloud-hosted |

> ⚠️ **Note**: The Render free tier may have a ~30 second cold start delay after periods of inactivity.


---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---

## 👨‍💻 Author

**Yusuf Amjhera**

- GitHub: [@yusufamjhera-code](https://github.com/yusufamjhera-code)

---

## 🙏 Acknowledgments

- Government of India for scheme data
- All contributors and testers

---

<p align="center">
  Made with ❤️ for accessibility
</p>
