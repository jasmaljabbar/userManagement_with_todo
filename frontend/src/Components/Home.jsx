import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import { updateToken } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import Unknown from '../Unknown.jpg'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

function Home() {
    const [userInfo, setUserInfo] = useState({ usename: '', email: '' });
    const navigate = useNavigate();
    const accessToken = useSelector(state => state.auth.token);
    const [image, setImage] = useState(null)
    const [imgfile, setImgfile] = useState(null)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [submit, setSubmit] = useState(false)
    const dispatch = useDispatch();
    const refreshToken = useSelector(state => state.auth.refreshToken);
    const [imagePreview, setImagePreview] = useState(null);

    const refreshTokenFunction = async () => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/account/api/token/refresh/', {
                refresh: refreshToken
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(updateToken(response.data.access));
            return response.data.access;
        } catch (error) {
            console.error('Error refreshing token:', error);
            navigate('/login');
        }
    };

    const handleTokenExpiration = async () => {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            // Token is expired, refresh it
            const newAccessToken = await refreshTokenFunction();

        }
    };
    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await axios.get('http://127.0.0.1:8000/account/api/home/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                setUserInfo({
                    username: response.data.user.username,
                    email: response.data.user.email,
                });
                setImage(response.data.user.profile_pic);
                setImage(prevImageUrl => `${prevImageUrl}?${Date.now()}`);
                setImgfile(null);
            } catch (error) {
                if (error.response && error.response.status === 401) {

                    navigate('/login');
                } else {
                    console.error('Error fetching user information:', error);
                    alert('Error fetching user information');
                }
            }
        };


        if (accessToken) {
            handleTokenExpiration();
            fetchData();
        } else {

            navigate('/login');
        }
    }, [accessToken, navigate, dispatch]);


    const handleImage = (e) => {

        const file = e.target.files[0];
        setImgfile(file)
        setSubmit(true)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                console.log(imagePreview)
            };
            reader.readAsDataURL(file);
        } else {

            setImagePreview(null);
        }


    }

    const handleImageUpload = async () => {
        try {
            if (!imgfile) {
                alert('Please select an image');
                return;
            }
            const formData = new FormData();
            formData.append('image', imgfile);


            const response = await api.post("http://127.0.0.1:8000/account/api/home/", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div>
            <NavBar admin={userInfo.is_staff} />

            {userInfo && (
                <div className="flex flex-col  items-center h-screen w-full justify-center mt-24">
                    <h1 className=' text-purple-950 text-4xl font-bold '>User Profile</h1>
                    <div className="flex flex-col justify-center items-center max-w-md mt-2 ">
                        <div className="bg-white shadow-xl rounded-lg py-8 mb-64 mt-8 w-full h-full px-24 ">
                            <div className="photo-wrapper p-2 ">
                                {imagePreview ? <img className='rounded-full w-56 h-56 mb-12' key={imagePreview} src={imagePreview} alt="profile picture" /> : image !== null ? <img className='rounded-full w-56 h-56 mb-12' key={image} src={`http://127.0.0.1:8000${image}?${Date.now()}`} alt="profile picture" /> : <img src={Unknown} alt="profile picture" />}
                                <div className='flex flex-col'>

                                    {submit ?
                                        <><button onClick={handleImageUpload} className="mt-2  bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow-sm">
                                            Submit
                                        </button><button onClick={() => { setImagePreview(null); setSubmit(false) }} className="mt-2  bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow-sm">
                                                Cancel
                                            </button> </> : <label className=" flex justify-center relative cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md shadow-sm">
                                            Upload Image
                                            <input
                                                type="file"
                                                onChange={handleImage}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </label>
                                    }
                                </div>
                            </div>
                            <div className="p-2 mt-4">
                                <h3 className="text-center font-bold text-3xl text-black-900 leading-8">{userInfo.username}</h3>
                                <div className="text-center text-gray-400 text-xs font-semibold">

                                </div>
                                <table className="text-xs my-3">
                                    <tbody className='flex flex-col justify-center items-center'><tr>
                                        <td className="px-2 py-2 text-2xl text-gray-500 font-semibold">Email: </td>
                                        <td className="px-2 py-2 text-xl font-semibold">{userInfo.email}</td>
                                    </tr>

                                    </tbody></table>


                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Home;
