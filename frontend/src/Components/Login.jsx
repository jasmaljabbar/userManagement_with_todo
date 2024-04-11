import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import { setAuthToken } from '../api/api';
function Login() {
    const [userInfo, setUserInfo] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    console.log('Token:', token);
    const handleChange = (e) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/account/api/login/",
                userInfo,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('User logged in:', response.data);

            const { access, refresh } = response.data;
            dispatch(login({ accessToken: access, refreshToken: refresh }));
            setAuthToken(access);
            localStorage.setItem('access_token', access);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {

                console.error('Error response:', error.response);


                alert(error.response.data.error || 'Invalid Username or Password');
            } else {

                alert('Login failed. Please try again.');
            }
        }
    };



    return (
        // <div className='flex-col flex justify-center items-center h-full p-10'>
        //     <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        //         <h1 className='text-4xl font-bold  ml-32'>Sign In</h1>
        //         <form className='felx flex-col mt-6' onSubmit={handleSubmit}>
        //             <div className='flex flex-col'>
        //                 <label>Email</label>
        //                 <input className='p-3 border border-black ' type="email" onChange={handleChange} name='email' placeholder='Email' />
        //             </div>
        //             <div className='flex flex-col'>
        //                 <label>Password</label>
        //                 <input onChange={handleChange} className='p-3 border border-black ' type="password" name='password' placeholder='password' />
        //             </div>
        //             <button type='submit' className='border border-black rounded p-3 mt-6'>Login</button>
        //         </form>
        //         <p>Admin?<span onClick={() => navigate('/admin_login')}>Sign in</span></p>
        //         <p>Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span></p>
        //     </div>
        // </div>
        <>

            <div className="mx-auto mt-16 bg-white p-8 rounded-lg shadow-md w-full max-w-md flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm ">

                    <h2 className="mt-3 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className='mt-4 block text-sm font-medium leading-6 text-gray-900'>Admin?<span className=' text-blue-700' onClick={() => navigate('/admin_login')}> Sign in</span></p>
                    <p className='mt-2 block text-sm font-medium leading-6 text-gray-900'>Don't have an account? <span className=' text-blue-700' onClick={() => navigate('/register')}>Sign Up</span></p>

                </div>
            </div>
        </>

    );
}

export default Login;
