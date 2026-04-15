import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
    const [showpassword, setShowpassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setToken} = useAuth()
    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            if (!email || !password) return toast.error('All fields are required')

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/login`, { email, password })

            if (response.status === 400) {
                toast.error(response.data.message)
            }
            if (response.status === 200) {
                const data = response.data
                if (data?.token) {
                    localStorage.setItem('token', data?.token)
                    setToken(data.token)
                    toast.success("Login successfully")
                }
                else {
                    navigate('/login')
                    toast.error("Login failed, please try again")
                }
            }

        } catch (err) {
            toast.error(err.response.data.message)
        }
    }
    return (
        <div className="h-screen overflow-hidden flex items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">
                <Link to="/">
                    <img className="w-10 h-10 mx-auto cursor-pointer" src="./favicon.png" alt="logo" />
                </Link>
                {/* Logo / Title */}
                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    PitchPilot AI
                </h1>
                <p className="text-slate-400 text-center mb-6">
                    Welcome back. Login to continue.
                </p>

                {/* Form */}
                <form onSubmit={(e) => { submitHandler(e) }} className="space-y-5">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">
                            Email
                        </label>
                        <input
                            value={email}
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-1">
                            Password
                        </label>
                        <div className="group flex items-center px-4 w-full bg-slate-800 border border-slate-700 rounded-lg 
                focus-within:ring-2 focus-within:ring-orange-500 
                focus-within:border-orange-500 transition">

                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type={showpassword ? "text" : "password"}
                                placeholder={!showpassword ? "••••••••" : "Password"}
                                className="w-full py-2 bg-transparent text-white 
               outline-none placeholder-slate-400"
                            />
                            <div onClick={(e) => { setShowpassword(!showpassword) }} className="cursor-pointer">{
                                showpassword ? <FaEyeSlash className="text-slate-400" /> : <FaEye className="text-slate-400" />}</div>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full focus-within:outline-none hover:bg-linear-to-r from-orange-600 to-red-700 bg-orange-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-slate-400 text-sm text-center mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-orange-500 hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;