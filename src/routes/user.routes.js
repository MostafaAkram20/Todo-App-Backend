import { Router } from "express";
import * as userController from '../controllers/users.controller.js'
import { auth, restrictTo } from './../middlewares/auth.middleware.js'
const router = Router();

router.get('/', userController.getAllUsers)
router.post('/', userController.signUp)
router.post('/login', userController.signIn)
router.delete('/:id', auth, restrictTo('admin'), userController.deleteUser)
router.patch('/:id',auth, restrictTo('admin','user'), userController.updatePassword)


export default router
