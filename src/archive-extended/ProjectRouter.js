const express = require('express');
const projectRouter = express.projectRouter();

const { projects } = require('../services/UserData.js');
const { authUser } = require('../controllers/AuthHandler.js');
const { canViewProject, canDeleteProject, scopedProjects } = require('../services/ProjectService.js')
import {
    setProject, authGetProject, authDeleteProject,
} from "../controllers/ProjectHandler.js";

projectRouter.get('/', authUser, (req, res) => {
    res.json(scopedProjects(req.user, projects));
})

projectRouter.get('/:projectId', setProject, authUser, authGetProject, (req, res) => {
    res.json(req.project);
})

projectRouter.delete('/:projectId', setProject, authUser, authDeleteProject, (req, res) => {
    res.send('Deleted Project');
})

module.exports = projectRouter;