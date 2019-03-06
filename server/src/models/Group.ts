import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: 'You must supply a group name'
  },
  description: String,
  permissions: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  }
});

export default model('Group', groupSchema);