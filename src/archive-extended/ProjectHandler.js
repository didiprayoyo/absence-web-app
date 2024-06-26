/** Extended TODO:
 * projects route handler & middleware here
 */
const {
  canViewProject,
  canDeleteProject,
  scopedProjects,
} = require("../services/ProjectService.js");

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    res.status(404);
    return res.send("Project not found");
  }
  next();
}

function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}

function authDeleteProject(req, res, next) {
  if (!canDeleteProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}

export { setProject, authGetProject, authDeleteProject };
