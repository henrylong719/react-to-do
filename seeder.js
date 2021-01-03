const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const todos = require('./data/todos');
const User = require('./models/userModel');
const Todo = require('./models/todoModel');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const importData = async () => {
  try {
    // clean up all data
    await User.deleteMany();
    await Todo.deleteMany();

    const createUser = await User.insertMany(users);

    const adminUser = createUser[0]._id;

    const sampleTodos = todos.map((todo) => {
      return { ...todo, user: adminUser };
    });

    await Todo.insertMany(sampleTodos);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Todo.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
