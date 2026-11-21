const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

const GITHUB_OWNER = 'saanvika-chidurala';
const GITHUB_REPO = 'my-portfolio';
const GITHUB_BRANCH = 'main';

const PROJECTS_FILE_PATH = 'backend/projects.json';
const SKILLS_FILE_PATH = 'backend/skills.json';

// Read projects from GitHub
async function getGitHubProjects() {
    try {
        const response = await octokit.repos.getContent({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: PROJECTS_FILE_PATH,
            ref: GITHUB_BRANCH
        });

        const fileContent = Buffer.from(
            response.data.content,
            'base64'
        ).toString('utf8');

        return JSON.parse(fileContent);

    } catch (error) {
        if (error.status === 404) {
            return projects;
        }

        throw error;
    }
}

// Save projects to GitHub
async function saveProjectsToGitHub(projectsData) {
    let sha;

    try {
        const response = await octokit.repos.getContent({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: PROJECTS_FILE_PATH,
            ref: GITHUB_BRANCH
        });

        sha = response.data.sha;

    } catch (error) {
        if (error.status !== 404) {
            throw error;
        }
    }

    await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: PROJECTS_FILE_PATH,
        message: 'Update portfolio projects',
        content: Buffer.from(
            JSON.stringify(projectsData, null, 4)
        ).toString('base64'),
        branch: GITHUB_BRANCH,
        ...(sha ? { sha } : {})
    });
}

// Read skills from GitHub
async function getGitHubSkills() {
    const response = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: SKILLS_FILE_PATH,
        ref: GITHUB_BRANCH
    });

    const fileContent = Buffer.from(
        response.data.content,
        'base64'
    ).toString('utf8');

    return JSON.parse(fileContent);
}


// Save skills to GitHub
async function saveSkillsToGitHub(skillsData) {
    let sha;

    try {
        const response = await octokit.repos.getContent({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: SKILLS_FILE_PATH,
            ref: GITHUB_BRANCH
        });

        sha = response.data.sha;

    } catch (error) {
        if (error.status !== 404) {
            throw error;
        }
    }

    await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: SKILLS_FILE_PATH,
        message: 'Update portfolio skills',
        content: Buffer.from(
            JSON.stringify(skillsData, null, 4)
        ).toString('base64'),
        branch: GITHUB_BRANCH,
        ...(sha ? { sha } : {})
    });
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));



// Middleware to read JSON request bodies
app.use(express.json());



let projects = [];

let skills = [];

app.get('/api/skills', async (req, res) => {
    try {
        skills = await getGitHubSkills();
        res.json(skills);

    } catch (error) {
        console.error('GitHub skills read error:', error.message);
        res.status(500).json({
            message: 'Could not load skills'
        });
    }
});


app.post('/api/skills', async (req, res) => {
    const { skill } = req.body;

    if (typeof skill !== 'string' || !skill.trim()) {
        return res.status(400).json({
            message: 'Skill name is required'
        });
    }

    try {
        skills = await getGitHubSkills();

        const skillExists = skills.some(
            existingSkill =>
                existingSkill.toLowerCase() === skill.trim().toLowerCase()
        );

        if (skillExists) {
            return res.status(409).json({
                message: 'This skill already exists'
            });
        }

        skills.push(skill.trim());

        await saveSkillsToGitHub(skills);

        res.status(201).json({
            message: 'Skill added successfully',
            skill: skill.trim()
        });

    } catch (error) {
        console.error('GitHub skills save error:', error.message);
        res.status(500).json({
            message: 'Could not save skill'
        });
    }
});


app.delete('/api/skills/:skillName', async (req, res) => {
    const skillName = decodeURIComponent(req.params.skillName);

    try {
        skills = await getGitHubSkills();

        const skillExists = skills.some(
            skill => skill.toLowerCase() === skillName.toLowerCase()
        );

        if (!skillExists) {
            return res.status(404).json({
                message: 'Skill not found'
            });
        }

        skills = skills.filter(
            skill => skill.toLowerCase() !== skillName.toLowerCase()
        );

        await saveSkillsToGitHub(skills);

        res.json({
            message: 'Skill deleted successfully'
        });

    } catch (error) {
        console.error('GitHub skills delete error:', error.message);
        res.status(500).json({
            message: 'Could not delete skill'
        });
    }
});



// GET: Retrieve all projects
app.get('/api/projects', async (req, res) => {
    try {
        projects = await getGitHubProjects();
        res.json(projects);

    } catch (error) {
        console.error('GitHub read error:', error.message);

        res.status(500).json({
            message: 'Could not load projects'
        });
    }
});

// POST: Add a new project


app.post('/api/projects', async (req, res) => {
    const { title, description } = req.body;

    if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        !title.trim() ||
        !description.trim()
    ) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    const newProject = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim()
    };

    try {
        projects = await getGitHubProjects();
        projects.push(newProject);

        await saveProjectsToGitHub(projects);

        res.status(201).json(newProject);

    } catch (error) {
        console.error('GitHub save error:', error.message);

        res.status(500).json({
            message: 'Could not save project to GitHub'
        });
    }
});

// PUT: Update an existing project

app.put('/api/projects/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        !title.trim() ||
        !description.trim()
    ) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    try {
        projects = await getGitHubProjects();

        const project = projects.find(p => p.id === id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        project.title = title.trim();
        project.description = description.trim();

        await saveProjectsToGitHub(projects);

        res.json({
            message: "Project updated successfully",
            project: project
        });

    } catch (error) {
        console.error('GitHub update error:', error.message);

        res.status(500).json({
            message: 'Could not update project on GitHub'
        });
    }
});

// DELETE: Remove a project
app.delete('/api/projects/:id', async (req, res) => {
    const id = Number(req.params.id);

    try {
        projects = await getGitHubProjects();

        const projectExists = projects.some(p => p.id === id);

        if (!projectExists) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        projects = projects.filter(p => p.id !== id);

        await saveProjectsToGitHub(projects);

        res.json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        console.error('GitHub delete error:', error.message);

        res.status(500).json({
            message: 'Could not delete project from GitHub'
        });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});