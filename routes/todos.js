const express = require('express');
const router = express.Router();

const {
  getTodos,
  addTodos,
  deleteTodos,
  updateTodos,
} = require('../controllers/todos.js');

router.route('/').get(getTodos).post(addTodos);

router.route('/:id').put(updateTodos);

router.route('/:id').delete(deleteTodos);

module.exports = router;

// respond with "hello" when a GET request is made to the homepage
// router.get('/', (req, res) => res.send('hello'));
