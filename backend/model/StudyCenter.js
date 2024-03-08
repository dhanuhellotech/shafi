// models/StudyCenter.js

const mongoose = require('mongoose');

const studyCenterSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    nationality: { type: String },
    religion: { type: String },
    motherTongue: { type: String },
    educationalQualification: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    courses: [{ type: String, required: true }]
    });

const StudyCenter = mongoose.model('StudyCenter', studyCenterSchema);

module.exports = StudyCenter;
