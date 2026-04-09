import mongoose from "mongoose";
import todoModel from "../DB/models/todo.model.js";
import userModel from "../DB/models/user.model.js";
export const getAllTodos = async (req, res) => {
    try {
        // get the user info for todos
        const todos = await todoModel.find().populate('userId');//.populate('userId') get info for that objectId
        return res.status(200).json({ message: 'list of all todos', data: todos })
    } catch (error) {
        return res.status(400).json({ message: message.error })
    }
}
export const addTodo = async (req, res) => {
    try {
        const { userId, title, status } = req.body
        if (!userId || !title || !status) {
            return res.status(400).json({ message: 'missing some info for todo' })
        } else {
            const user = await userModel.findById(userId)
            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            } else {
                const todo = await todoModel.create({
                    initTime: new Date(),
                    title: title,
                    status: status
                })
                return res.status(201).json({ message: "Todo added successfully", todo });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Id' })
        } else {
            // const { userId, status } = req.body
            // if (!userId || !status) {
            //     return res.status(200).json({ message: 'missing todo info, fill all fields to update the todo' })
            // }
            let todo = await todoModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
            if (!todo) {
                return res.status(400).json({ message: 'Error, todo not found' })
            } else {
                return res.status(200).json({ message: 'Todo has been updated successfully' })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'error while updating todo', msg: error.message })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Id' })
        } else {
            let todo = await todoModel.findByIdAndDelete(id)
            if (!todo) {
                return res.status(400).json({ message: 'Error, todo not found' })
            } else {
                return res.status(200).json({ message: 'Todo has been deleted successfully' })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'error while deleting todo', msg: error.message })
    }
}