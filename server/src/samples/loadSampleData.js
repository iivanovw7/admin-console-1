const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/admin-console', { useNewUrlParser: true }, () => {
  console.log('Connected to the DB');
});
// Turn off deprecation
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise;

// import all of our models - they need to be imported only once
const Branch = require('../models/Branch');
const Group = require('../models/Group');
const Role = require('../models/Role');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

const branches = JSON.parse(fs.readFileSync(__dirname + '/branches.json', 'utf-8'));
const groups = JSON.parse(fs.readFileSync(__dirname + '/groups.json', 'utf-8'));
const roles = JSON.parse(fs.readFileSync(__dirname + '/roles.json', 'utf-8'));
const tickets = JSON.parse(fs.readFileSync(__dirname + '/tickets.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

async function deleteData() {
  console.log('Removing Data...');
  await Branch.deleteMany();
  await Group.deleteMany();
  await Role.deleteMany();
  await Ticket.deleteMany();
  await User.deleteMany();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Branch.insertMany(branches);
    await Group.insertMany(groups);
    await Role.insertMany(roles);
    const defaultRole = await Role.findOne({ name: 'User' });

    for (let user of users){
      const randomBranch = await Branch.aggregate([{ $sample: { size: 1 } }]);
      const randomGroup = await Group.aggregate([{ $sample: { size: 1 } }]);

      const newUser = new User({
        ...user,
        roles: [defaultRole.id],
        groupId: randomGroup[0]._id,
        branchId: randomBranch[0]._id
      });
      await newUser.save();
    }

    for (let ticket of tickets) {
      const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);

      const newTicket = new Ticket({
        ...ticket,
        authorId: randomUser.id,
        branchId: randomUser.branchId,
        closed: ['Closed', 'Cannot be done'].includes(ticket.status) ? Date.now() : null
      });
      await newTicket.save();
    }

    console.log('Done!');
    process.exit();
  } catch(e) {
    console.log('\nError! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}