const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



// Middleware to read JSON request bodies
app.use(express.json());


// Temporary project data
let projects = [
    {
        id: 1,
        title: "Flashcard Application",
        description: "An AI-powered flashcard generator"
    },
    {
        id: 2,
        title: "Portfolio Website",
        description: "A dynamic personal portfolio"
    }
];

let skills = [
    "Python",
    "JavaScript",
    "HTML",
    "CSS"
];

app.get('/api/skills', (req, res) => {
    res.json(skills);
});



app.post('/api/skills', (req, res) => {
    const { skill } = req.body;

    if (typeof skill !== 'string' || !skill.trim()) {
        return res.status(400).json({
            message: "Skill name is required"
        });
    }

    const skillExists = skills.some(
        existingSkill =>
            existingSkill.toLowerCase() === skill.trim().toLowerCase()
    );

    if (skillExists) {
        return res.status(409).json({
            message: "This skill already exists"
        });
    }

    skills.push(skill.trim());

    res.status(201).json({
        message: "Skill added successfully",
        skill: skill.trim()
    });
});



app.delete('/api/skills/:skillName', (req, res) => {
    const skillName = decodeURIComponent(req.params.skillName);

    const skillExists = skills.some(
        skill => skill.toLowerCase() === skillName.toLowerCase()
    );

    if (!skillExists) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }

    skills = skills.filter(
        skill => skill.toLowerCase() !== skillName.toLowerCase()
    );

    res.json({
        message: "Skill deleted successfully"
    });
});



// GET: Retrieve all projects
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// POST: Add a new project


app.post('/api/projects', (req, res) => {
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

    projects.push(newProject);

    res.status(201).json(newProject);
});

// PUT: Update an existing project

app.put('/api/projects/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

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

    project.title = title.trim();
    project.description = description.trim();

    res.json({
        message: "Project updated successfully",
        project: project
    });
});

// DELETE: Remove a project
app.delete('/api/projects/:id', (req, res) => {
    const id = Number(req.params.id);

    const projectExists = projects.some(p => p.id === id);

    if (!projectExists) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    projects = projects.filter(p => p.id !== id);

    res.json({
        message: "Project deleted successfully"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});