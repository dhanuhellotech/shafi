const Enquiry = require('../model/Enquiry');

// Create a new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry created successfully', enquiry });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.deleteEnquiry = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
      if (!deletedEnquiry) {
        return res.status(404).json({ error: 'Enquiry not found' });
      }
      res.status(200).json({ message: 'Enquiry deleted successfully', enquiry: deletedEnquiry });
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };