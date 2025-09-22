# Bug Reporting & Tracking System

A **Full-Stack Bug Tracker** built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.  
This application allows users to report bugs, track their status, and manage them through a modern, role-based dashboard with **real-time updates**.


## 🔹 Features

- 🔐 User authentication (Login/Register)
- 👥 Role-based access (Admin/Reporter)
- 🐛 Create and track bugs
- 🔍 Search and filter bugs
- 📊 Status management (Open/In Progress/Closed)
- 🎨 Modern UI with Tailwind CSS

### User Roles
- **Reporter**: Submit bugs and view/update only their own.
- **Admin**: View and update all bugs.

### Bug Management
- Create new bugs with **Title**, **Description**, **Severity**, and **Status**.
- Update bug status: `Open → In Progress → Closed`.
- Search bugs by title.
- Filter bugs by **Status** and **Severity**.

### UI/UX
- Responsive dashboard and forms.
- Modern **frosted-glass and translucent UI** using Tailwind CSS.
- Smooth hover effects, transitions, and animations.

### Authentication
- JWT-based authentication.
- Login, register, and session management.

### Backend
- RESTful API built with **Express.js**.
- **MongoDB** for storing users and bugs.
- Centralized error handling middleware for robust API responses.

### Deployment
- Fully deployed frontend and backend.
- Can be hosted on free platforms like **Render**, **Railway**, **Netlify**, or **Vercel**.

## Tech Stack

**Client:**
- React
- React Router DOM
- Tailwind CSS
- Axios
- AOS (Animate On Scroll)

**Server:**
- Node.js
- Express
- MongoDB
- JWT Authentication
- Bcrypt

## Installation

1. Clone the repository
```bash
git clone https://github.com/BanothuNithin/bug-reporting.git
cd bug-reporting
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup

Create a `.env` file in the server directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

## Running the Application

1. Start the server
```bash
cd server
npm start
```

2. Start the client
```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173` and the server on `http://localhost:5000`

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Bug Routes
- `POST /api/bugs` - Create new bug
- `GET /api/bugs` - Get all bugs
- `PUT /api/bugs/:id` - Update bug status

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔹 Database Schema

### Users Collection
| Field    | Type      | Description                |
|----------|----------|----------------------------|
| _id      | ObjectId | Unique user ID             |
| name     | String   | User full name             |
| email    | String   | User email                 |
| password | String   | Hashed password            |
| role     | String   | reporter / admin / developer |

### Bugs Collection
| Field       | Type      | Description                        |
|------------|----------|------------------------------------|
| _id        | ObjectId | Unique bug ID                      |
| title      | String   | Bug title                          |
| description| String   | Detailed description               |
| severity   | String   | low / medium / high                |
| status     | String   | open / in-progress / closed        |
| reporterId | ObjectId | User who reported the bug          |
| createdAt  | Date     | Timestamp of bug creation          |
| updatedAt  | Date     | Timestamp of last bug update       |

--------
## 🤖 AI Usage

During the development of this Bug Reporting & Tracking System, AI tools such as **ChatGPT** were used as assistants to improve efficiency and ensure best practices. Below is a detailed breakdown:

### Where I Used AI
- **Code Assistance:** Helped in generating boilerplate code for React components, Express routes, and API integration.
- **Debugging Support:** Assisted in identifying and resolving errors during frontend-backend integration, such as CORS issues and state management bugs.
- **UI/UX Enhancements:** Provided guidance on modern UI design patterns using Tailwind CSS, including translucent/frosted-glass effects, hover animations, and responsive layouts.
- **Documentation:** Helped structure and improve the clarity of the README.md file, including step-by-step instructions and API documentation.
- **Testing Guidance:** Suggested approaches for unit testing API endpoints and frontend components.

### Why I Used AI
- **Problem Solving:** To quickly find solutions for common coding challenges and errors without breaking development flow.
- **Learning:** To understand better React patterns, backend API design, JWT authentication, and state management.
- **Efficiency:** To speed up repetitive tasks such as creating forms, components, and request handlers.
- **Best Practices:** To follow industry-standard coding patterns, naming conventions, and folder structures.

### What I Learned
- **Development Workflow:** Improved Git commit practices, structured file organization, and better debugging strategies.
- **UI/UX Design:** Learned to implement visually appealing, modern, and responsive UI with Tailwind CSS.
- **Backend Practices:** Reinforced knowledge of REST API design, JWT authentication, error handling middleware, and role-based access control.
- **Documentation Skills:** Learned to write clear, concise, and recruiter-friendly documentation for projects.
- **Deployment Process:** Gained experience in environment setup, server-client integration, and deployment on free hosting platforms like Vercel and Render.

> **Note:** While AI tools assisted in code suggestions and troubleshooting, all final code was written, reviewed, and customized manually to fit the project's specific requirements. The AI was used as a **guide and productivity enhancer**, not a substitute for development.
<img width="1861" height="960" alt="Screenshot (113)" src="https://github.com/user-attachments/assets/151a87a8-7124-4a38-a535-9df6c538b3b6" />
