import React, { useState } from 'react';

const UserManagement = () => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email_id: '',
        mobile_number: '',
        password: '',
        gender: 'O',
        is_active: true,
    });

    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const registerUser = async () => {
        const response = await fetch('http://127.0.0.1:8000/admin_console/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const result = await response.json();
        setMessage(result.Message);
    };

    const loginUser = async () => {
        const response = await fetch('http://127.0.0.1:8000/admin_console/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        });
        const result = await response.json();
        setMessage(result.Message);
    };

    return (
        <div>
            <h2>User Registration</h2>
            <input name="first_name" placeholder="First Name" onChange={handleUserInputChange} required />
            <input name="last_name" placeholder="Last Name" onChange={handleUserInputChange} required />
            <input name="email_id" type="email" placeholder="Email" onChange={handleUserInputChange} required />
            <input name="mobile_number" placeholder="Mobile Number" onChange={handleUserInputChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleUserInputChange} required />
            <select name="gender" onChange={handleUserInputChange}>
                <option value="O">Others</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            <button onClick={registerUser}>Register</button>
            
            <h2>User Login</h2>
            <input name="username" placeholder="Email" onChange={handleLoginInputChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleLoginInputChange} required />
            <button onClick={loginUser}>Login</button>
            
            {message && <p>{message}</p>}
        </div>
    );
};

export default UserManagement;
