const Treatment = require('../model/treatment');
const multer = require('../middleware/upload');
const sharp = require("sharp");
const cloudinary = require("../middleware/cloudinary");

const uploadImage = multer.single('image');

const getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find();
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resizeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
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
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`, {
      folder: "treatments" // Make sure the folder parameter is set to "treatments"
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

const createTreatment = async (req, res) => {
  try {
    const { title, description, briefDescription } = req.body;

    const newTreatment = new Treatment({
      title,
      description,
      briefDescription,
      pid: req.result.public_id,
      image: req.result.secure_url,
    });

    await newTreatment.save();
    res.status(201).json(newTreatment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const treatmentId = req.params.id;
    const { title, description, briefDescription } = req.body;

    if (!title || !description || !briefDescription) {
      return res.status(400).json({ message: 'All fields are required for updating a treatment' });
    }

    const updatedTreatment = await Treatment.findByIdAndUpdate(
      treatmentId,
      {
        title,
        description,
        briefDescription,
        image: req.result.secure_url ? req.result.secure_url : undefined,
      },
      { new: true }
    );

    if (!updatedTreatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    res.json(updatedTreatment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTreatment = async (req, res) => {
  try {
    const treatmentId = req.params.id;
    const deletedTreatment = await Treatment.findByIdAndDelete(treatmentId);
    if (!deletedTreatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    res.json({ message: 'Treatment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTreatments,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  uploadImage,
  resizeImage,
  addImagetoCloud
};
