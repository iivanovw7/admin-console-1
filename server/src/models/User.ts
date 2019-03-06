import { Schema, model } from 'mongoose';

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
    type: (Schema as any).ObjectId,
    ref: 'Group',
    required: 'Group should be chosen for all users'
  },
  branchId: {
    type: (Schema as any).ObjectId,
    ref: 'Branch',
    required: 'Branch should be chosen for all users'
  },
  role: {
    type: (Schema as any).ObjectId,
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

export default model('User', userSchema);