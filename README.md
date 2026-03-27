Project Name

Full Stack Auth & Teacher Management System

Project Link:
https://complete-project-builder-q3ql4weib-pavan6.vercel.app/login

Overview

This is a full-stack web application built using CodeIgniter (Backend) and ReactJS (Frontend). It provides authentication features and manages teacher data with a relational database.

Features
User Registration & Login
Token-based Authentication
REST APIs
Relational Database (MySQL)
React UI with Data Tables
Tech Stack
Frontend: ReactJS
Backend: CodeIgniter (PHP)
Database: MySQL
Tools: Git, Postman
Installation & Setup
1. Clone Repository
git clone <your-repo-link>
cd project-folder
2. Backend Setup (CodeIgniter)
cd backend
composer install
Configure .env or config/database.php
Set:
DB_HOST=localhost
DB_NAME=your_db
DB_USER=root
DB_PASS=your_password
3. Database Setup
Import SQL file:
auth_user
teachers
4. Run Backend
php spark serve
5. Frontend Setup
cd frontend
npm install
npm start
API Endpoints
Endpoint	Method	Description
/register	POST	Register user
/login	POST	Login user
/create-teacher	POST	Insert into both tables
Usage
Register a user
Login to get token
Use token to access APIs
Add teacher data
View data in dashboard
Author

Pavan Kumar

B.Tech CSE, Shiv Nadar University
Skills: Python, Java, Node.js, React, MySQL, ML, GenAI
GitHub

https://github.com/99Pav

Portfolio

https://pavan-six.vercel.app/

Notes
Ensure backend is running before frontend
Token required for protected APIs
Future Improvements
JWT Authentication
Role-based access
Deployment on cloud
