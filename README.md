🏨 EZStay — Full Stack Web Application

EZStay is a full-stack accommodation listing web application designed for tourists to explore stays across different cities.
It demonstrates complete frontend–backend–database integration with authentication, admin management, and cloud deployment.


🌐 Live Demo
Frontend: https://ez-stay.vercel.app
Backend API: https://ezstay-backend.onrender.com


✨ Features
👤 User
User authentication (Register & Login)
Browse cities
View stays available in each city
View stay details

🧑‍💼 Admin
Add new cities
Add stays under specific cities


🛠️ Tech Stack
Frontend
React.js
Bootstrap
Axios
React Router DOM

Backend
Node.js
Express.js
JWT Authentication

Database
MySQL
Deployment

Frontend: Vercel

Backend: Render

Database: Railway


🗂️ Project Structure
EZStay/
├── client/        # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/        # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── db/
│   ├── index.js
│   └── package.json
│
└── README.md


🔐 Authentication
JWT-based authentication
Secure login & protected admin routes
Role-based access (User / Admin)


🧪 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/cities	Get all cities
POST	/api/cities	Add city (Admin)
GET	/api/stays/:cityId	Get stays by city
POST	/api/stays	Add stay (Admin)


🚀 Deployment Overview
Backend deployed on Render as a Web Service
MySQL database hosted on Railway
Frontend deployed on Vercel
Backend connected to Railway via public MySQL proxy
Environment variables securely managed in cloud platforms


📚 Learning Outcomes
Built a complete full-stack application
Implemented RESTful APIs
Worked with MySQL relational database
Managed JWT authentication
Handled cloud deployment & networking issues
Understood real-world production debugging


👨‍💻 Author
Tanmay Tawade


⭐ If you like this project, feel free to star the repository!
