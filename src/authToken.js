import axios from 'axios';

const authToken = token => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
      localStorage.setItem("jwtToken", token);              //  JSON.stringify(token)
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('jwtToken');
    }
  };
  export default authToken;