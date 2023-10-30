const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    user.generateToken(res);
    res.status(StatusCodes.CREATED).json({ _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage || '' });
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (await user.comparePasswords(password)) {
        user.generateToken(res);
        res.status(StatusCodes.OK).json({ _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage || '' });
    } else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid password');
    }

})

const logout = asyncHandler(async (req, res) => {
    // res.cookie('jwt', '', {
    //     httpOnly: true,
    //     expires: new Date(0),
    // });
    res.clearCookie("jwt");
    res.status(StatusCodes.OK).json({ msg: 'User logged out' });
})


module.exports = { registerUser, loginUser, logout }