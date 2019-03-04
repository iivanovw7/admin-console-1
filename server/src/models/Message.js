const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  groupId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Group'
  },
  branchId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Branch'
  },
  subject: {
    type: String,
    required: 'You must supply a subject'
  },
  message: {
    type: String,
    required: 'You must supply message'
  },
  created: {
    type: Date,
    default: Date.now,

  }
});

module.exports = mongoose.model('Message', messageSchema);