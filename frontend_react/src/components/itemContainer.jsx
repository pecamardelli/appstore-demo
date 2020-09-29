import React, { useEffect, useState }    from 'react';
import Icons        from './user_menu/userIcons';
import { toast }    from 'react-toastify';
import http         from '../services/httpService';
import ReactStars   from 'react-rating-stars-component';

function ItemContainer(props) {
    const [ item, setItem ]         = useState({});
    const [ stars, setStars ]       = useState();
    const { match } = props;

    useEffect(() => {
        async function getItem() {
            try {
                const endpoint  = `/store/${match.params.section}/${match.params.category}/${match.params.item}`;
                const result    = await http.get(endpoint);
                
                if(result){
                    const createdAt         = new Date(result.data.createdAt);
                    result.data.createdAt   = createdAt.toDateString();
                    result.data.photo       = `${process.env.REACT_APP_API_URL}${result.data.photo}`;
                    
                    setItem(result.data);
                    setStars(<ReactStars
                        size={ 30 }
                        value={ result.data.rating }
                        edit={ false }
                        isHalf={true}
                        >
                            { result.data.rating }
                        </ReactStars>
                    );
                }
                else {
                    toast.error("Data not found for this item.");
                    setItem({});
                }
            }
            catch(ex) {
                toast.error(ex);
                setItem({});
            }
        }

        getItem();
    }, [ setItem, setStars, match ]);

    return (
        <div className="card border-dark mb-3" style={{ width: '100%' }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={ item.photo } className="card-img-top" alt="..." />
                </div>
                <div className="col-md-8" style={{ height: '90%'}}>
                    <div className="card-body">
                        <h3 className="card-title d-flex justify-content-between align-items-center">
                            { item.displayName }
                            <span><strong>${ item ? item.price : '---' }</strong></span>
                            
                        </h3>
                        <h5 className="card-text text-muted">
                            By { item.User ? item.User.firstname : 'Anonymous ' } { item.User ? item.User.lastname : 'author' }
                        </h5>
                        <p className="card-text">{ item.description }</p>
                        <p className="card-text">
                            <small className="text-muted">
                                Uploaded on { item ? item.createdAt : <strong>no date available</strong> }
                            </small>
                        </p>
                        <div className="row" style={{ marginTop: '-15px'}}>
                            <div style={{ margin: '0 0 -20px -4px' }} className="col-md-3" >
                                { stars }
                            </div>
                            <div style={{ margin: '12px 0 -10px -35px' }} >
                                <h5><strong>{item.rating}</strong></h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ height: '10%'}}>
                        <span className="d-flex justify-content-between align-items-center">
                            <h5 style={{ margin: '1px 0 0 0' }}>Downloads { item.downloads }</h5>
                            <span>
                                { Icons.addToCartIcon('2em') }
                                { Icons.addedToCartIcon('2em') }
                                { Icons.buyedIcon('2em') }
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemContainer;