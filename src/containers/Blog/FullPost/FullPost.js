import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        currentPost : null,
        error : false
    }
    componentDidMount(){
        this.loadData();
    }
    componentDidUpdate(){
        this.loadData();
    }

    loadData(){
        if(this.props.match.params.id){
            if ( !this.state.currentPost || (this.state.currentPost && this.state.currentPost.id !== +this.props.match.params.id) ) {
                axios.get('/posts/'+this.props.match.params.id).then(result => {
                    this.setState({ currentPost : result.data});
                }).catch(error => {
                    this.setState({error : true});
                });
            }   
        }
    }
    deleteHandler = () => {
        axios.delete('/posts/'+this.props.match.params.id)
        .then(response => {
            console.log(response);
        });
    }
    
    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( this.props.match.params.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
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