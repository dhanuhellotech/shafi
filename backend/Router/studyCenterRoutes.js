// routes/studyCenterRoutes.js

const express = require('express');
const router = express.Router();
const studyCenterController = require('../controller/studyCenterController');

// Create a new study center
router.post('/', studyCenterController.createStudyCenter);

// Get all study centers
router.get('/', studyCenterController.getAllStudyCenters);

// Get a single study center by ID
router.get('/:id', studyCenterController.getStudyCenterById);

// Update a study center by ID
router.put('/:id', studyCenterController.updateStudyCenterById);

// Delete a study center by ID
router.delete('/:id', studyCenterController.deleteStudyCenterById);

module.exports = router;
