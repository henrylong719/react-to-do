const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const app = express();

const todos = require('./routes/todos');
const connectDB = require('./config/db');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });

connectDB();

// allow use to use body parser
app.use(express.json());

app.use('/api/v1/todos', todos);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // serve the index.html file
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .bold
  )
);

// respond with "Hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => res.send('Hello world'));
