const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content: { type: String, required: [true, 'Post must have content'], trim: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        // ro author vao collection user va chi can luu userId
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
