import React, { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from './AppContext';
// import { useNavigate } from 'react-router-dom';
const PostItem = ({ post }) => {
    const [editForm, setEditForm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const { dispatch } = useContext(AppContext);
    const [thePostToEdit, setThePostToEdit] = useState(post);
    let date = new Date(post.createdAt);
    // const navigate = useNavigate();

    const updatePost = async () => {
        try {
            setEditForm(false);
            const token = localStorage.getItem('token');
            const option = {
                method: 'put',
                url: `/api/v1/posts/${post._id}`,
                data: thePostToEdit,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            dispatch({ type: 'UPDATE_ONE_POST', payload: { ...thePostToEdit } });
            // const { userName } = response.data.data.userName;
            // dispatch({ type: 'CURRENT_USER', payload: { userName } });
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'delete',
                url: `/api/v1/posts/${post._id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            dispatch({ type: 'DELETE_ONE_POST', payload: { _id: post._id } });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='post-item'>
            <p className='post-content'>{post.content}</p>
            <div className='post-footer'>
                <div className='post-infors'>
                    <span>by {post.author.name}</span>
                    <span>Date {`${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()} `}</span>
                </div>

                {/* render Editbtn, Deletebtn */}
                {post.isEditable && (
                    <div className='post-edit-delete'>
                        {deleteConfirm ? (
                            <>
                                <span className='delete-question'>Are you sure?</span>
                                <span onClick={deletePost}>Yes</span>
                                <span onClick={() => setDeleteConfirm(false)}>No</span>
                            </>
                        ) : (
                            <>
                                <span onClick={() => setEditForm(!editForm)}>Edit</span>
                                <span onClick={() => setDeleteConfirm(true)}>Delete</span>
                            </>
                        )}
                    </div>
                )}
            </div>
            {editForm && (
                <div className='post-edit-form'>
                    <form className='edit-form'>
                        <textarea
                            type='text'
                            name='content'
                            id='content'
                            className='content'
                            placeholder="What's happening"
                            value={thePostToEdit.content}
                            onChange={(e) => setThePostToEdit({ ...thePostToEdit, content: e.target.value })}
                        ></textarea>
                        <div className='btn-container'>
                            <button className='btn' type='button' onClick={updatePost}>
                                Update
                            </button>
                            <button
                                className='btn'
                                type='button'
                                onClick={() => {
                                    setEditForm(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostItem;
