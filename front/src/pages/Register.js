import React, {useEffect, useState} from 'react';
import '../css/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import {login} from "../features/auth/AuthSlice";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios";

function Register() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users', credentials);
            dispatch(login(response.data.token));
        } catch (err) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="login_wrapper">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="input-container">
                        <label htmlFor="username">Email</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button mb-5">{loading ? 'Registering...' : 'Register'}</button>
                    <span>Have account? <Link to='/login'>Login</Link></span>
                    <span style={{color: "red"}}>{error}</span>
                </form>
            </div>
        </div>
    );
}

export default Register;
