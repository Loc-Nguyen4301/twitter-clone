//# 36: CAP NHAT NAV theo trang thai nguoi dung

import React, { useContext } from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import AppContext from './AppContext';

const Header = () => {
    const { state, dispatch } = useContext(AppContext);
    // state lay thong tin user,
    const { user } = state;
    const signOut = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'CURRENT_USER', payload: null });
    };
    return (
        <header className='header'>
            <h1 className='logo'>
                <Link to='/'>twitter</Link>
            </h1>
            <nav>
                <ul className='main-nav'>
                    {user ? (
                        <>
                            <li>
                                <span className='user-name'>Hello, {user.userName}</span>
                            </li>
                            <li onClick={() => signOut()}>
                                <a>SignOut</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
