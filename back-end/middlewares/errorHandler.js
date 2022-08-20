// #21Error Handling:

exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    //Duplication
    if (err.code === 11000) {
        err.statusCode = 400;
        for (let p in err.keyValue) {
            err.message = `${p} have to be unique`;
        }
    }

    // ObjectID: NOT FOUND
    if (err.kind === 'ObjectId') {
        err.statusCode = 404;
        err.message = `The ${req.originalUrl} is not found because of wrong ID `;
    }

    res.status(err.statusCode).json({
        status: 'FAILED !!!',
        message: err.message,
    });
};
