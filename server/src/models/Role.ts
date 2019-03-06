import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: 'You should supply a role name'
  },
  code: {
    type: String,
    unique: true,
    trim: true,
    uppercase: true,
    required: 'You must supply a code identifier for role'
  },
  description: String,
  active: {
    type: Boolean,
    default: false
  }
});

export default model('Role', roleSchema);