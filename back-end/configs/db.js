const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('DB connection SUCCESSFULLY');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = { connectDb };
