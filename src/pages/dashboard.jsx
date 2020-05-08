import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import authToken from '../authToken';
import {Button , Modal} from 'react-bootstrap';
import EditItem from './editItem';
import jwt_decode from 'jwt-decode';
import './dashboard.css';
import axios from 'axios';

class dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            subject: '',
            minPer : Number,
            clsAtt : Number,
            totCls : Number,
            isAuthenticated : true,
            editItem : false,
            show : false ,
            user : '',
            selectedObj: {},
            subjects : []
            }
        }

    componentDidMount =()=>{
            axios.get('/user')
                .then(res => {
                    if(res.data){
                        this.setState({subjects : res.data.subjects})
                    }
                })
                .catch(err => {
                    console.log('can not access protected route');
                })
            let token = localStorage.getItem('jwtToken');
            let decoded = jwt_decode(token);
            this.setState({user : decoded.name});
            console.log(decoded);
    }

    componentWillMount(){
        const token = localStorage.getItem('jwtToken');
        authToken(token);
        if(token){
            this.setState({isAuthenticated : true});
        authToken(token);
        }else
        this.setState({isAuthenticated : false});
    }

    updateStateWithItem = (items) => {
        this.setState({subjects : items});
    }

    toogleEdit =()=>{
        this.setState({editItem : !this.state.editItem})
    }

    logout = () => {
        authToken(null);
        this.setState({isAuthenticated:false});
    }

    addSubject = () => {
        console.log('subject modal');
        this.toogleadd();
    }

    delete = (event)=>{
        event.preventDefault();
        const id = event.currentTarget.id;
        axios.patch('/user/delete/'+id)
            .then(res => {
                this.setState({subjects : res.data.subjects});
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

    onChange = event => {
        this.setState({[event.target.id] : event.target.value});
    }


    addNewItem = (event)=>{
        event.preventDefault();
        const newItem = {
            subject : this.state.subject,
            minPer : this.state.minPer,
            clsAtt : this.state.clsAtt,
            totCls : this.state.totCls
        }

        axios.post('/user/add' , newItem)
            .then(res => {
                console.log('post request to /user/add');
                if(res.data){
                    let items = res.data;
                    newItem._id=Math.random();
                    items.push(newItem);
                    this.setState({subjects : items , selectedObj : newItem});
                }else{
                    newItem._id = Math.random();

                    this.setState({subjects : [newItem],selectedObj : newItem});
                }
            })
        .catch(err => {
            console.log(err);
        })

        this.setState({
            subject: '',
            minPer : Number,
            clsAtt : Number,
            totCls : Number,
            show : false
        });
    }


    edit = (event) => {
        event.preventDefault();
        const id = event.currentTarget.id;
        const obj = this.state.subjects.filter(sub => sub._id === id);
        if(obj[0]){
            this.setState({selectedObj : obj[0]});
            this.toogleEdit();
        }
        else
        alert("Just created can not edit now")
    }

    render() {
        let details = this.state.subjects;
        if(this.state.isAuthenticated){
            if(this.state.editItem)
            return (
                <EditItem toogleEdit={this.toogleEdit} updateState={this.updateStateWithItem} subject={this.state.selectedObj} />
            )
            else
            return (
                <div>
                    <div id='title'>
                        <div className="row">
                            <div className="col-md-9 ">
                                <div className="text-left p-2">
                                    <h3 id='welcome'>Welcome! <span className='font-italic'>{this.state.user}</span> </h3>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className='text-right p-2'>
                                    <Modal show={this.state.show} onHide={this.handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Add New Subject</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form action="" autoComplete='off' >
                                            <label >Subject</label>
                                            <input onChange={this.onChange} type="text" id="subject" name="subject" placeholder="Subject..."></input>

                                            <label >Minimum percentage</label>
                                            <input onChange={this.onChange} type="number" id="minPer" name="minPer" placeholder="Minimum percentage..."></input>

                                            <label >Classes Attended</label>
                                            <input onChange={this.onChange} type="number" id="clsAtt" name="clsAtt" placeholder="Classes Attended"></input>

                                            <label >Total Classes</label>
                                            <input onChange={this.onChange} type="number" id="totCls" name="totCls" placeholder="Total Classes"></input>
                                            </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={this.addNewItem}>
                                            Add
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <button className='btn btn-light' onClick={this.handleShow}>Add Subject</button>
                                    <button className='btn btn-danger' onClick={this.logout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Classes Attended</th>
                            <th>Total Classes</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {details.map(sub =>
                                <tr key ={sub._id} id={sub._id} onClick={this.click}>
                                    <td>{sub.subject}</td>
                                    <td>{sub.clsAtt}</td>
                                    <td>{sub.totCls}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button className='btn btn-light' id={sub._id} onClick={this.edit}>Edit</button>
                                            <button className='btn btn-danger' id={sub._id} onClick={this.delete}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            )
        }
        else 
        return (
            <div>
                <Redirect to="/login"/>
            </div>
        );
    }
}

export default dashboard;
