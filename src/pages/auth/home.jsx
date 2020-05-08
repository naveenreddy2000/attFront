import React, { Component } from 'react';
import {Link , Redirect} from 'react-router-dom';
import './home.css';
import authToken from '../../authToken';

class home extends Component {
    

  constructor(){
    super();
    this.state = {
      isAuthenticated : false
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('jwtToken');
    if(token){
        this.setState({isAuthenticated : true});
        authToken(token);
    }
  }


    render() {
        if(this.state.isAuthenticated)
        return (
            <Redirect to='home'/>
        )
        return (
              <div className='container'>
                <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                <h4 className='text-center'>Please Login/Register</h4>
                <br/>
              <div className="text-center">
                <Link className="btn btn-light" to="/register">Register</Link>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link className="btn btn-success" to="/login">Login</Link>
              </div>
            </div>
        );
    }
}

export default home;
