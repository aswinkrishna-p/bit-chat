import React from 'react';
import Robot from '../assets/robot.gif';

function Welcome({ currentUser }) {
    return (
        <div className="flex justify-center items-center flex-col text-white">
            <img src={Robot} alt="Robot" className="h-80" />
            <h1>
                Welcome, <span className="text-blue-500">{currentUser.username}!</span>
            </h1>
            <h3>Please select a chat to start messaging..!</h3>
        </div>
    );
}

export default Welcome;
