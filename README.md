# Dynamic Personal Portfolio with Admin Dashboard

A dynamic and responsive personal portfolio website built using HTML, CSS, JavaScript, Node.js, and Express.js. The application includes an admin dashboard that allows portfolio content to be managed without manually editing frontend code.

## Features

### 1. Public Portfolio
- Displays personal information and portfolio details.
- Dynamically displays projects fetched from the backend.
- Displays skills fetched from the backend.
- Responsive and user-friendly interface.
- Automatically reflects content changes made through the admin dashboard.

### 2. Admin Dashboard
- Add new projects.
- Edit existing projects.
- Delete projects.
- Add new skills.
- Delete existing skills.
- Manage portfolio content through a simple interface.

### 3. Backend and REST API
- Built using Node.js and Express.js.
- REST APIs handle project and skill management.
- Uses JSON for data exchange.
- Serves both the frontend and backend from a single application.

### 4. Persistent Data Storage Using GitHub API
- Uses the GitHub REST API to store portfolio data.
- Project information is maintained in `backend/projects.json`.
- Skills information is maintained in `backend/skills.json`.
- Adding, editing, or deleting projects automatically updates the corresponding JSON file in GitHub.
- Adding or deleting skills automatically updates the skills JSON file.
- Data persists across backend restarts and Render redeployments.
- GitHub Personal Access Token is stored securely using environment variables.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML | Website structure |
| CSS | Styling and responsive layout |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend server and REST APIs |
| GitHub REST API | Persistent portfolio data storage |
| Octokit | GitHub API integration |
| dotenv | Local environment variable management |
| Git & GitHub | Version control and repository hosting |
| Render | Application deployment |

## Project Structure

```text
my-portfolio/
│
├── backend/
│   ├── server.js
│   ├── projects.json
│   ├── skills.json
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
├── .gitignore
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
- Node.js and npm
- Git
- A GitHub account
- A GitHub Personal Access Token with repository Contents read and write permissions

### Installation

1. Clone the repository:

```bash
git clone https://github.com/saanvika-chidurala/my-portfolio.git
```

2. Navigate to the backend directory:

```bash
cd my-portfolio/backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file inside the backend directory:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

5. Start the backend server:

```bash
npm start
```

6. Open the application:

- **Public Portfolio:** http://localhost:5000/
- **Admin Dashboard:** http://localhost:5000/admin.html

## Deployment

The application is deployed on Render as a single web service.

- **Public Portfolio:** https://my-portfolio-asst.onrender.com/
- **Admin Dashboard:** https://my-portfolio-asst.onrender.com/admin.html

### Render Configuration

| Setting | Value |
|---|---|
| Root Directory | Repository root |
| Build Command | `cd backend && npm install` |
| Start Command | `cd backend && npm start` |

Add the following environment variable in Render:

- `GITHUB_TOKEN` – GitHub Personal Access Token with repository Contents read and write permissions.

The Express server serves the frontend static files and handles backend API requests.

## Important Notes

1. **GitHub as Data Storage:** Project and skill data is stored in JSON files in the GitHub repository rather than in a traditional database.

2. **Persistent Storage:** Updates are committed to the repository through the GitHub API, so data is not dependent on Render's temporary filesystem.

3. **Security:** The GitHub token must never be exposed in frontend code or committed to the repository. The local `.env` file should be excluded through `.gitignore`.

4. **GitHub Updates:** Each content modification creates a commit in the configured repository branch.

5. **Authentication:** The admin dashboard currently does not include dedicated authentication. Access should be restricted before using it for sensitive or public-facing content management.

## Future Improvements

- Implement secure admin authentication and authorization.
- Support project image uploads.
- Add project categories and filtering.
- Improve accessibility and responsiveness.
- Expand portfolio content management features.

## Conclusion

This project demonstrates the development of a dynamic personal portfolio with an integrated admin dashboard. It showcases frontend and backend integration, REST API development, CRUD operations, GitHub API integration, persistent data storage, and cloud deployment using Render.

The application provides a convenient way to manage portfolio projects and skills while automatically updating the public website.
