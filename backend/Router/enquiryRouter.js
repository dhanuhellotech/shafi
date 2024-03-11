const express = require('express');
const router = express.Router();
const enquiryController = require('../controller/enquiryController');

// POST route to create a new enquiry
router.post('/enquiries', enquiryController.createEnquiry);

// GET route to fetch all enquiries
router.get('/enquiries', enquiryController.getAllEnquiries);
router.delete('/enquiries/:id', enquiryController.deleteEnquiry);   
module.exports = router;
