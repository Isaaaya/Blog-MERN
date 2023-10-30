const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, provide user name'],
    },
    email: {
        type: String,
        required: [true, 'Please, provide user email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please, provide user password'],
    },
    imageUrl: {
        type: String,
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.generateToken = async function (res) {
    const token = jwt.sign({ userId: this._id }, process.env.SECRET_JWT, { expiresIn: '7d' });

    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 7 * 60 * 60 * 24 * 1000,
    })
}


UserSchema.methods.comparePasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);