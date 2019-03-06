import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  authorId: {
    type: (Schema as any).ObjectId,
    ref: 'User'
  },
  branchId: {
    type: (Schema as any).ObjectId,
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

export default model('Ticket', ticketSchema);