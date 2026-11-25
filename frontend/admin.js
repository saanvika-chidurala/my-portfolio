
// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL = 'https://zxxznrqbrmasxrphgwjf.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_YKU6oyLHZ4ktCJ7nLJpomg_aflMC8wM';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// ==========================================
// HTML ELEMENTS
// ==========================================

const loginSection = document.getElementById('login-section');
const dashboardContent = document.getElementById('dashboard-content');

const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-btn');
const loginMessage = document.getElementById('login-message');


// ==========================================
// AUTHENTICATION
// ==========================================

// Get the current access token
async function getAccessToken() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        throw new Error('Please log in first.');
    }

    return data.session.access_token;
}


// Login
loginForm.addEventListener('submit', async function(event) {

    event.preventDefault();

    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    loginMessage.textContent = 'Logging in...';

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        loginMessage.textContent = error.message;
        return;
    }

    loginForm.reset();

    await showDashboard();

});


// Logout
logoutButton.addEventListener('click', async function() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert('Could not log out. Please try again.');
        return;
    }

    showLogin();

});


// Show login screen
function showLogin() {

    loginSection.hidden = false;
    dashboardContent.hidden = true;
    logoutButton.hidden = true;

}


// Show dashboard
async function showDashboard() {

    loginSection.hidden = true;
    dashboardContent.hidden = false;
    logoutButton.hidden = false;

    await loadAdminProjects();
    await loadAdminSkills();

}


// Restore an existing session
async function initializeAuthentication() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        showLogin();
        return;
    }

    showDashboard();

}


// ==========================================
// PROJECT MANAGEMENT
// ==========================================

let editingProjectId = null;

const projectForm = document.getElementById('project-form');


projectForm.addEventListener('submit', async function(event) {

    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const projectData = {
        title,
        description
    };

    const isEditing = editingProjectId !== null;

    const url = isEditing
        ? `/api/projects/${editingProjectId}`
        : '/api/projects';

    try {

        const token = await getAccessToken();

        const response = await fetch(url, {
            method: isEditing ? 'PUT' : 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify(projectData)
        });

        const result = await response.json();

        if (response.ok) {

            alert(isEditing
                ? 'Project updated successfully! ♡'
                : 'Project added successfully! ♡'
            );

            projectForm.reset();

            editingProjectId = null;

            document.querySelector('#project-form button').textContent =
                'Add Project';

            loadAdminProjects();

        } else {

            alert(result.message || 'Something went wrong.');

        }

    } catch (error) {

        console.error('Error saving project:', error);
        alert(error.message || 'Could not connect to the backend.');

    }

});


// Load projects
async function loadAdminProjects() {

    try {

        const response = await fetch('/api/projects');

        const projects = await response.json();

        const container = document.getElementById('admin-projects');

        container.innerHTML = '';

        projects.forEach(project => {

            const card = document.createElement('div');
            card.className = 'project-card';

            const title = document.createElement('h3');
            title.textContent = project.title;

            const description = document.createElement('p');
            description.textContent = project.description;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';

            editButton.addEventListener('click', function() {
                editProject(project);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';

            deleteButton.addEventListener('click', function() {
                deleteProject(project.id);
            });

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(editButton);
            card.appendChild(deleteButton);

            container.appendChild(card);

        });

    } catch (error) {

        console.error('Error loading admin projects:', error);

    }

}


// Delete project
async function deleteProject(id) {

    try {

        const token = await getAccessToken();

        const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',

            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {

            alert('Project deleted successfully!');
            loadAdminProjects();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error('Error deleting project:', error);
        alert(error.message);

    }

}


// Edit project
function editProject(project) {

    editingProjectId = project.id;

    document.getElementById('title').value = project.title;
    document.getElementById('description').value = project.description;

    document.querySelector('#project-form button').textContent =
        'Save Changes';

}


// ==========================================
// SKILLS MANAGEMENT
// ==========================================

const skillForm = document.getElementById('skill-form');


// Add skill
skillForm.addEventListener('submit', async function(event) {

    event.preventDefault();

    const skill = document.getElementById('skill-name').value;

    try {

        const token = await getAccessToken();

        const response = await fetch('/api/skills', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({ skill })

        });

        const result = await response.json();

        if (response.ok) {

            alert('Skill added successfully! ♡');

            skillForm.reset();

            loadAdminSkills();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error('Error adding skill:', error);
        alert(error.message);

    }

});


// Load skills
async function loadAdminSkills() {

    try {

        const response = await fetch('/api/skills');

        const skills = await response.json();

        const container = document.getElementById('admin-skills');

        container.innerHTML = '';

        skills.forEach(skill => {

            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            const skillName = document.createElement('span');
            skillName.textContent = skill;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '×';
            deleteButton.className = 'skill-delete-btn';

            deleteButton.addEventListener('click', function() {
                deleteSkill(skill);
            });

            skillItem.appendChild(skillName);
            skillItem.appendChild(deleteButton);

            container.appendChild(skillItem);

        });

    } catch (error) {

        console.error('Error loading skills:', error);

    }

}


// Delete skill
async function deleteSkill(skill) {

    try {

        const token = await getAccessToken();

        const response = await fetch(
            `/api/skills/${encodeURIComponent(skill)}`,
            {
                method: 'DELETE',

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        if (response.ok) {

            alert('Skill deleted successfully! ♡');

            loadAdminSkills();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error('Error deleting skill:', error);
        alert(error.message);

    }

}


// ==========================================
// START APPLICATION
// ==========================================

initializeAuthentication();
