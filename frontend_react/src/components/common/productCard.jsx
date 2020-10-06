import React        from 'react';
import { Link }     from 'react-router-dom';
import userIcons    from '../user_menu/userIcons';
import ReactStars   from 'react-rating-stars-component';

function ProductCard({ data }) {

    return (
        <div className="card border-dark mb-4" >
            <Link to={ data.path }>
                <img
                    src={ `${process.env.REACT_APP_API_URL}${data.photo}` }
                    className="card-img-top"
                    alt={ data.displayName }
                />
            </Link>
            <div className="card-body">
                <h5 className="card-title"><strong>{ data.displayName }</strong></h5>
                <span
                    className="d-flex justify-content-between align-items-center"
                    style={{ margin: '20px 0 -20px 0' }}
                >
                    <ReactStars
                        size={30}
                        value={data.rating}
                        edit={false}
                        isHalf={true}
                    />
                    <h5 style={{ margin: '4px 50px 0 0' }}>{ data.rating }</h5>
                </span>
            </div>
            <div>
                <ul className="list-group list-group-flush">
                    <li key='1' className="list-group-item d-flex justify-content-between align-items-center">
                        <span style={{ margin: '9px 0 0 0' }}>
                            <h5>{ userIcons.downloadIcon('2em') }{ data.downloads }</h5>
                        </span>
                        <h4><strong>${ data.price }</strong></h4>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductCard;