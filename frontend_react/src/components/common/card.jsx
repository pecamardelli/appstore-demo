import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
    console.log(props)
     return (
        <Link to=''>
            <div className="card border-dark mb-4" >
                <div className="card-body">
                    <h5 className="card-title">{ props.data.displayName }</h5>
                    <p className="card-text">{ props.data.productId }</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{ props.data.id }</small>
                </div>
            </div>
        </Link>
    );
}

export default Card;