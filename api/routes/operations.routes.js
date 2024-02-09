import express from 'express';
import { operationsController } from '../controllers/index.js';
import verifyJWT from '../middlewares/verifyToken.js';
const operationRouter = express.Router();

operationRouter.get('/', verifyJWT, operationsController.getAll);
operationRouter.get('/userOperations', verifyJWT, operationsController.getByUserIDandQueries);
operationRouter.get('/:id', verifyJWT, operationsController.get);
operationRouter.post('/', verifyJWT, operationsController.createOperation);
operationRouter.delete('/:id', verifyJWT, operationsController.deleteOperation);
operationRouter.patch('/', verifyJWT, operationsController.updateOperation);

export default operationRouter;
