import React, { useEffect, useState } from 'react';
import Icons from '../assets/icons';
import noImage from '../assets/images/image_not_found.png';

function CommentsContainer({comments}) {
    const [ pageSize, setPageSize ] = useState(5);
    const [ pageNumber, setPageNumber ] = useState(0);
    const [ commentList, setCommentList ] = useState([]);

    useEffect(() => {
        setCommentList(comments.slice(pageNumber*pageSize, pageNumber*pageSize+pageSize));
    }, [setCommentList, pageNumber, pageSize ]);

    function changePage(number) {
        if (number >= 0 && number < comments.length/pageSize) setPageNumber(number);
    }
    
    function renderPageButtons() {
        let pages = [];
        for (let i=0;i<comments.length;i+=pageSize) {
            pages.push(i);
        }

        return (<div style={{maxWidth: `${pages.length*5}%`}}  className="mx-auto d-flex justify-content-between align-items-center">
                <span role='button' onClick={() => changePage(pageNumber-1)}>
                    {Icons.caretLeft()}
                </span>
                {
                pages.map(p => <a
                    role='button'
                    onClick={() => changePage(p/pageSize)}>
                        {p/pageSize+1}&nbsp;
                    </a>)
                }
                &nbsp;
                <span role='button' onClick={() => changePage(pageNumber+1)}>
                    {Icons.caretRight()}
                </span>
            </div>);
    }

    return (
        <div className="card border-dark comment-list">
            <div className="card-body">
                <div className="card-title">
                    <h4>Comments</h4>
                </div>
                <ul className="list-unstyled">
                    {commentList.map(comment => <>
                        <hr />
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
                                <div className="mt-0 mb-1 d-flex justify-content-between align-items-center">
                                    <h5>
                                        {comment.User.username}
                                    </h5>
                                    <small className='text-muted'>
                                        {new Date(comment.createdAt).toDateString()}
                                        &nbsp;{new Date(comment.createdAt).toLocaleTimeString()}
                                    </small>
                                </div>
                                {comment.text}
                            </div>
                        </li></>
                    )}
                </ul>
            </div>
            <div className="card-footer">
                { renderPageButtons() }
            </div>
        </div>
    );
}

export default CommentsContainer;