const Post = require('../models/Post');
//getAllPosts
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).populate('author');
        // phan hoi tu server
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: { posts },
        });
    } catch (error) {
        next(error);
    }
};

// createOnePost
exports.createOnePost = async (req, res, next) => {
    try {
        const { userId } = req.user;

        const post = await Post.create({ ...req.body, author: userId });
        res.status(200).json({
            status: 'success',
            data: { post },
        });
    } catch (error) {
        next(error);
    }
};

// updateOnePost can lay duoc posId
exports.updateOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndUpdate(postId, { ...req.body }, { new: true, runValidator: true });
        // new: true ,phan hoi bai post moi da duoc update
        res.status(200).json({
            status: 'success',
            data: { post },
        });
    } catch (error) {
        next(error);
    }
};

// deleteOnePOst can lay duoc postId
exports.deleteOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        await Post.findByIdAndDelete(postId);
        // new: true ,phan hoi bai post moi da duoc update
        res.status(200).json({
            status: 'success',
            message: ' Post deleted',
        });
    } catch (error) {
        next(error);
    }
};
