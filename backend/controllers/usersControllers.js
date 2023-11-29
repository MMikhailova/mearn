import User from "../models/User.js"
import Note from "../models/Note.js"
import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs'


const userControllers = {
    //@desc Get all users
    //@route GET /users
    //@access Private
    getAllUsers: asyncHandler(async (req, res) => {
        // select('-password')without password, lean return only json
        const users = await User.find().select('-password').lean()
        if (!users?.length) {
            return res.status(400).json({ message: 'No users found' })
        }
        res.json(users)
    }),

    //@desc  Post all users
    //@route POST /users
    //@access Private
    createNewUser: asyncHandler(async (req, res) => {
        const { username, password, roles } = req.body
        //confirm data
        if (!username || !password || !Array.isArray(roles) || !roles.length) {
            return res.status(400).json({ message: "All fields are required" })
        }
        //check for duplicate
        //use exec() to track where is error
        const duplicate = await User.findOne({ username }).lean().exec()

        if (duplicate) {
            return res.status(401).json({ message: "Duplicate username" })
        }
        //Hash password
        const hashedPwd = await bcrypt.hash(password, 10)//salt rounds
        const userObject = { username, "password": hashedPwd, roles }
        //create a new user
        const user = await User.create(userObject)
        if (user) {
            res.status(201).json({ message: `New user ${username} created` })
        } else {
            res.status(400).json({ message: 'Invalid user data received' })
        }
    }),

    //@desc  Update a user
    //@route PUT /users
    //@access Private
    // @desc Update a user
    // @route PATCH /users
    // @access Private
    updateUser: asyncHandler(async (req, res) => {
        const { id, username, roles, active, password } = req.body

        // Confirm data 
        if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
            return res.status(400).json({ message: 'All fields except password are required' })
        }

        // Does the user exist to update?
        const user = await User.findById(id).exec()

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        // Check for duplicate 
        const duplicate = await User.findOne({ username }).lean().exec()

        // Allow updates to the original user 
        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate username' })
        }

        user.username = username
        user.roles = roles
        user.active = active

        if (password) {
            // Hash password 
            user.password = await bcrypt.hash(password, 10) // salt rounds 
        }

        const updatedUser = await user.save()

        res.json({ message: `${updatedUser.username} updated` })
    }),

    // @desc Delete a user
    // @route DELETE /users
    // @access Private
    deleteUser: asyncHandler(async (req, res) => {
        const { id } = req.body;

        // Confirm data
        if (!id) {
            return res.status(400).json({ message: 'User ID Required' });
        }

        // Does the user still have assigned notes?
        const note = await Note.findOne({ user: id }).lean().exec();
        if (note) {
            return res.status(400).json({ message: 'User has assigned notes' });
        }

        // Does the user exist to delete?
        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }е

           const result = await user.deleteOne();

    const reply = `Username ${user.username} with ID ${user._id} deleted`;
    res.json(reply);

        // const result = await User.deleteOne({ _id:user.id });
        // console.log(user);
        // if (result.deletedCount > 0) {
        //     res.json({ message: `User ${user.username} with id ${user.id} has been deleted` });
        // }
        

    })
  
}


export default userControllers;