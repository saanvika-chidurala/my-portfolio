# Dynamic Personal Portfolio with Admin Dashboard

A dynamic personal portfolio website built using HTML, CSS, JavaScript, Node.js, and Express.js. The application allows portfolio content to be managed through an admin dashboard without manually editing the frontend code.

## Features

### 1. Public Portfolio
- Displays personal portfolio information.
- Dynamically retrieves project information from the backend.
- Displays skills and other portfolio content where configured.
- Responsive and user-friendly interface.

### 2. Admin Dashboard
- Add new projects.
- Edit existing projects.
- Delete projects.
- Manage skills through the backend.
- Changes to projects are reflected on the public portfolio without manually modifying the HTML.

### 3. Backend and API Integration
- Built using Node.js and Express.js.
- REST APIs handle project and skill management.
- Uses JSON for communication between frontend and backend.
- Both the public portfolio and admin dashboard access the same backend data.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML | Website structure |
| CSS | Styling and layout |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend server and REST APIs |
| Git & GitHub | Version control and source code hosting |
| Render | Application deployment |

## Project Structure

```text
my-portfolio/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── admin.html
│   └── admin.js
│
└── README.md
```

## API Endpoints

### Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Retrieve all projects |
| POST | `/api/projects` | Add a new project |
| PUT | `/api/projects/:id` | Update an existing project |
| DELETE | `/api/projects/:id` | Delete a project |

### Skills

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/skills` | Retrieve all skills |
| POST | `/api/skills` | Add a new skill |
| DELETE | `/api/skills/:skillName` | Delete a skill |

## Running the Project Locally

### Prerequisites
- Node.js and npm installed.
- Git installed (optional, for cloning the repository).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/saanvika-chidurala/my-portfolio.git
```

2. Navigate to the backend directory:

```bash
cd my-portfolio/backend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. Open the following URLs in your browser:

- Public Portfolio: `http://localhost:5000/`
- Admin Dashboard: `http://localhost:5000/admin.html`

## Deployment

The application is deployed on Render as a single web service.

- **Public Portfolio:** https://my-portfolio-asst.onrender.com/
- **Admin Dashboard:** https://my-portfolio-asst.onrender.com/admin.html

The Express server serves both the frontend static files and backend API endpoints.

## Limitations

1. **In-Memory Data Storage:** Project and skill information is stored in JavaScript arrays on the backend rather than a database. Data is temporary and will be lost when the server restarts or redeploys.

2. **No Database Persistence:** The application does not use MongoDB, MySQL, or any other database. This is intentional and keeps the implementation beginner-friendly.

3. **Limited Authentication:** The admin dashboard does not currently have a dedicated authentication system. Anyone who knows its URL may be able to access it and modify portfolio content.

4. **Limited Content Management:** The current implementation focuses on basic project and skill management. Advanced features such as image uploads, rich-text editing, and category-based filtering are not included.

5. **Backend Availability:** The application depends on the backend server to retrieve and update content. If the backend is unavailable, dynamic features may not work.

Render Free-Tier Limitations: The free hosting service may spin down after periods of inactivity, causing the first request after inactivity to take longer.

Future Improvements

Integrate a database for permanent data storage.

Add secure admin authentication and authorization.

Support project image uploads.

Improve skills and other portfolio content management.

Add search, filtering, and sorting options.

Enhance responsiveness and accessibility.

Conclusion

This project demonstrates the development of a dynamic personal portfolio using frontend and backend technologies. It showcases REST API integration, CRUD operations, server-side data management, and deployment through Render.

The application provides a simple way to manage portfolio content through an admin dashboard while keeping the public portfolio dynamically updated.
