import React, { useEffect, useState }    from 'react';
import { getProductByPath } from './../services/productService';
import { toast }            from 'react-toastify';
import ProductOptions       from './productOptions';
import ReactStars           from 'react-rating-stars-component';
import noImage              from '../assets/images/image_not_found.png';
import BreadCrumbs          from './common/breadcrumbs';

function ProductContainer(props) {
    const [ product, setProduct ]   = useState({});
    const [ stars, setStars ]       = useState();
    const { match }                 = props;

    useEffect(() => {
        async function getProduct() {
            try {
                const path      = `${match.params.section}/${match.params.category}/${match.params.product}`;
                const result    = await getProductByPath(path);
                
                if(result){
                    const createdAt         = new Date(result.data.createdAt);
                    result.data.createdAt   = createdAt.toDateString();
                    
                    setProduct(result.data);
                    setStars(<ReactStars
                        size={30}
                        value={result.data.rating}
                        edit={false}
                        isHalf={true}
                        />
                    );
               }
                else {
                    toast.error("Data not found for this item.");
                    setProduct({});
               }
           }
            catch(ex) {
                toast.error(ex);
                setProduct({});
           }
       }

        getProduct();
   }, [ setProduct, setStars, match ]);

    return (
        <div>
            <BreadCrumbs />
            <div className="card border-dark mb-3" style={{width: '100%'}}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img
                            src={`${process.env.REACT_APP_API_URL}/images/products/${product.id}.png`}
                            onError={(e) => {e.target.onerror = null; e.target.src=noImage }}
                            className="card-img-top"
                            alt={product.displayName}
                        />
                    </div>
                    <div className="col-md-8" style={{height: '90%'}}>
                        <div className="card-body">
                            <h3 className="card-title d-flex justify-content-between align-items-center">
                                {product.displayName}
                                <span><strong>${product ? product.price : '---'}</strong></span>
                                
                            </h3>
                            <h5 className="card-text text-muted">
                                By {product.User ? product.User.firstname : 'Anonymous '} {product.User ? product.User.lastname : 'author'}
                            </h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    Uploaded on {product ? product.createdAt : <strong>no date available</strong>}
                                </small>
                            </p>
                            <div className="row" style={{marginTop: '-15px'}}>
                                <div style={{margin: '0 0 -20px -4px'}} className="col-md-3" >
                                    {stars}
                                </div>
                                <div style={{margin: '12px 0 -10px -35px'}} >
                                    <h5><strong>{product.rating}</strong></h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer" style={{height: '10%'}}>
                            <span className="d-flex justify-content-between align-items-center">
                                <h5 style={{margin: '1px 0 0 0'}}>Downloads: {product.downloads}</h5>
                                {
                                    // Need to send the entire item as a prop because
                                    // several data about it is needed to add to cart.
                                    // I didn't feel like using a context for this.
                                }
                                <ProductOptions product={product} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductContainer;