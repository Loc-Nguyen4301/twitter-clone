const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.register = async (req, res, next) => {
    try {
        // req.body   name, email , password: là userInput
        const user = await User.create(req.body);
        // #15 tạo tokenKey
        const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
        return res.status(200).json({
            status: 'success',
            //sẻver phản hồi hồi ve token và userName
            data: { token, userName: user.name },
        });
    } catch (error) {
        next(error);
    }
};

// #19 Error Handler: Login
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // Error:  Email is not correct
            const err = new Error('Email is not correct');
            err.statusCode = 400;
            return next(err);
            // #19 funcion cua expressjs gui cho err    orHandler để xử lý, va thoat ra ngoai luon
        }

        // if Email is Correct
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
            res.status(200).json({
                status: 'success',
                data: {
                    token,
                    userName: user.name,
                },
            });
        } else {
            // Password is not correct
            const err = new Error('Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        // neu email dung -> kiem tra password ngdung dang nhap vao
        // req.body. password la mk nhap vao form, user.password la mk da ma hoa va luu vao DB
    } catch (error) {
        next(error);
    }
};

// getCurrentUser
exports.getCurrentUser = async (req, res, next) => {
    try {
        const data = { user: null };
        if (req.user) {
            const user = await User.findOne({ _id: req.user.userId });
            data.user = { userName: user.name };
        }

        res.status(200).json({
            status: 'success',
            data: data,
        });
    } catch (error) {
        res.json(error);
    }
};
