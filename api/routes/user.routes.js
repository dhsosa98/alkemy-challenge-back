
import express from 'express';
import { Router } from 'express';

import verifyJWT from '../middlewares/verifyToken.js';
import { userController } from '../controllers/index.js';
import { handleFiles } from '../middlewares/handleFiles.js';

import multer from 'multer';
const upload = multer();

/* GET users listing. */

const router = Router();

router.get('/', verifyJWT, userController.getAll);
router.post('/login', userController.login);
router.post('/googleAuth', userController.googleAuth);
router.get('/me', verifyJWT, userController.getMe);
router.delete('/me', verifyJWT, userController.deleteMe);
router.patch('/me', verifyJWT, upload.single('avatar'), handleFiles, userController.updateMe);
router.get('/:id', verifyJWT, userController.get);
router.post('/register', userController.createUser);
router.put('/reset-password', userController.resetPassword);
router.delete('/:id', verifyJWT, userController.deleteUser);
router.patch('/', verifyJWT, userController.updateUser);

const userRouter = router;

export default userRouter;
