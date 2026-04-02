import { Router } from "express";

import { getAllTodos , addTodo, deleteTodo , updateTodo } from "../controllers/todos.controller.js";

const router = Router();

router.get('/' , getAllTodos)
router.post('/' , addTodo)
router.delete('/:id' , deleteTodo)
router.patch('/:id' , updateTodo)

export default router