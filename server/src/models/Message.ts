import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  senderId: {
    type: (Schema as any).ObjectId,
    ref: 'User'
  },
  groupId: {
    type: (Schema as any).ObjectId,
    ref: 'Group'
  },
  branchId: {
    type: (Schema as any).ObjectId,
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

export default model('Message', messageSchema);