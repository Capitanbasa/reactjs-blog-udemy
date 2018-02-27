import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        currentPost : null,
        error : false
    }
    componentDidUpdate(){
        if(this.props.id){
            if(!this.state.currentPost || (this.state.currentPost && this.props.id !== this.state.currentPost.id)){
                axios.get('/posts/'+this.props.id).then(result => {
                    this.setState({ currentPost : result.data});
                }).catch(error => {
                    this.setState({error : true});
                });
            }
            
        }
    }
    deleteHandler = () => {
        axios.delete('/posts/'+this.props.id)
        .then(response => {
            console.log(response);
        });
    }
    
    render () {
        let post = <p style={{textAlign : 'center'}}>Please select a Post!</p>;
        if(this.props.id){
            post = <p style={{textAlign : 'center'}}>Still Loading a Post!</p>;
        }
        if(this.state.currentPost){
            
            post = (
                <div className="FullPost">
                    <h1>{this.state.currentPost.title}</h1>
                    <p>{this.state.currentPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deleteHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;