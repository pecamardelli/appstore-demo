import React, { useState, useEffect }   from 'react';
import { getSale, submitSale }          from '../services/saleService';
import { Link }         from 'react-router-dom';
import { toast }        from 'react-toastify';
import JwtDecode        from 'jwt-decode';
import ToolTipEntry     from './user_menu/toolTip';
import Icons            from './user_menu/userIcons';

function ItemOptions({ item }) {
    const [ saleState, setSaleState ]   = useState('');
    const [ isMine, setIsMine]          = useState(false);

    useEffect(() => {
        async function getSaleData() {
            try {
                //const { data } = await http.get(`/sales/${item.id}`);
                const { data } = await getSale(item.id);
                setSaleState(data.status);
            }
            catch (ex) {
                // Just to do something...
                setSaleState('');
            }
        }

        async function checkOwnership() {
            try {
                return await JwtDecode(localStorage.getItem('token'));
            }
            catch (ex) {
                toast.error(`Could not decode token from storage: ${ex.message}`);
            }
        }

        const me = checkOwnership();

        if (me.id === item.authorId) setIsMine(true);
        else getSaleData();

    }, [ setSaleState, item.id ]);

    const handleClick = async () => {
        try {
            await submitSale({ itemId: item.id, salePrice: item.price });
            setSaleState('pending');
            toast.success('Item successfully added to cart!');
        }
        catch (ex) {
            toast.error(ex);
        }
    }

    // I know this may be a little unclean but it's a nice way to do
    // conditional rendering.
    if (isMine)
        return  <Link to='/me/wishlist'>
                    <ToolTipEntry icon={Icons.editIcon('2em')} tip='Edit product' />
                </Link>

    if (!saleState)
        return  <span onClick={handleClick} role='button' >
                    <ToolTipEntry icon={Icons.addToCartIcon('2em')} tip='Add to cart' />
                </span>;

    if (saleState === 'pending') 
        return <ToolTipEntry icon={Icons.addedToCartIcon('2em')} tip='In your cart' />

    if (saleState === 'completed')
        return <ToolTipEntry icon={Icons.buyedIcon('2em')} tip='Buyed' />
}

export default ItemOptions;