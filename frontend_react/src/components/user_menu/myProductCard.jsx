import React        from 'react';
import { Link }     from 'react-router-dom';
import Icons        from '../../assets/icons';
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
                <div className="card-title card-2-seg">
                    <h6><strong>{ data.displayName }</strong></h6>
                </div>
                
                <div className="d-flex justify-content-between align-items-center card-2-seg">
                    <h6>{ data.Category.displayName }</h6>
                    <span style={{ margin: '-10px 0 0 0' }}>
                        <Link to={ `/me/products/edit/${data.id}` }>
                            <ToolTipEntry icon={Icons.editIcon()} tip='Edit' />
                        </Link>
                    </span>
                </div>
            </div>
            <div className="card-footer">
                <small>
                    Updated on {new Date(data.updatedAt).toDateString()}
                    &nbsp;{new Date(data.updatedAt).toLocaleTimeString()}
                </small>
            </div>
        </div>
    );
}

export default ProductCard;