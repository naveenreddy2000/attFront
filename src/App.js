import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Home from './pages/auth/home';
import Header from './components/header';
import Dashboard from './pages/dashboard';
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="container" >
        <Router>
          <Switch>
            <Route path="/register">
              <Header/>
              <Register/>
            </Route>
            <Route path="/login">
              <Header/>
              <Login/>
            </Route>
            <Route path="/home">
              <Header/>
              <Dashboard/>
            </Route>
            <Route path="/">
              <Header/>
              <Home/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

