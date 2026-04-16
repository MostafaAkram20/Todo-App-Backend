import mongoose from "mongoose"
import userModel from "../DB/models/user.model.js"
import bcrypt from 'bcrypt'
// import validator from 'validator';
import  jwt  from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('userName firstName lastName dateOfBirth')//projection
        return res.status(200).json({ message: 'List of all users', data: users })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    } 

}
export const signUp = async (req, res) => {

    try {
        let { firstName, lastName, userName, password , dateOfBirth } = req.body
        // console.log(firstName , lastName , userName , password);

        if (!firstName || !lastName || !userName || !password) {
            return res.status(400).json({ message: 'please fill all required fields' })
        } else {

            const isExistUser = await userModel.findOne({ userName })
            if (isExistUser) {
                return res.status(409).json({ message: 'user is already exist' })
            } else {
                const hashedPassword = bcrypt.hashSync(password, 8)
                const user = await userModel.create({
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    dateOfBirth:dateOfBirth
                })
                return res.status(201).json({ message: 'Account is created successfully' , user })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while adding user', msg: error.message })
    }
}
export const signIn = async (req, res) => {

    try {
        let { userName, password } = req.body
        // console.log(firstName , lastName , userName , password);

        if ( !userName || !password) {
            return res.status(400).json({ message: 'please fill all required fields' })
        } else {
            const isExistUser = await userModel.findOne({ userName })
            if (!isExistUser) {
                return res.status(401).json({ message: 'user is not exist' })
            } else {
                const isComapared = bcrypt.compareSync(password , isExistUser.password)
                if(!isComapared){
                    return res.status(400).json({message:'Username or password is incorrect'})
                }else{ // payload and secret key
                    //adding email to token
                    const token = jwt.sign({id:isExistUser._id ,userName:isExistUser.userName, isLoggedIn:true} , process.env.JWT_SECRET , {expiresIn:'1d'})
                    return res.status(200).json({ message: 'user logged in successfully', token })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while logging user', msg: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        let { id } = req.params
        // console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id) || !id) {
            return res.status(409).json({ message: 'Invalid Id' })
        } else {
            const user = await userModel.findByIdAndDelete(id)
            // return res.status(200).json({user:user})
            if (!user) {
                return res.status(400).json({ message: 'Error, User not found!' })
            } else {
                return res.status(200).json({ message: 'User has been deleted successfully' })
            }
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error accured while deleting the user', msg: error.message })
    }
}

export const updateUser = async(req , res)=>{
    try {
        let { id } = req.params
        // console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id) || !id) {
            return res.status(409).json({ message: 'Error, invalid Id' })
        } else {
            const user = await userModel.findByIdAndUpdate(id , req.body , {returnDocument: 'after' , runValidators:true})
            // return res.status(200).json({user:user})
            if (!user) {
                return res.status(400).json({ message: 'Error, User not found!' })
            } else {
                if(req.body.password){
                    const hashedPassword = bcrypt.hashSync(req.body.password, 8)
                    user.password = hashedPassword
                }
                return res.status(200).json({ message: 'User updated successfully' , user:user })
            }
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error accured while updating the user', msg: error.message })
    }
}

