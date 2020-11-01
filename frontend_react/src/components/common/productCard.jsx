import React        from 'react';
import { Link }     from 'react-router-dom';
import userIcons    from '../user_menu/userIcons';
import ReactStars   from 'react-rating-stars-component';
import noImage      from '../../assets/images/image_not_found.png';
import Price from './price';

function ProductCard({ data }) {
    return (
        <div className="card border-dark mb-4" style={{ height: '455px'}}>
            <Link to={{ pathname: `/store/${data.Category.Section.alias}/${data.Category.alias}/${data.alias}`}}>
                <img
                    src={`${process.env.REACT_APP_API_URL}/images/products/${data.id}.png`}
                    onError={(e) => {e.target.onerror = null; e.target.src=noImage}}
                    className="card-img-top"
                    alt={data.displayName}
                />
            </Link>
            <div className="card-body">
                <h5 className="card-title"><strong>{data.displayName}</strong></h5>
                <span
                    className="d-flex justify-content-between align-items-center"
                    style={{margin: '10px 0 -10px 0'}}
                >
                    <ReactStars
                        size={30}
                        value={data.rating}
                        edit={false}
                        isHalf={true}
                    />
                    <h5 style={{margin: '4px 50px 0 0'}}>{data.rating}</h5>
                </span>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <h5>{userIcons.downloadIcon('2em')}{data.downloads}</h5>
                <Price price={data.price} />
            </div>
        </div>
    );
}

export default ProductCard;