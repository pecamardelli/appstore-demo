import React, { useEffect, useState } from 'react';
import noImage from '../assets/images/image_not_found.png';

function CommentsContainer({comments}) {
    return (
        <div className="card border-dark comment-list">
            <div className="card-body">
                <div className="card-title">
                    <h4>Comments</h4>
                </div>
                <ul className="list-unstyled">
                    {comments.map(comment => <>
                        <li key={comment.id} className="media">
                            <img
                                src={`${process.env.REACT_APP_API_URL}/images/users/avatar/${comment.User.id}.png`}
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src = noImage ? noImage : '...';
                                }}
                                className="mr-3 comment-image" 
                                alt=''
                            />
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{comment.User.username}</h5>
                                {comment.text}
                            </div>
                        </li>
                        <hr /></>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default CommentsContainer;