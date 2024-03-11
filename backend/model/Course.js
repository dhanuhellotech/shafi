// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseDuration: { type: String, required: true },
  courseBriefDescription: { type: String, required: true },
  image: { type: String, required: true }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
