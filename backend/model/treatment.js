const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({

  title: String,
  description: String,
  briefDescription: String,
  image: String,
  pid:{
    type:String,
    required:true
  },
});

module.exports = mongoose.model('Treatment', treatmentSchema);
