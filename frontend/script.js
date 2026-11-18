async function loadProjects() {
    try {
        const response = await fetch('https://my-portfolio-asst.onrender.com//api/projects');
        const projects = await response.json();

        const container = document.getElementById('projects-container');
        container.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';

            const title = document.createElement('h3');
            title.textContent = project.title;

            const description = document.createElement('p');
            description.textContent = project.description;

            card.appendChild(title);
            card.appendChild(description);

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

loadProjects();

async function loadSkills() {
    try {
        const response = await fetch('https://my-portfolio-asst.onrender.com//api/skills');
        const skills = await response.json();

        const container = document.getElementById('skills-container');
        container.innerHTML = '';

        skills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.textContent = skill;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

loadSkills();

