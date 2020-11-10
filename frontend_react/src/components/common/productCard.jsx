import React        from 'react';
import { Link }     from 'react-router-dom';
import ReactStars   from 'react-rating-stars-component';
import noImage      from '../../assets/images/image_not_found.png';
import Icons        from '../../assets/icons';
import Price        from './price';

function ProductCard({ data }) {
    return (
        <div className="card border-dark mb-4 product-card">
            <Link to={{ pathname: `/store/${data.Category.Section.alias}/${data.Category.alias}/${data.alias}`}}>
                <img
                    src={`${process.env.REACT_APP_API_URL}/images/products/${data.id}.png`}
                    onError={(e) => {e.target.onerror = null; e.target.src=noImage}}
                    className="card-img-top"
                    alt={data.displayName}
                />
            </Link>
            <div className="card-body">
                <div className="card-title h-40">
                    <h5>
                        <strong>{data.displayName}</strong>
                    </h5>
                </div>
                <div className="h-25">
                    {`${data.Category.displayName} ${data.Category.Section.displayName}`}
                </div>
                <div
                    className="d-flex justify-content-between align-items-center h-25"
                    style={{margin: '10px 0 -10px 0'}}
                >
                    <ReactStars
                        size={30}
                        value={data.rating}
                        edit={false}
                        isHalf={true}
                    />
                    <h5 style={{margin: '4px 50px 0 0'}}>{data.rating}</h5>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <h5 style={{ marginTop: '5px'}}>{Icons.downloadIcon('2em')}{data.downloads}</h5>
                <Price price={data.price} />
            </div>
        </div>
    );
}

export default ProductCard;