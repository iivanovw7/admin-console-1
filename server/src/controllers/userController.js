const mongoose = require('mongoose');

const User = mongoose.model('User');

const getListOfUsers = async (params, skip, limit) => {
  // Query the database for a list of users
  const usersPromise = User.find(params).skip(skip).limit(limit).sort({ surname: 'asc' });
  const countPromise = User.countDocuments();
  const [users, count] = await Promise.all([usersPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  return {
    users,
    count,
    pages
  }
};

const getAllUsers = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page * limit) - limit;
  const { users, count, pages } = await getListOfUsers({}, skip, limit);

  res.json({
    data: users,
    total: count,
    pages
  });
};

const getUsersByBranchId = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page * limit) - limit;
  const { id } = req.params;
  const { users, count, pages } = await getListOfUsers({ branchId: id }, skip, limit);

  res.json({
    data: users,
    total: count,
    pages
  });
};

const getUsersByGroupId = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page * limit) - limit;
  const { id } = req.params;
  const { users, count, pages } = await getListOfUsers({ groupId: id }, skip, limit);

  res.json({
    data: users,
    total: count,
    pages
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
      .then(user => {
        if (user) {
          return res.json(user);
        }
        res.status(404).json({ error: 'User not found' });
      })
    .catch(err => {
      res.status(404).json({ error: 'User not found' });
    });
};

module.exports = {
  getAllUsers,
  getUsersByBranchId,
  getUsersByGroupId,
  getUserById
};