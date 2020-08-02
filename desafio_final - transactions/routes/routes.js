const express = require('express');
const transactionRouter = express();
const controller = require('../controllers/transactionController.js')

transactionRouter.get('/', controller.get);
transactionRouter.get('/period=:ano-:mes', controller.getPeriod);
transactionRouter.post('/inserir', controller.insert);
transactionRouter.put('/modificar/:id', controller.modify);
transactionRouter.delete('/delete/:id', controller.deleteOne);

module.exports = transactionRouter;
