import React, { Component } from 'react';
import './header.css'

class header extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id='container'  className="page-header">
                <div id='heading' className='text-center'>
                    <h1 className='display-4'>ATTENDENCE MANAGER
                    <p id='caption' className='font-weight-bold'>A Place where you can Manage your Attendence</p>
                    </h1>
                </div>
            </div>
        );
    }
}

export default header;
