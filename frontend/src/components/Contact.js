import React, { useState, useEffect } from 'react';
import location from "../images/location.png";
import phone from "../images/phone2.png";
import email from "../images/email2.png";
import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsUserLoggedIn(!!user);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/contact/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
          toast.success('Email has been sent successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: ''
            });
        } else {
            throw new Error(data.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Sending message failed:', error);
        alert('Failed to send message: ' + error.message);
    }
  }

  if (!isUserLoggedIn) {
    return (
      <>
        <NavigationBar />
        
        <div className="flex items-center justify-center min-h-screen bg-pink-50">
          <div className="text-xl text-center">
            <p>Please login for contacting us.</p>
            <Link to="/login" className="underline text-blue-600 hover:text-blue-800">
              Go to Login
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <ToastContainer />
      <div className="flex flex-row items-center justify-center min-h-screen bg-pink-50 p-10">
        <div className="w-1/2 space-y-4 p-32">
          <h2 className="text-3xl font-semibold pb-10">Write us a message!</h2>
          <p>If you want to make suggestions or if you have any questions, please fill out the form and we'll respond shortly!</p>
          <div className="space-y-2">
            <div className="flex items-center pl-2 space-x-2">
              <img src={location} alt="location" className="w-5 h-5" />
              <span>Universitatea de Vest Timișoara</span>
            </div>
            <div className="flex items-center pl-2 space-x-1">
              <img src={phone} alt="phone" className="w-5 h-5" />
              <span>+4038222669</span>
            </div>
            <div className="flex items-center pl-2 space-x-2">
              <img src={email} alt="email" className="w-5 h-3" />
              <span>xcristigaming@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-20 rounded-lg">
          <div className='bg-gray-50 p-4 border border-1 rounded-lg'>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name*" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name*" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
              </div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email*" className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number*" className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" required />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message..." className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" rows="4"></textarea>
              <button type="submit" className="w-full text-white bg-pink-600 hover:bg-pink-900 py-2 rounded-xl transition duration-200">
                Send message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
