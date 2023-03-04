import React from 'react';
import axios from 'axios';

import userStore from '../stores/userStore';

//User login logic
export const loginUser = async () => {
  const url = 'https://api.baasic.com/v1/myapp-test/login';
  const params = new URLSearchParams();
  params.append('username', userStore.username);
  params.append('password', userStore.password);
  params.append('grant_type', 'password');

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(url, params, headers);
    window.open('/', '_self');

    localStorage.setItem('token', response.data.access_token);
  } catch (err) {
    console.log(err);
  }
};

//User register logic
// export const registerUser = () => {

// }
