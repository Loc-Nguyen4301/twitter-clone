import React, { useContext, useState } from 'react';
import '../css/Auth.css';
import AppContext from './AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { dispatch } = useContext(AppContext);
    const [userInput, setUserInput] = useState({ name: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const onChangeHandle = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value }); //cap nhat gia tri cho input email va password
    };

    const onSubmitHandle = async (e) => {
        try {
            e.preventDefault(); //muc dich de khi bam login khong bi reload browser
            const option = {
                method: 'post',
                url: '/api/v1/auth/register', // cong API lay tai nguyen
                data: userInput,
            };
            const response = await axios(option);
            const { token, userName } = response.data.data; //destructuring
            localStorage.setItem('token', token);
            dispatch({ type: 'CURRENT_USER', payload: { userName } }); // cap nhat State
            navigate('/'); // dieu huong nguoi dung den ROUTE moi (Main Component)
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <section className='auth-container'>
            <form className='auth-form' onSubmit={onSubmitHandle}>
                <h2>Register New Account</h2>
                {errorMessage &&
                    (Array.isArray(errorMessage) ? (
                        errorMessage.map((err) => <div className='error-message'>Error: {err}</div>)
                    ) : (
                        <div className='error-message'>Error: {errorMessage}</div>
                    ))}

                <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    placeholder='Name'
                    value={userInput.name}
                    onChange={onChangeHandle}
                />

                <input
                    type='email'
                    name='email'
                    id='email'
                    required
                    placeholder='Email'
                    value={userInput.email}
                    onChange={onChangeHandle}
                />

                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    placeholder='Password'
                    value={userInput.password}
                    onChange={onChangeHandle}
                />
                <button className='btn' type='submit'>
                    Register
                </button>
            </form>
        </section>
    );
};

export default Register;
