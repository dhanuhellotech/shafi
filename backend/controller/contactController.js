// controllers/contactController.js

const Contact = require('../model/Contact');

exports.createContact = async (req, res) => {
  try {
    const { name, email, phoneNumber, category, subject, comments } = req.body;

    // Check if the category is provided
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Create a new contact based on the category
    let newContact;
    if (category === 'studyCenter' || category === 'hospital' || category === 'treatments' || category === 'products') {
      newContact = new Contact({
        name,
        email,
        phoneNumber,
        [category]: {
          comments,
          subjects: subject
        }
      });
    } else {
      // Invalid category provided
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Save the contact to the database
    await newContact.save();

    // Send success response
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getContactbyId = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
