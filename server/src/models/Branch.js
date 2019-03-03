const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: 'You must supply a name'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'You must supply email address'
  },
  phone: {
    type: String,
    trim: true,
    required: 'You must supply a phone number'
  },
  fax: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: 'You must supply an address'
  },
  additional: String,
  active: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Branch', branchSchema);