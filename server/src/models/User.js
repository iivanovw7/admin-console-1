const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true
  },
  surname: {
    type: String,
    trim: true
  },
  groupId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Group',
    required: 'Group should be chosen for all users'
  },
  branchId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Branch',
    required: 'Branch should be chosen for all users'
  },
  role: {
    type: mongoose.Schema.ObjectId,
    ref: 'Role',
    required: 'User should have a role'
  },
  status: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);