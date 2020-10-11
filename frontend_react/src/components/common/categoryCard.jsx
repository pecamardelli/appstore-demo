import React    from 'react';
import { Link } from 'react-router-dom';

function CategoryCard(props) {
    return (
        <div className="card border-dark mb-4 text-center" >
            <Link to={props.data.path}>
                <div className="card-body" style={{marginTop: '10px'}}>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/categories/${props.data.id}.png`}
                        style={{maxHeight: '100px', maxWidth: '160px'}}
                        className="card-img-top"
                        alt={props.data.displayName}
                    />
                    <br /><br />
                    <h5 className="card-title">{props.data.displayName}</h5>
                </div>
            </Link>
            <div className="card-footer d-flex justify-content-between align-items-center">
                Total apps
                <span className="badge badge-danger badge-pill">{props.data.total}</span>
            </div>
        </div>
    );
}

export default CategoryCard;