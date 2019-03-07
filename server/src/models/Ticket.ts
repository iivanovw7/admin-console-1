import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch'
  },
  message: {
    type: String,
    required: 'You must provide a ticket description'
  },
  note: String,
  status: {
    type: String,
    required: 'You must provide ticket status'
  },
  created: {
    type: Date,
    default: Date.now
  },
  closed: Date
});

// Define indexes
ticketSchema.index({ subject: 'text' });

function autoPopulate(next) {
  this.populate('author', ['name', 'surname']);
  next();
}

ticketSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate);

export default model('Ticket', ticketSchema);