import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import authToken from '../../authToken';
import './login.css'
import axios from 'axios';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          isAuthenticated : false,
          redirect : false,
          isEmailExists : true,
          isPassCorrect : true,
          errors: {}
        };
    }

    componentDidMount() {
         if (this.state.isAuthenticated) {
          //this.props.history.push("/dashboard");
        }
      }

      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
	
      onSubmit = e => {
        e.preventDefault();
        this.setState({isEmailExists:true,isPassCorrect:true});
        const userData = {
          email: this.state.email,
          password: this.state.password
        };
        axios.post('/auth/login',userData)
            .then(res => {
              if(res.data.status){
                const token = res.data.token;
                authToken(token);
                this.setState({redirect : true});
              }else{
                if(res.data.message == 'Password incorrect'){
                  this.setState({isPassCorrect: false});
                }else{
                  this.setState({isEmailExists : false});
                }
              }
            })
            .catch(err =>{
                console.log(err);
            })
      };
	
	
	  render() {
        if(this.state.redirect){
          return <Redirect to="/home" />
        }

        return (
          <div id='body'>
            <div className="wrapper fadeInDown">
              <div id="formContent">
              <br/>
              <h1 className="h3 mb-3 text-center font-weight-normal">Please Login here...</h1>
                <form onSubmit={this.onSubmit} autoComplete="off" >
                  <input type="text" id="email" onChange={this.onChange} className="fadeIn second" name="email" placeholder="email"/>
                  {this.state.isEmailExists ? null : <p id='error'>Email not found</p>}
                  <input type="password" id="password" onChange={this.onChange} className="fadeIn third" name="password" placeholder="password"/>
                  {this.state.isPassCorrect ? null : <p id='error'>Password incorrect</p>}
                  <br/>
                  <input type="submit" className="fadeIn fourth" value="Log In"/>
                </form>

                <div id="formFooter">
                  <Link className="underlineHover" to="/register">Don't have an account?</Link>
                </div>

              </div>
            </div>
          </div>
        )
        /*return (
          <div className="base-wrapper">
            <div className="auth-header">Sign In</div>
            <form className="auth-form" noValidate onSubmit={this.onSubmit}>
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
                  <div className="auth-error">
                    {errors.email}
                    {errors.emailnotfound}
                  </div>
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
                  <div className="auth-error">
                    {errors.password}
                    {errors.passwordincorrect}
                  </div>
                </label>
              </div>
    
              <div>
                <button type="submit" className="auth-button">
                  Login
                </button>
              </div>
              <div className="bottom-group">
                <Link to="/register" className="link">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        );*/
      }
}

export default login;
