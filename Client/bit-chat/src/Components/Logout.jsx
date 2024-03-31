import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';

function Logout(props) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <button onClick={handleLogout} className="flex justify-center items-center p-2 rounded-md bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300">
            <BiPowerOff className="text-white text-lg" />
        </button>
    );
}

export default Logout;
