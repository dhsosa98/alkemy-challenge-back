const express = require('express'); 
const { operationsController } = require('../controllers'); 
const verifyJWT = require('../middlewares/verifyToken'); 
const operationRouter = express.Router(); 

operationRouter.get('/', verifyJWT, operationsController.getAll); 
operationRouter.get('/userOperations', verifyJWT, operationsController.getByUserID); 
operationRouter.get('/:id', verifyJWT, operationsController.get); 
operationRouter.post('/', verifyJWT, operationsController.createOperation); 
operationRouter.delete('/:id', verifyJWT, operationsController.deleteOperation); 
operationRouter.patch('/', verifyJWT, operationsController.updateOperation); 


module.exports = operationRouter; 
