import React, { useState, useEffect }   from 'react';
import { getWish, addToCart }           from '../services/wishService';
import { getCurrentUser }   from './../services/authService';
import { Link }             from 'react-router-dom';
import { toast }            from 'react-toastify';
import ToolTipEntry         from './user_menu/toolTip';
import Icons                from '../assets/icons';
import ModalBox             from './common/modal';

function ProductOptions({ product }) {
    const [ wishState, setWishState ]   = useState('');
    const [ isMine, setIsMine ]         = useState(false);
    const me = getCurrentUser();

    useEffect(() => {
        async function getWishData() {
            try {
                //const { data } = await http.get(`/sales/${item.id}`);
                const { data } = await getWish(product.id);
                setWishState(data.status);
            }
            catch (ex) {
                // Just to do something...
                setWishState('');
            }
        }

        if(!me) return;

        if (product.User && me.id === product.User.id) setIsMine(true);
        else getWishData();

    }, [ setWishState, product.User, product.id, me ]);

    const handleAddToCart = async () => {
        try {
            await addToCart({ ProductId: product.id, salePrice: product.price });
            setWishState('pending');
            toast.success('Product successfully added to cart!');
        }
        catch (ex) {
            toast.error(ex);
        }
    };

    // I know this might be a little unclean but it's a nice way to do
    // conditional rendering.
    if (isMine)
        return  <Link to={`/me/products/edit/${product.id}`}>
                    <ToolTipEntry icon={Icons.editIcon('2em')} tip='Edit product' />
                </Link>

    if (me && !wishState)
        return  <span role='button' >
                    <ModalBox
                        buttonComponent={() => <ToolTipEntry icon={Icons.addToCartIcon('2em')} tip='Add to cart' />}
                        heading='Please confirm...'
                        body={<h5>{`Add ${product.displayName} to cart?`}</h5>}
                        closeCaption='Cancel'
                        confirmCaption='Accept'
                        confirmAction={handleAddToCart}
                    />
                </span>

    if (wishState === 'pending') 
        return (<span>
                <ToolTipEntry icon={Icons.addedToCartIcon('2em')} tip='In your cart' />
            </span>
        );

    if (wishState === 'completed')
        return <ToolTipEntry icon={Icons.buyedIcon('2em')} tip='Buyed' />

    if(!me) return <Link to='/login'>Login to add to cart!</Link>;
}

export default ProductOptions;