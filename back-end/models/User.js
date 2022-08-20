const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Name must be required'],
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Email must be required'],
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Password must be required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    let user = this; // gan user = document duoc tao ra
    // #15 Ma hoa password
    bcrypt.hash(user.password, 10, function (error, hash) {
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            // gan lai mat khau cho gia tri bam
            next();
            // luu vao DB
        }
    });
});

const User = mongoose.model('User', userSchema); // khoi tao model

module.exports = User; // export model
