import React, { Component } from 'react';
import './edit.css'
import axios from 'axios';

class editItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            subject : this.props.subject.subject,
            minPer :this.props.subject.minPer,
            clsAtt : this.props.subject.clsAtt,
            totCls: this.props.subject.totCls
        }
    }

    onChange = event =>{
        this.setState({[event.target.name] : event.target.value});
    }

    onSubmit = event => {
        event.preventDefault();
        const newItem = {
            _id : this.props.subject._id,
            subject : this.state.subject,
            minPer : this.state.minPer,
            clsAtt : this.state.clsAtt,
            totCls : this.state.totCls
        }
        axios.post('/user/edit/'+this.props.subject._id,newItem)
            .then(res => {
                this.props.updateState(res.data.subjects);
                this.props.toogleEdit();
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="container">
                <div id="editForm">
        <h4 className="text-center">Edit <h6 className="font-weight-normal">{this.state.subject}</h6></h4>
                    <form action="" onSubmit={this.onSubmit}>

                        <label >Subject</label>
                        <input onChange={this.onChange} value={this.state.subject} type="text" id="subject" name="subject"></input>

                        <label >Minimum percentage</label>
                        <input onChange={this.onChange} value={this.state.minPer} type="number" id="minPer" name="minPer"></input>

                        <label >Classes Attended</label>
                        <input onChange={this.onChange} value={this.state.clsAtt} type="number" id="clsAtt" name="clsAtt"></input>

                        <label >Total Classes</label>
                        <input onChange={this.onChange} value={this.state.totCls} type="number" id="totCls" name="totCls"></input>

                        <br/>
                        <div className="text-center">
                        <button  type="submit" >Edit</button></div>

                    </form>
                </div>
            </div>
        );
    }
}

export default editItem;
