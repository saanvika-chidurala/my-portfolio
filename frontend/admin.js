let editingProjectId = null;
const projectForm = document.getElementById('project-form');


projectForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const projectData = {
        title: title,
        description: description
    };

    // Check whether we are adding or editing
    const isEditing = editingProjectId !== null;

    const url = isEditing
    ? `/api/projects/${editingProjectId}`
    : '/api/projects';

    try {
        const response = await fetch(url, {
            method: isEditing ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
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

            document.querySelector('#project-form button').textContent = 'Add Project';

            loadAdminProjects();

        } else {
            alert(result.message || 'Something went wrong.');
        }

    } catch (error) {
        console.error('Error saving project:', error);
        alert('Could not connect to the backend.');
    }
});


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

loadAdminProjects();

async function deleteProject(id) {

    try {
        const response = await fetch(
            `/api/projects/${id}`,
            {
                method: 'DELETE'
            }
        );

        const result = await response.json();

        if (response.ok) {
            alert('Project deleted successfully!');
            loadAdminProjects();
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error('Error deleting project:', error);
    }
}

function editProject(project) {

    editingProjectId = project.id;

    document.getElementById('title').value = project.title;

    document.getElementById('description').value = project.description;

    document.querySelector('#project-form button').textContent = 'Save Changes';

}


const skillForm = document.getElementById('skill-form');

skillForm.addEventListener('submit', async function(event) {

    event.preventDefault();

    const skill = document.getElementById('skill-name').value;

    try {
        const response = await fetch('/api/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill: skill })
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
        alert('Could not connect to the backend.');
    }
});


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

loadAdminSkills();


async function deleteSkill(skill) {

    try {
        const response = await fetch(
            `/api/skills/${encodeURIComponent(skill)}`,
            {
                method: 'DELETE'
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
        alert('Could not connect to the backend.');
    }
}

