// #29 Thiet lap Router cho component
// #37 Check Curren User
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppReducer from './reducers/AppReducer';
import { useCallback, useEffect, useReducer } from 'react';
import AppContext from './components/AppContext';
import axios from 'axios';

function App() {
    const initialState = { user: null, posts: [] };
    const [state, dispatch] = useReducer(AppReducer, initialState);
    // ham duoc goi khi f5 refresh trang
    const checkCurrentUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'get',
                url: '/api/v1/auth/',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            if (response.data.data.user) {
                const { userName } = response.data.data.user;
                dispatch({ type: 'CURRENT_USER', payload: { userName } });
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        checkCurrentUser();
    }, [checkCurrentUser]);

    return (
        <BrowserRouter>
            <AppContext.Provider value={{ state, dispatch }}>
                <div className='container'>
                    <Header />
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/' element={<Main />} />
                        <Route path='*' element={<div>Page Not Found !!!</div>} />
                    </Routes>
                </div>
            </AppContext.Provider>
        </BrowserRouter>
    );
}
export default App;
