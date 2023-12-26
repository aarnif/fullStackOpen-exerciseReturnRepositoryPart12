const express = require('express');
const router = express.Router();
const getNumberOfTodos = require('../middleware/getNumberOfTodos');

router.get('/', getNumberOfTodos, async (req, res) => {
    res.send({
      "added_todos": Number(req.addedTodos)
    });
});

module.exports = router;
