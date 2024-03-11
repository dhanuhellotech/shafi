// models/contact.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  studyCenter: {
    comments: {
      type: String
    },
    subjects: {
      type: String
    }
  },
  hospital: {
    comments: {
      type: String
    },
    subjects: {
      type: String
    }
  },
  treatments: {
    comments: {
      type: String
    },
    subjects: {
      type: String
    }
  },
  products: {
    comments: {
      type: String
    },
    subjects: {
      type: String
    }
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
