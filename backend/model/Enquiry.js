const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  address: {
    type: String
  },
  preferredAppointmentDateTime: {
    type: Date
  },
  preferredDays: {
    type: [String], // Example: ["Monday", "Wednesday", "Friday"]
    default: []
  },
  bestTimeToCall: {
    type: String, // Example: "Morning", "Afternoon", "Evening"
  },
  appointmentType: {
    type: String, // Example: "New Patient", "Routine Appointment"
    required: true
  }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
