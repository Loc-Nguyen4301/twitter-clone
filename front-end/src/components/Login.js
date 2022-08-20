import React, { useContext, useState } from 'react';
import '../css/Auth.css';
import axios from 'axios';
import AppContext from './AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { dispatch } = useContext(AppContext);
    const [userInput, setUserInput] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    // cap nhat useInput khi nguoi dung nhap email password

    const onChangeHandle = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value }); //cap nhat gia tri cho input email va password
    };

    const onSubmitHandle = async (e) => {
        try {
            e.preventDefault(); //muc dich de khi bam login khong bi reload browser
            const option = {
                method: 'post',
                url: '/api/v1/auth/login', // cong API lay tai nguyen
                data: userInput,
            };
            const response = await axios(option);
            // console.log(response);
            const { token, userName } = response.data.data; //destructuring
            localStorage.setItem('token', token);

            dispatch({ type: 'CURRENT_USER', payload: { userName } }); // cap nhat State
            navigate('/'); // dieu huong ngug den ROUTE moi (Main Component)
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <section className='auth-container'>
            <form className='auth-form' onSubmit={onSubmitHandle}>
                <h2>Enter Your Account</h2>
                {/* thong bao loi */}
                {errorMessage && <div className='error-message'>Error: {errorMessage}</div>}
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
                    Login
                </button>
            </form>
        </section>
    );
};

export default Login;
