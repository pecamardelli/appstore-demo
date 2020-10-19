import React, { useState, useContext }  from 'react';
import { removeFromCart }   from '../../services/wishService';
import ToolTipEntry         from '../user_menu/toolTip';
import { toast }            from 'react-toastify';
import Icons                from '../user_menu/userIcons';
import noImage              from '../../assets/images/image_not_found.png';
import WishListContext      from './../../context/wishListContext';
import ModalBox             from './modal';

function WishListEntryCard({ data: sale }) {
    const [ entryDate, setEntryDate ]   = useState(new Date(sale.createdAt).toDateString())
    const wishListContext               = useContext(WishListContext);

    const handleRemoveFromCart = async () => {
        try {
            const result    = await removeFromCart(sale.id);
            if(result.status === 200) wishListContext.onDelete(sale.id);
            toast.success(result.data);
        }
        catch (ex) {
            toast.error(ex);
        }
    }

    return (
        <center>
            <div className="card w-75">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/images/products/${sale.ProductId}.png`}
                        onError={(e) => {
                            e.target.onerror = null;
                            // This conditional prevents an infinite fallback loop
                            // when noImage is not available or undefined
                            if(noImage) e.target.src=noImage;
                            else e.target.src=''
                        }}
                        style={{ maxWidth: '5%' }}
                        alt={sale.Product.displayName}
                    />
                    <h5 style={{ margin: '2px 0 0 0'}}>
                        <strong>{sale.Product.displayName}</strong>
                    </h5>
                    <small className="text-muted">
                        ({sale.Product.Category.displayName})
                    </small>
                    <small className="text-muted">
                        Added on: {entryDate}
                    </small>
                    <span style={{width: '20%'}}></span>
                    <h5 style={{ margin: '2px 0 0 0'}}>
                        ${sale.salePrice}
                    </h5>
                    <span role='button' >
                        <ModalBox
                            buttonComponent={() => <ToolTipEntry icon={Icons.trashIcon()} tip='Remove from cart' />}
                            heading='Please confirm...'
                            body={`Remove ${sale.Product.displayName} from the cart?`}
                            closeCaption='Cancel'
                            confirmCaption='Accept'
                            confirmAction={handleRemoveFromCart}
                        />
                    </span>
                </div>
            </div>
        </center>
    );
}

export default WishListEntryCard;

/*

                */