import { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/apiRoutes';
import backgroundimage from '../assets/bg-3.jpg';
import logo from '../assets/logo.png';

function Register(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const toastOptions = {
        position: 'top-center',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = formData;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if (data.status === false) {
                toast.error(data.message, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate('/');
            }
        }
    };

    const handleValidation = () => {
        const { password, confirmPassword, email, username } = formData;

        if (password !== confirmPassword) {
            toast.error("password and confirm password should be same", toastOptions);
            return false;
        }

        if (!username || !email || !password) {
            toast.error("Missing required fields", toastOptions);
            return false;
        }

        return true;
    };

    const handleChanges = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <>
            <div className="h-screen w-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundimage})` }}>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="logo" className="h-20" />
                        <h1 className="text-white uppercase">Bit-Chat</h1>
                    </div>
                    <form className="flex flex-col gap-8 bg-black rounded-lg p-12" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username || ''}
                            onChange={handleChanges}
                            className="bg-transparent px-4 py-2 border border-purple-500 rounded focus:border-purple-700 focus:outline-none text-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChanges}
                            className="bg-transparent px-4 py-2 border border-purple-500 rounded focus:border-purple-700 focus:outline-none text-white"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password || ''}
                            onChange={handleChanges}
                            className="bg-transparent px-4 py-2 border border-purple-500 rounded focus:border-purple-700 focus:outline-none text-white"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword || ''}
                            onChange={handleChanges}
                            className="bg-transparent px-4 py-2 border border-purple-500 rounded focus:border-purple-700 focus:outline-none text-white"
                        />

                        <button type="submit" className="bg-purple-700 text-white px-6 py-3 font-bold rounded hover:bg-purple-600 transition duration-300">Create User</button>

                        <span className="text-white uppercase">Already have an account? <Link to="/login" className="font-bold">Login</Link></span>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Register;
