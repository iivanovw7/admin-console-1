import mongoose, { Schema } from 'mongoose';

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
    required: 'You must supply a message'
  },
  created: {
    type: Date,
    default: Date.now,

  }
});

export default mongoose.model('Message', messageSchema);