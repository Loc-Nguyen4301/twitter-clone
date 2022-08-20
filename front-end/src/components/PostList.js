import React, { useEffect, useCallback, useContext } from 'react';
import PostItem from './PostItem';
import '../css/Post.css';
import axios from 'axios'; //package gui request len server
import AppContext from './AppContext';

const PostList = () => {
    const { state, dispatch } = useContext(AppContext);
    const { posts, user } = state;
    const getAllPosts = useCallback(async () => {
        try {
            const option = {
                method: 'get',
                url: '/api/v1/posts',
            };
            const respond = await axios(option);
            const posts = respond.data.data.posts;
            dispatch({ type: 'GET_ALL_POSTS', payload: posts });
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    const newPosts = posts.map((post) => {
        if (user) {
            return post.author.name === user.userName ? { ...post, isEditable: true } : post;
        } else {
            return { ...post, isEditable: false };
        }
    });
    return (
        <section className='post-section'>
            <div className='post-list'>
                {newPosts.map((post, index) => (
                    <PostItem post={post} key={post._id} />
                ))}
            </div>
        </section>
    );
};
export default PostList;
