// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

router.post('/create', contactController.createContact);

router.get('/contacts/:id', contactController.getContact);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);
module.exports = router;
