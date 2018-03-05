import React from 'react';

import './Post.css';

const post = (props) => (
        <article className="Post" onClick={props.postClicked}>
            <h1>{props.postdata.title}</h1>
            <div className="Info">
                <div className="Author">{props.postdata.cust_author}</div>
            </div>
        </article>
    );

export default post;