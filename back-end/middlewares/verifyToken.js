const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    //truy cap authorize tu req header
    const Authorization = req.header('authorization');

    if (!Authorization) {
        // Error: Unauthourized
        const error = new Error('Unauthourized!!!');
        error.statusCode = 401;
        return next(error);
    }
    //Get token
    const token = Authorization.replace('Bearer ', '');
    // khi gui token tu client den server no co dinh dang : Bearer tokenKey
    //Verify token
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    //Assign req
    req.user = { userId };
    next();
    // di tiep vao conttroler de tao bai post
};
