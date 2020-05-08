import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'
import "./Auth.scss";
import './register.css';

class register extends Component {

constructor(props){
    super(props);
    this.state = {
        name : '',
        email : '',
        password : '',
        vpassword : '',
        isAuthenticated : false,
        isValidEmail : true,
        isPasswordMatch : true,
        isLoading : false,
        redirect : false,
        errors : {}
    };
}


componentDidMount(){
    if(this.state.isAuthenticated)
    console.log('user is authenticated');
}

onChange = event => {
    this.setState({[event.target.name] : event.target.value});
}

onSubmit = event => {
    event.preventDefault();

    if(this.state.password !== this.state.vpassword){
      this.setState({isValidEmail : true});
      this.setState({isPasswordMatch : false});
    }
    else{
      const newUser = {
        name : this.state.name,
        email : this.state.email,
        password : this.state.password
    }
      axios.post('/auth/register',newUser)
          .then(res => {
            if(res.data.success){
              console.log('New user registered');
              this.setState({redirect : true});
            }else{
              this.setState({isPasswordMatch : true});
              this.setState({isValidEmail : false});
            }
          })
          .catch(err => alert(err));
    }

}


render() {
  let {isValidEmail,isPasswordMatch} = this.state;
    if(this.state.redirect){
      return <Redirect to="/login" />
    }else
    return (
      <div className="container">
        <div id="form">
          <h4 className="text-center">Please Register here...</h4>
          <form onSubmit={this.onSubmit} autoComplete="off" >
            <label htmlFor="">User Name:</label>
            <input type="text" id="name" onChange={this.onChange} className=" " name="name" placeholder="User Name"/>
            <label htmlFor="" autoComplete="off">Email:</label>
            <input type="email" id="email" onChange={this.onChange} className=" " name="email" placeholder="email"/>
            {!isValidEmail ? <p>Email already exists</p> : null} 
            <label htmlFor="">Password:</label>
            <input type="password" id="password" onChange={this.onChange} className=" " name="password" placeholder="password"/>
            <label htmlFor="">Verify Password:</label>
            <input type="password" id="vpassword" onChange={this.onChange} className=" " name="vpassword" placeholder="password"/>
            {isPasswordMatch ? <p></p> : <p>Passwords are not matched</p>}
            <div>
            <input type="submit" className=" " value="Sign Up"/>
            <Link to='/login' style={{float : "right",marginTop:50}}>Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    );
    /*return (
        <div className="base-wrapper">
        <div className="auth-header">Register Below</div>
        <form className="auth-form" noValidate onSubmit={this.onSubmit}>
          <div className="auth-group">
            <label>
              <div className="auth-label">Name</div>
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className="auth-input"
              />
              <div className="auth-error">{errors.name}</div>
            </label>
          </div>

          <div className="auth-group">
            <label>
              <div className="auth-label">Email address</div>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className="auth-input"
              />
              <div className="auth-error">{errors.email}</div>
            </label>
          </div>

          <div className="auth-group">
            <label>
              <div className="auth-label">Password</div>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className="auth-input"
              />
              <div className="auth-error">{errors.password}</div>
            </label>
          </div>

          <div>
            <button type="submit" className="auth-button">
              Sign up
            </button>
          </div>
          <div className="bottom-group">
            <Link to="/login" className="link">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    );*/
}

}

export default register;
