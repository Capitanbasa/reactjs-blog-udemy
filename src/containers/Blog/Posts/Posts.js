import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
//import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts : []
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
                console.log(error);
                //this.setState({error : true});
            });
    }
    postSelectedHandler = (id) => {
        //this.setState({selectedPostId : id});
        // this.props.history.push({
        //     pathname : '/post/'+id
        // });
        this.props.history.push('/post/' + id);
    }
    render(){
        let postitems = <p>Something went wrong!</p>
        if(!this.state.error){
            postitems = this.state.posts.map((postitem) => {
                return (
                    //<Link to={'/post/' + postitem.id} key={postitem.id}>
                        <Post key={postitem.id} postdata={ postitem } postClicked={() => this.postSelectedHandler(postitem.id)}/>
                    //</Link>
                );
            });
        }
        return (
            <div>
                <section className="Posts">
                    { postitems }
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
            
        );
    }
}

export default Posts;