const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

router.get('/', courseController.getAllCourses);
router.post('/', courseController.uploadImage, courseController.resizeImage, courseController.addImagetoCloud, courseController.createCourse);
router.put('/:id', courseController.uploadImage, courseController.resizeImage, courseController.addImagetoCloud, courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.post("/resize", courseController.uploadImage, courseController.resizeImage, courseController.addImagetoCloud, courseController.createCourse);

module.exports = router;
