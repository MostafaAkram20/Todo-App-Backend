import { Router } from "express";

import { getAllTodos , addTodo, deleteTodo , updateTodo } from "../controllers/todos.controller.js";
import { auth , restrictTo } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/' , getAllTodos)
router.post('/' , addTodo)
router.delete('/:id' ,auth,restrictTo('admin') , deleteTodo)
router.patch('/:id' ,auth,restrictTo('admin'), updateTodo)

export default router