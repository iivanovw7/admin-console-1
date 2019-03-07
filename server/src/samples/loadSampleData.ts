import * as fs from 'fs';
import * as mongoose from 'mongoose';

// import all of our models - they need to be imported only once
import Branch from '../models/Branch';
import Group from '../models/Group';
import Message from '../models/Message';
import Role from '../models/Role';
import Ticket from '../models/Ticket';
import User from '../models/User';

mongoose.connect('mongodb://localhost:27017/admin-console', { useNewUrlParser: true }, () => {
  console.log('Connected to the DB');
});
// Turn off deprecation
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// Tell Mongoose to use ES6 promises
(mongoose as any).Promise = global.Promise;
// Special users
const specialUsers = [
  {
    name: 'Admin',
    surname: 'ADMIN',
    email: 'admin@company.org'
  },
  {
    name: 'Support',
    surname: 'SUPPORT',
    email: 'support@company.org'
  },
  {
    name: 'Admin',
    surname: 'BRANCH_ADMIN',
    email: 'branch-admin@company.org'
  },
  {
    name: 'Support',
    surname: 'BRANCH_SUPPORT',
    email: 'branch-support@company.org'
  },
  {
    name: 'Manager',
    surname: 'MANAGER',
    email: 'manager@company.org'
  }
];

const branches: any = JSON.parse(fs.readFileSync(__dirname + '/branches.json', 'utf-8'));
const groups: any = JSON.parse(fs.readFileSync(__dirname + '/groups.json', 'utf-8'));
const messages: any = JSON.parse(fs.readFileSync(__dirname + '/messages.json', 'utf-8'));
const roles: any  = JSON.parse(fs.readFileSync(__dirname + '/roles.json', 'utf-8'));
const tickets: any = JSON.parse(fs.readFileSync(__dirname + '/tickets.json', 'utf-8'));
const users: any = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

async function deleteData() {
  console.log('Removing Data...');
  await Branch.deleteMany({});
  await Group.deleteMany({});
  await Message.deleteMany({});
  await Role.deleteMany({});
  await Ticket.deleteMany({});
  await User.deleteMany({});
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Branch.insertMany(branches);
    await Group.insertMany(groups);
    await Role.insertMany(roles);
    const allRoles: any[] = await Role.find();

    for (let user of users){
      const randomBranch = await Branch.aggregate([{ $sample: { size: 1 } }]);
      const randomGroup = await Group.aggregate([{ $sample: { size: 1 } }]);

      const newUser = new User({
        ...user,
        role: allRoles.find(role => role.code === 'USER')._id,
        group: randomGroup[0]._id,
        branch: randomBranch[0]._id,
        created: Date.now()
      });
      await newUser.save();
    }
    // Inserting special users
    for (let user of specialUsers) {
      const randomBranch = await Branch.aggregate([{ $sample: { size: 1 } }]);
      const randomGroup = await Group.aggregate([{ $sample: { size: 1 } }]);

      const newUser = new User({
        ...user,
        role: allRoles.find(role => role.code === user.surname)._id,
        group: randomGroup[0]._id,
        branch: randomBranch[0]._id,
        active: true,
        created: Date.now()
      });
      await newUser.save();
    }

    for (let ticket of tickets) {
      const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);

      const newTicket = new Ticket({
        ...ticket,
        author: randomUser[0]._id,
        branch: randomUser[0].branch,
        closed: ['Closed', 'Cannot be done'].includes(ticket.status) ? Date.now() : null
      });
      await newTicket.save();
    }

    const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
    const l = messages.length;
    for (let i = 0; i < l; i++) {
      const message = {
        ...messages[i],
        sender: randomUser[0]._id,
        branch: null,
        group: null
      };
      if (i % 2 === 0) {
        // Message to branch
        const randomBranch = await Branch.aggregate([{ $sample: { size: 1 } }]);
        message.branch = randomBranch[0]._id;
      } else {
        // Message to group
        const randomGroup = await Group.aggregate([{ $sample: { size: 1 } }]);
        message.group = randomGroup[0]._id;
      }

      const newMessage = new Message(message);
      await newMessage.save();
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