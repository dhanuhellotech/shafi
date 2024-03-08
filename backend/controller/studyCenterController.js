// controllers/studyCenterController.js

const StudyCenter = require('../model/StudyCenter');

// Create a new study center
exports.createStudyCenter = async (req, res) => {
  try {
    const studyCenter = new StudyCenter(req.body);
    await studyCenter.save();
    res.status(201).json({ message: 'Study center created successfully' });
  } catch (error) {
    console.error('Error creating study center:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all study centers
exports.getAllStudyCenters = async (req, res) => {
  try {
    const studyCenters = await StudyCenter.find();
    res.status(200).json(studyCenters);
  } catch (error) {
    console.error('Error fetching study centers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single study center by ID
exports.getStudyCenterById = async (req, res) => {
  try {
    const studyCenter = await StudyCenter.findById(req.params.id);
    if (!studyCenter) {
      return res.status(404).json({ error: 'Study center not found' });
    }
    res.status(200).json(studyCenter);
  } catch (error) {
    console.error('Error fetching study center by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a study center by ID
exports.updateStudyCenterById = async (req, res) => {
  try {
    const updatedStudyCenter = await StudyCenter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudyCenter) {
      return res.status(404).json({ error: 'Study center not found' });
    }
    res.status(200).json({ message: 'Study center updated successfully', updatedStudyCenter });
  } catch (error) {
    console.error('Error updating study center by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a study center by ID
exports.deleteStudyCenterById = async (req, res) => {
  try {
    const deletedStudyCenter = await StudyCenter.findByIdAndDelete(req.params.id);
    if (!deletedStudyCenter) {
      return res.status(404).json({ error: 'Study center not found' });
    }
    res.status(200).json({ message: 'Study center deleted successfully', deletedStudyCenter });
  } catch (error) {
    console.error('Error deleting study center by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
