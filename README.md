# Todo Website

Welcome to the Todo Website! 🚀 This project is a full-stack application built with Node.js and React, styled using Material UI, and powered by a MySQL database. It provides a seamless and interactive experience for managing projects and tasks, with robust authentication and dynamic features.

## Features

- **User Authentication:**
  - Secure user login and registration with unique authentication codes for each user.
  
- **Project Management:**
  - Create, view, and manage your own projects.
  - Only project owners can edit their projects.
  - View and collaborate on projects with other users.
  
- **Public Projects:**
  - Discover and browse all public projects created by users.
  
- **Dynamic Search Bar:**
  - Quickly find projects with a real-time, dynamic search feature.
  
- **Profile Page:**
  - Access and manage your profile.
  - View your created projects and the projects you’re collaborating on.
  
- **Task Management:**
  - Organize tasks into different statuses: To Do, In Progress, and Done.
  - Drag-and-drop functionality to update task statuses.
  
- **Pagination:**
  - Navigate through large sets of projects or tasks with pagination controls for better user experience.
  
- **Responsive Design:**
  - Beautiful and responsive UI built with Material UI.
  
- **Animations:**
  - Smooth transitions and animations enhance user experience.

## Setup

### Prerequisites
- **Node.js:** Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **MySQL:** Ensure you have MySQL installed and configured. [Download MySQL](https://dev.mysql.com/downloads/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/todo-website.git
Navigate to the project directory:

bash
نسخ الكود
cd todo-website
Install dependencies:

bash
نسخ الكود
npm install
Configure MySQL Database:

Create a new MySQL database.
Import the schema from the database/schema.sql file.
Update the database connection settings in the .env file:
env
نسخ الكود
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=tododb
Start the development server:

bash
نسخ الكود
npm start
Usage
Authentication
Register and log in to access the application. Each user receives a unique authentication code.
Project Management
Create new projects, view public projects, and manage your own projects.
Task Management
Use drag-and-drop to organize tasks by status and manage them efficiently.
Pagination
Navigate through projects and tasks with pagination controls for improved performance and usability.
Contributing
Contributions are welcome! If you have suggestions, improvements, or bug fixes, please feel free to submit a pull request or open an issue.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or inquiries, please contact aymanhaniadas28@gmail.com.

### Key Additions:

- **Pagination:** Added a note about pagination controls for managing large sets of data.
- **MySQL Configuration:** Detailed instructions on setting up MySQL and configuring the `.env` file.
- **Database Schema:** Instructions for importing the schema from `database/schema.sql`.

Feel free to adjust any specific details (like URLs, paths, or configuration settings) to match your project’s requirements.
