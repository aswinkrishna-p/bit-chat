import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { SetAvatarRoute } from '../utils/apiRoutes';

function SetAvatar(props) {
    const api = 'http://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: 'top-center',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        }
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an Avatar', toastOptions);
        } else {
            try {
                const user = JSON.parse(localStorage.getItem('chat-app-user'));
                const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
                    image: avatars[selectedAvatar]
                });

                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem('chat-app-user', JSON.stringify(user));
                    navigate('/');
                } else {
                    toast.error('Error Setting avatar please try again', toastOptions);
                }
            } catch (error) {
                console.error('Error setting profile picture:', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = new Buffer.from(image.data);
                    data.push(buffer.toString('base64'));
                }
                setAvatars(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center flex-col h-screen bg-gray-800">
                    <img src={loader} alt="loader" className="w-full" />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                    <div className="title-container">
                        <h1 className="text-white">Pick an avatar as your profile picture</h1>
                    </div>

                    <div className="avatars flex gap-8 mt-8">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar border-4 border-transparent rounded-full p-1 ${
                                    selectedAvatar === index ? 'border-blue-500' : ''
                                }`}
                                onClick={() => setSelectedAvatar(index)}
                            >
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" className="h-24" />
                            </div>
                        ))}
                    </div>

                    <button
                        className="submit-btn bg-purple-700 text-white py-2 px-4 mt-8 font-bold rounded hover:bg-purple-900"
                        onClick={setProfilePicture}
                    >
                        Set as profile picture
                    </button>
                </div>
            )}
            <ToastContainer />
        </>
    );
}

export default SetAvatar;
