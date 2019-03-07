import * as mongodb from 'mongodb';

import Ticket from '../models/Ticket';

const getListOfTickets = async (req, params) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page * limit) - limit;
  // If user typed a search string to filter by name
  const search = req.query.search;
  if (search) {
    params['$text'] = { $search: search };
  }
  // Query the database for a list of tickets
  const ticketPromise = Ticket.find(params).skip(skip).limit(limit).sort({ surname: 'asc' });
  const countPromise = Ticket.countDocuments(params);
  const [tickets, count] = await Promise.all([ticketPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  return {
    tickets,
    count,
    pages
  };
};

export const getAllTickets = async (req, res) => {
  const { tickets, count, pages } = await getListOfTickets(req, {});

  res.json({
    data: tickets,
    total: count,
    pages
  });
};

export const getTicketsByBranchId = async (req, res) => {
  const { id } = req.params;
  const { tickets, count, pages } = await getListOfTickets(req, { branch: id });

  res.json({
    data: tickets,
    total: count,
    pages
  });
};

export const getTicketsByAuthorId = async (req, res) => {
  const { id } = req.params;
  const { tickets, count, pages } = await getListOfTickets(req, { authorId: id });

  res.json({
    data: tickets,
    total: count,
    pages
  });
};

export const getTicketById = async (req, res) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);
  if (ticket) {
    return res.json(ticket);
  }
  res.status(404).json({ error: 'Ticket not found' });
};

export const updateTicketById = async (req, res) => {
  const { id } = req.params;
  if (!mongodb.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  // We should'nt allow to edit all fields
  const updatedFields = {
    status: req.body.status,
    note: req.body.note,
    closed: req.body.status === 'Closed' ? Date.now() : null
  };
  const ticket = await Ticket.findOneAndUpdate({ _id: req.params.id }, { $set: updatedFields }, {
    new: true, // returns new store instead of the old one
    runValidators: true // requires to run all model validators (initially, they run on create only)
  }).exec();

  return res.json(ticket);
};