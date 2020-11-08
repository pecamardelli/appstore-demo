import React        from 'react';
import { Link }     from 'react-router-dom';
import Icons        from './userIcons';
import ToolTipEntry from './toolTip';

function ProductCard({ data }) {
    return (
        <div className="card border-dark mb-4 my-product-card" >
            <img
                src={ `${process.env.REACT_APP_API_URL}/images/products/${data.id}.png` }
                className="card-img-top"
                alt={ data.displayName }
            />
            <div className="card-body">
                <h6 className="card-title"><strong>{ data.displayName }</strong></h6>
                <span className="d-flex justify-content-between align-items-center">
                    <h6>{ data.Category.displayName }</h6>
                    <span style={{ margin: '-10px 0 0 0' }}>
                        <Link to={ `/me/products/edit/${data.id}` }>
                            <ToolTipEntry icon={Icons.editIcon()} tip='Edit' />
                        </Link>
                    </span>
                </span>
                <small>Updated {new Date(data.updatedAt).toDateString()}</small>
            </div>
        </div>
    );
}

export default ProductCard;