const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {getAsync, setAsync} = require('../redis');
const getNumberOfTodos = require('../middleware/getNumberOfTodos');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', getNumberOfTodos, async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  ++req.addedTodos;
  setAsync('added_todos', req.addedTodos);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updateTodo = await Todo.findByIdAndUpdate(req.todo.id, req.body, {new: true})
  if (!updateTodo) {
    res.sendStatus(404)
  }
  res.send(updateTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
