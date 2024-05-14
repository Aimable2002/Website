import React, { useState } from 'react';
import axios from 'axios';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const signup = async ({ fullName, userName, age, gender, email, password, confirmPassword }) => {
    setLoading(true);
    try {
      const res = await axios.post('https://website-s9ue.onrender.com/api/auth/signup', {
        fullName,
        userName,
        age,
        gender,
        email,
        password,
        confirmPassword
      });
      const data = res.data;

      if (data.error) {
        throw new Error('Signup error: ' + data.error.message);
      }

      console.log('Signup successful');
      localStorage.setItem('online-user', JSON.stringify(data));
      window.location = '/';
    } catch (error) {
      console.error('Error in useSignup:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
