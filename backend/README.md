📌 Task Management System
🚀 Project Overview
The Task Management System is a full-stack web application designed for efficiently managing tasks.
It features a modern UX/UI and is built with:

Backend: Express.js + SQLite (Node.js)
Frontend: React.js with Vercel deployment
Security: API authentication using an API key
API Documentation: Swagger for interactive API testing
Responsive Design: Optimized for mobile & desktop
Modern UX/UI: Simple, intuitive, and user-friendly interface
🌍 Live Demo
Frontend (React.js on Vercel):
🔗 Live App
Backend (Express.js on Render):
🔗 Swagger API Docs
🛠 Steps to Run the Project Locally
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/ybmn1995/task-management-system.git
cd task-management-system
2️⃣ Install Dependencies
Navigate into the backend and frontend folders and install dependencies:

Backend Setup
sh
Copy
Edit
cd backend
npm install
Frontend Setup
sh
Copy
Edit
cd ../frontend
npm install
3️⃣ Set Up Environment Variables
Create a .env file in both backend and frontend directories.

Backend (backend/.env)
sh
Copy
Edit
API_KEY=my-secure-api-key
PORT=5000
Frontend (frontend/.env)
sh
Copy
Edit
REACT_APP_API_URL=https://task-management-system-kwt1.onrender.com
REACT_APP_API_KEY=my-secure-api-key
4️⃣ Start the Servers
Run the following commands in separate terminals:

Start Backend
sh
Copy
Edit
cd backend
npm start
Backend will run at http://localhost:5000

Start Frontend
sh
Copy
Edit
cd frontend
npm start
Frontend will run at http://localhost:3000

📌 Features
🔹 Backend (Node.js + Express)
✅ Task Management API with CRUD operations:

GET /tasks → Fetch all tasks
POST /tasks → Create a new task
PUT /tasks/:id → Update an existing task
DELETE /tasks/:id → Delete a task
✅ Authentication & Security:
API Key authentication
✅ Database Integration:
Uses SQLite3 (can be upgraded to PostgreSQL for production)
✅ Validation & Clean Code:
Input validation & modularized code
✅ Swagger API Documentation:
Available at Swagger Docs
✅ Environment Variables (.env) for security
✅ Deployed on Render (Auto-deploys on Git push)
🔹 Frontend (React + Vercel)
✅ Modern UX/UI with a responsive design
✅ Connects with backend API using fetch()
✅ Environment Variables (.env) for API config
✅ Deployed on Vercel with automatic GitHub deployment
✅ Live Demo: Frontend App

📌 Deployment Details
GitHub Repository:
🔗 GitHub Repository
Backend API on Render:
🔗 Swagger API Docs
Frontend on Vercel:
🔗 Live Frontend
📌 Next Steps
🚀 Upgrade SQLite to PostgreSQL for production
🛡 Add JWT authentication
🌍 Add Multi-language support
📱 Improve mobile UX/UI responsiveness
🛠 Created with ❤️ by Yousof Nabtiti