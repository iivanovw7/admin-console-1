import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  branch: {
    type: Schema.Types.ObjectId,
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

// Define indexes
messageSchema.index({ subject: 'text' });

function autoPopulate(next) {
  this.populate('sender', ['name', 'surname']);
  next();
}

messageSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate);

export default model('Message', messageSchema);