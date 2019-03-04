const mongodb = require('mongodb');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const getListOfUsers = async (req, params) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page * limit) - limit;
  // Query the database for a list of users
  const usersPromise = User.find(params).skip(skip).limit(limit).sort({ surname: 'asc' });
  const countPromise = User.countDocuments();
  const [users, count] = await Promise.all([usersPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  return {
    users,
    count,
    pages
  };
};

const getAllUsers = async (req, res) => {
  const { users, count, pages } = await getListOfUsers({}, skip, limit);

  res.json({
    data: users,
    total: count,
    pages
  });
};

const getUsersByBranchId = async (req, res) => {
  const { id } = req.params;
  const { users, count, pages } = await getListOfUsers(req, { branchId: id });

  res.json({
    data: users,
    total: count,
    pages
  });
};

const getUsersByGroupId = async (req, res) => {
  const { id } = req.params;
  const { users, count, pages } = await getListOfUsers(req, { groupId: id });

  res.json({
    data: users,
    total: count,
    pages
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongodb.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = await User.findById(id);
  if (user) {
    return res.json(user);
  }
  res.status(404).json({ error: 'User not found' });
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongodb.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }

  // We should'nt allow to edit all fields
  const updatedFields = {
    groupId: req.body.groupId,
    branchId: req.body.branchId,
    roles: req.body.roles,
    status: req.body.status
  };
  const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: updatedFields }, {
    new: true, // returns new store instead of the old one
    runValidators: true // requires to run all model validators (initially, they run on create only)
  }).exec();

  return res.json(user);
};

module.exports = {
  getAllUsers,
  getUsersByBranchId,
  getUsersByGroupId,
  getUserById,
  updateUserById
};