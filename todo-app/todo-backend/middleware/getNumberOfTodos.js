const { Todo } = require('../mongo')
const {getAsync, setAsync} = require('../redis');

const getNumberOfTodos = async (req, res, next) => {
    req.addedTodos = await getAsync('added_todos');
    if (!req.addedTodos) {
        const todos =  await Todo.find({});
        req.addedTodos = todos.length;
    }
    next()
}

module.exports = getNumberOfTodos;