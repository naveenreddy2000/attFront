import React, { Component } from 'react';
import {Button , Modal} from 'react-bootstrap';
import './add.css';
import Axios from 'axios';

class addForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            subject: '',
            minPer : Number,
            clsAtt : Number,
            totCls : Number,
            show : false
        }
    }

    onChange = event => {
        this.setState({[event.target.id] : event.target.value});
    }

    onSubmit = (event)=>{
        event.preventDefault();
        const newItem = {
            subject : this.state.subject,
            minPer : this.state.minPer,
            clsAtt : this.state.clsAtt,
            totCls : this.state.totCls
        }

        Axios.post('/user/add' , newItem)
            .then(res => {
                this.props.toogleadd();
                console.log('post request to /user/add');
                if(res.data){
                    let items = res.data;
                    newItem._id=Math.random();
                    items.push(newItem);
                    this.props.updateState(items);
                }else{
                    newItem._id = Math.random();
                    this.props.updateState([newItem]);
                }
            })
        .catch(err => {
            console.log(err);
        })
    }

    handleShow= () =>{
        this.setState({show : true})
    }

    handleClose = () => {
        this.setState({show : false})
    }

    render() {
            return (
                <>
                  <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal
                  </Button>
            
                  <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>   
                    <input type="text" class="form-control form-control"></input>
                    <input type="number" class="form-control form-control"/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              );
        /*return (
            <div>
                <form action="" onSubmit={this.onSubmit}>
                    <label htmlFor="">sub:</label>
                    <input id="subject" value={this.state.subject} onChange={this.onChange} type="text" placeholder=""/>
                    <br/>
                    <label htmlFor="">minPer:</label>
                    <input id="minPer" value={this.state.minPer} onChange={this.onChange} type="number"/>
                    <br/>
                    <label htmlFor="">claAtt:</label>
                    <input id="clsAtt" value={this.state.clsAtt} onChange={this.onChange} type="number"/>
                    <br/>
                    <label htmlFor="">totCls:</label>
                    <input id="totCls" value={this.state.totCls} onChange={this.onChange} type="number"/>
                    <br/>
                    <button type="submit" >Add</button>
                </form>
            </div>
        );*/
    }
}

export default addForm;
