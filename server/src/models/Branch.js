import mongoose, { Schema } from 'mongoose';
import { isEmail } from 'validator';

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
    validate: [isEmail, 'Invalid Email Address'],
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

export default mongoose.model('Branch', branchSchema);