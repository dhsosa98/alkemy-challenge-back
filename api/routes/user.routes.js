
const express = require('express');

const router = express.Router();

const verifyJWT = require('../middlewares/verifyToken'); 

const { userController } = require('../controllers');
const {handleFiles} = require('../middlewares/handleFiles');

const multer  = require('multer')
const upload = multer()

/* GET users listing. */

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


module.exports = router;
