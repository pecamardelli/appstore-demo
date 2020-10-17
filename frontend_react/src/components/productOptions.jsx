import React, { useState, useEffect }   from 'react';
import { getSale, addToCart }           from '../services/saleService';
import { getCurrentUser }   from './../services/authService';
import { Link }             from 'react-router-dom';
import { toast }            from 'react-toastify';
import ToolTipEntry         from './user_menu/toolTip';
import Icons                from './user_menu/userIcons';

function ProductOptions({ product }) {
    const [ saleState, setSaleState ]   = useState('');
    const [ isMine, setIsMine]          = useState(false);

    useEffect(() => {
        async function getSaleData() {
            try {
                //const { data } = await http.get(`/sales/${item.id}`);
                const { data } = await getSale(product.id);
                setSaleState(data.status);
            }
            catch (ex) {
                // Just to do something...
                setSaleState('');
            }
        }

        const me = getCurrentUser();

        if (product.User && me.id === product.User.id) setIsMine(true);
        else getSaleData();

    }, [ setSaleState, product.User, product.id ]);

    const handleAddToCart = async () => {
        try {
            await addToCart({ productId: product.id, salePrice: product.price });
            setSaleState('pending');
            toast.success('Product successfully added to cart!');
        }
        catch (ex) {
            toast.error(ex);
        }
    }

    // I know this might be a little unclean but it's a nice way to do
    // conditional rendering.
    if (isMine)
        return  <Link to={`/me/products/edit/${product.id}`}>
                    <ToolTipEntry icon={Icons.editIcon('2em')} tip='Edit product' />
                </Link>

    if (!saleState)
        return  <span onClick={handleAddToCart} role='button' >
                    <ToolTipEntry icon={Icons.addToCartIcon('2em')} tip='Add to cart' />
                </span>;

    if (saleState === 'pending') 
        return (<span>
                <ToolTipEntry icon={Icons.addedToCartIcon('2em')} tip='In your cart' />
            </span>
        );

    if (saleState === 'completed')
        return <ToolTipEntry icon={Icons.buyedIcon('2em')} tip='Buyed' />
}

export default ProductOptions;