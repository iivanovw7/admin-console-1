import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'You must supply an email'
  },
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name'
  },
  surname: {
    type: String,
    trim: true,
    required: 'You must supply a surname'
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: 'Group should be chosen for all users'
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: 'Branch should be chosen for all users'
  },
  role: {
    type: Schema.Types.ObjectId,
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

// Define indexes
userSchema.index({
  name: 'text',
  surname: 'text'
});

export default model('User', userSchema);