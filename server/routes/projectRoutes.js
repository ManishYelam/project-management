const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/project', projectController.createProject);
router.get('/projects', projectController.getSortedProjects);
router.put('/projects/:id/status', projectController.updateProjectStatus);
router.get('/dashboard/counters', projectController.counters);
router.get('/dashboard/closure-delay', projectController.closuredelay);
router.get('/dashboard/chart-data', projectController.projectDeptChart);

module.exports = router;


