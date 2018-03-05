import React, { Component } from 'react';
import { Route, NavLink , Switch, Redirect}  from 'react-router-dom';


import Posts from './Posts/Posts';
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});



class Blog extends Component {
    state = {
        auth : true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink  
                                    activeClassName="active"
                                    activeStyle={{
                                        textDecoration: 'underline'
                                    }}
                                    to="/post">Posts</NavLink>
                            </li>
                            <li><NavLink 
                                activeClassName="active"
                                to={{
                                pathname : '/new-post',
                                hash : '#submit',
                                search : '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null }
                    <Route path="/post" component={Posts}/>
                    <Route render={() => <h1>Not Found!</h1>}/>
                    {/*<Redirect from="/" to="/post" />*/}
                    {/*<Route path="/" component={Posts}/>*/}
                   
                </Switch>
            </div>
        );
    }
}

export default Blog;