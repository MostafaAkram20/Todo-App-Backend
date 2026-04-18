import mongoose from "mongoose"
import userModel from "../DB/models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('userName firstName lastName role dateOfBirth')//projection
        return res.status(200).json({ message: 'List of all users', data: users })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
export const signUp = async (req, res) => {

    try {
        let { firstName, lastName, userName, password, dateOfBirth } = req.body
        // console.log(firstName , lastName , userName , password);

        if (!firstName || !lastName || !userName || !password) {
            return res.status(400).json({ message: 'please fill all required fields' })
        } else {

            const isExistUser = await userModel.findOne({ userName })
            if (isExistUser) {
                return res.status(409).json({ message: 'user is already exist' })
            } else {
                const hashedPassword = bcrypt.hashSync(password, 8)
                await userModel.create({
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    password: hashedPassword,
                    dateOfBirth: dateOfBirth
                })
                let user = await userModel.find().select('userName firstName lastName role dateOfBirth')
                return res.status(201).json({ message: 'Account is created successfully', user })
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

        if (!userName || !password) {
            return res.status(400).json({ message: 'please fill all required fields' })
        } else {
            const user = await userModel.findOne({ userName })
            if (!user) {
                return res.status(401).json({ message: 'user is not exist' })
            } else {
                const isComapared = bcrypt.compareSync(password, user.password)
                if (!isComapared) {
                    return res.status(400).json({ message: 'Username or password is incorrect' })
                } else { // payload and secret key
                    //adding email to token
                    const token = jwt.sign({ id: user._id, role: user.role, userName: user.userName, isLoggedIn: true }, process.env.JWT_SECRET, { expiresIn: '1d' })
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
        const { id } = req.params
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
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        if (req.user.id !== id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: 'Password updated successfully'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error while updating password',
            error: error.message,
            stack:error.stack
        });
    }
};
