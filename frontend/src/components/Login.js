import React, { useState } from 'react';
import axios from 'axios';
import LoginImage from "../images/LoginImage.PNG";
import NavigationBar from './NavigationBar';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const userData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', userData);
      const { email } = response.data;

      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/about'); // Use React Router's navigate function
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <>
      <NavigationBar />
      <div className="flex items-center justify-center h-screen bg-pink-200">
        <div className="flex p-6 bg-login-bg rounded-xl shadow-lg bg-pink-100">
          <div className="flex flex-col w-1/2 m-2">
            <h2 className="text-3xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <button type="submit" className="w-full text-white bg-pink-600 hover:bg-pink-900 py-2 rounded-xl transition duration-200">
                Sign in →
              </button>
              <div className="text-center text-sm text-pink-600">
                <a href="#" className="">Not a member?</a>
                <a href="/sign-up" className="underline">Create an account</a>
              </div>
            </form>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img src={LoginImage} alt="Decorative" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
