import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema({
  authorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  branchId: {
    type: mongoose.Schema.ObjectId,
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

export default mongoose.model('Ticket', ticketSchema);