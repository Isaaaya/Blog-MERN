const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    res.status(StatusCodes.OK).json(users)
});

const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password').lean();
    res.status(StatusCodes.OK).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { name, email, imageUrl } = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, {
        $set: {
            name, email, imageUrl
        },
    }, { new: true }).select('-password').lean();
    res.status(StatusCodes.OK).json({ user: updatedUser });
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const deletedUser = await User.findByIdAndDelete(_id).select('-password').lean();
    res.status(StatusCodes.OK).json(deletedUser);
});


module.exports = { getAllUsers, getUserById, updateUser, deleteUser }