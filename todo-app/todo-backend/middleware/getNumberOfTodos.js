const { Todo } = require('../mongo')
const {getAsync, setAsync} = require('../redis');

const getNumberOfTodos = async (req, res, next) => {
    req.addedTodos = await getAsync('added_todos');
    if (!req.addedTodos) {
        req.addedTodos = 0;
    }
    next()
}

module.exports = getNumberOfTodos;