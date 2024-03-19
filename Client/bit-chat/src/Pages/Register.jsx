import React from 'react';

function Register(props) {
    return (
        <>
            <div className="h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                        <img src='' alt="logo" className="h-20" />
                        <h1 className="text-white uppercase">Bit-Chat</h1>
                    </div>
                    <form className="flex flex-col gap-8 bg-black rounded-lg p-12" >
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            
                            
                            className="bg-transparent px-4 py-2 border border-purple-500 rounded focus:border-purple-700 focus:outline-none text-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            
                            
                            className="bg-transparent px-4 py-2 border border-purple-500 rounded focus:border-purple-700 focus:outline-none text-white"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                        
                            
                            className="bg-transparent px-4 py-2 border border-purple-500 rounded focus:border-purple-700 focus:outline-none text-white"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            
                            
                            className="bg-transparent px-4 py-2 border border-purple-500 rounded focus:border-purple-700 focus:outline-none text-white"
                        />

                        <button type="submit" className="bg-purple-700 text-white px-6 py-3 font-bold rounded hover:bg-purple-600 transition duration-300">Create User</button>

                        <span className="text-white uppercase">Already have an account?</span>
                    </form>
                </div>
            </div>
          
        </>
    );
}

export default Register;