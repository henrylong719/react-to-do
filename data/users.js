const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },

  {
    name: 'henry',
    email: 'henry@example.com',
    password: bcrypt.hashSync('123456'),
  },
  {
    name: 'john',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456'),
  },
  {
    name: 'jae',
    email: 'jae@example.com',
    password: bcrypt.hashSync('123456'),
  },
];

module.exports = users;
