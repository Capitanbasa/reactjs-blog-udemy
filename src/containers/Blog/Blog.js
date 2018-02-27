import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from 'axios';
import './Blog.css';

class Blog extends Component {
    constructor(){
        super();
        this.state = {
            posts : [],
            selectedPostId : null,
            error : false
        }
    }
    
    componentDidMount() {
        axios.get('/posts')
            .then((result) => {
                const posts = result.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        cust_author : 'Hercival'
                    }
                });
                this.setState({posts : updatedPosts})

            })
            .catch(error => {
                this.setState({error : true});
            });
    }

    postClickHandler = (id) => {
        this.setState({selectedPostId : id});
    }
    
    render () {
        let postitems = <p>Something went wrong!</p>
        if(!this.state.error){
            postitems = this.state.posts.map((postitem) => {
                return <Post key={postitem.id} postdata={postitem} postClicked={() => this.postClickHandler(postitem.id)}/>
            });
        }
        
        return (
            <div>
                <section className="Posts">
                    { postitems }
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;