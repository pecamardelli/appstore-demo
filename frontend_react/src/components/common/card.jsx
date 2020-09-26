import React, { Fragment }    from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
    console.log(props)
     return (
        <Fragment>
            <div className="card border-dark mb-4" >
                <Link to={ props.data.endPoint }>
                    <div className="card-body">
                        <h5 className="card-title">{ props.data.displayName }</h5>
                        <p className="card-text">{ props.data.description }</p>
                    </div>
                </Link>
                <div className="card-footer">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Total apps
                            <span className="badge badge-danger badge-pill">14</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default Card;