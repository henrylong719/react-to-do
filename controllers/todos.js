const Todo = require('../models/Todo');

// $desc   Get all todos
// @route  GET /api/v1/todos
// @access Public

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// $desc   add todos
// @route  POST /api/v1/todos
// @access Public

exports.addTodos = async (req, res, next) => {
  try {
    const { title } = req.body;

    const todo = await Todo.create(req.body);

    return res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      // The Object.values() method returns an array of a given object's own enumerable property values
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
};

// $desc   delete todos
// @route  DELETE /api/v1/todos
// @access Public

exports.deleteTodos = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found',
      });
    }

    await todo.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// $desc   update todos
// @route  PUT /api/v1/todos/:id
// @access Public

exports.updateTodos = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      todo.completed = !todo.completed;

      const updateTodo = await todo.save();

      return res.status(201).json(updateTodo);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
/******************* test *******************/

// $desc   Get all todos
// @route  GET /api/v1/todos
// @access Public

// exports.getTodos = (req, res, next) => {
//   res.send('GET todos');
// };

// // $desc   add todos
// // @route  POST /api/v1/todos
// // @access Public

// exports.addTodos = (req, res, next) => {
//   res.send('ADD todos');
// };

// // $desc   delete todos
// // @route  DELETE /api/v1/todos
// // @access Public

// exports.deleteTodos = (req, res, next) => {
//   res.send('DELETE todos');
// };
