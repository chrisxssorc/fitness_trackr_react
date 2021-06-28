import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { registerUser, loginUser, getUser, logoutUser } from '../api';

const Home = ({token, setToken, setUsername}) => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const registerHandler = async () => {
        try {
            const newToken = await registerUser(newUsername, newPassword);
            setToken(newToken);
            const newUser = await getUser(newToken);
            setUsername(newUser);
        } catch (error) {
            throw error;
        }
    }
    
    const logInHandler = async () => {
        try {
            const newToken = await loginUser(newUsername, newPassword);
            setToken(newToken);
            const newUser = await getUser(newToken);
            setUsername(newUser);
        } catch (error) {
            throw error;
        }
    }
    
    const logOutHandler = () => {
        logoutUser();
        setToken('');
    }

    return (
        <header>
            <h1>Fitness Trackr</h1>
            <div id="header-tools">
                <nav>
                    <NavLink to="/home" activeClassName="current-page">Home</NavLink>
                    {token
                    ? <NavLink to="/myroutines" activeClassName="current-page">My Routines</NavLink>
                    : ''}
                    <NavLink to="/routines" activeClassName="current-page">Routines</NavLink>
                    <NavLink to="/activities" activeClassName="current-page">Activities</NavLink>
                </nav>
                <div id="registerForms">
                    {
                        token
                        ? <button onClick={(event)=>{
                                event.preventDefault();
                                {logOutHandler()}
                            }
                        }>Log Out</button>
                        : <div>
                            <form id="loginForm" onSubmit={(event)=>{
                                        event.preventDefault();
                                        logInHandler();
                                    }
                                }>
                                <label>Log In</label>
                                <input
                                    id="newUsername"
                                    type="text"
                                    placeholder="Username..."
                                    onChange={(event) => {
                                            event.preventDefault();
                                            {setNewUsername(event.target.value)};
                                        }
                                    }/>
                                <input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Password..."
                                    onChange={(event) => {
                                        event.preventDefault();
                                        {setNewPassword(event.target.value)};
                                    }
                                }/>
                                <button>Log In</button>
                            </form>
                            <form id="registerForm" onSubmit={(event)=>{
                                        event.preventDefault();
                                        registerHandler()
                                    }
                                }>
                                <label>Register New Account</label>
                                <input
                                    id="newUsername"
                                    type="text"
                                    placeholder="Username..."
                                    onChange={
                                        (event) => {
                                            event.preventDefault();
                                            {setNewUsername(event.target.value)}
                                    }
                                    }/>
                                <input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Password..."
                                    onChange={
                                        (event) => {
                                            event.preventDefault();
                                            {setNewPassword(event.target.value)}
                                        }
                                    }/>
                                <button>Register</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Home;