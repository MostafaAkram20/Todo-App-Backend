import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    initTime: Date,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        minLength: [5, 'minimun length is 5 characters'],
        maxLength: [20, 'maximun length is 20 characters'],
    },
    status: {
        type: String,
        enum: ['to-do', 'in progress', 'done'],
        default: 'to-do',
    },


}, { timestamps: true })

const todoModel =  mongoose.models.Todo || mongoose.model('Todo' , todoSchema)

export default todoModel;