const Course = require('../model/Course');
const multer = require('../middleware/upload');
const sharp = require("sharp");
const cloudinary = require("../middleware/cloudinary");

const uploadImage = multer.single('image');

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resizeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(); // If no file uploaded, move to next middleware
    }

    const resizedImage = await sharp(req.file.buffer)
      .resize(300, 250)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer();

    req.image = resizedImage.toString('base64');
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error resizing image" });
  }
};

const addImagetoCloud = async (req, res, next) => {
  try {
    if (!req.image) {
      return next(); // If no image resized, move to next middleware
    }

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`, {
      folder: "courses" // Make sure the folder parameter is set to "courses"
    });

    if (!result || !result.public_id) {
      throw new Error("Invalid result object or missing public_id");
    }

    req.result = result;
    
    req.publicId = result.public_id; // Assign the public_id property to req.publicId
    next();
  } catch (err) {
    console.error('Error uploading image to cloud:', err);
    return res.status(500).json({ message: "Error uploading image to Cloudinary. Please try again later." });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { courseName, courseDescription, courseDuration, courseBriefDescription } = req.body;

    if (!courseName || !courseDescription || !courseDuration || !courseBriefDescription) {
      return res.status(400).json({ message: 'All fields are required for updating a course' });
    }

    let updatedCourseData = {
      courseName,
      courseDescription,
      courseDuration,
      courseBriefDescription,
    };

    if (req.result) {
      updatedCourseData.image = req.result.secure_url ? req.result.secure_url : undefined;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, courseDuration, courseBriefDescription } = req.body;

    const newCourse = new Course({
      courseName,
      courseDescription,
      courseDuration,
      courseBriefDescription,
      pid: req.result.public_id,
      image: req.result.secure_url,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadImage,
  resizeImage,
  addImagetoCloud
};
