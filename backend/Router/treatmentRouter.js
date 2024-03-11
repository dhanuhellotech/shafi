const express = require('express');
const router = express.Router();
const treatmentController = require('../controller/treatmentController');

// Define your treatment routes here
router.get('/', treatmentController.getAllTreatments);
router.put('/:id', treatmentController.uploadImage, treatmentController.resizeImage, treatmentController.addImagetoCloud, treatmentController.updateTreatment);
router.post('/', treatmentController.uploadImage, treatmentController.resizeImage, treatmentController.addImagetoCloud, treatmentController.createTreatment);
router.delete('/:id', treatmentController.deleteTreatment);
router.post("/resize", treatmentController.uploadImage, treatmentController.resizeImage, treatmentController.addImagetoCloud, treatmentController.createTreatment);

module.exports = router;
