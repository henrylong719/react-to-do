const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware');

const {
  getMyTodos,
  addTodos,
  deleteTodos,
  updateTodos,
  getAllTodos,
} = require('../controllers/todoController.js');

router.route('/mytodos').get(protect, getMyTodos);

router.route('/').get(protect, admin, getAllTodos);

router.route('/').post(protect, addTodos);

router.route('/update/:id').get(protect, updateTodos);

router.route('/:id').delete(protect, deleteTodos);

// router.route('/mytodos').get(protect, getMyTodos);

module.exports = router;

// respond with "hello" when a GET request is made to the homepage
// router.get('/', (req, res) => res.send('hello'));
