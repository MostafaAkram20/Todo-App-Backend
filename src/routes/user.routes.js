import { Router } from "express";
import {getAllUsers , signUp ,signIn, deleteUser, updateUser} from '../controllers/users.controller.js'
const router = Router();

router.get('/' , getAllUsers)
router.post('/' , signUp)
router.post('/login' , signIn)
router.delete('/:id' , deleteUser)
router.patch('/:id' , updateUser)


export default router
