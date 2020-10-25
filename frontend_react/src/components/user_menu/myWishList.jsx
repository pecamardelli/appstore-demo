import React, { useEffect, useState }       from 'react';
import { getMyWishlist, submitPurchase }    from './../../services/myService';
import { removeFromCart }   from '../../services/wishService';
import noImage              from '../../assets/images/image_not_found.png';
import { toast }            from 'react-toastify';
import EmptyCard            from './../common/emptyCard';
import BreadCrumbs          from '../common/breadcrumbs';
import ToolTipEntry         from './toolTip';
import Icons                from './userIcons';
import ModalBox             from '../common/modal';

function MyWishList(props) {
    const [ content, setContent ]                   = useState([]);
    const [ wishesRetrieved, setWishesRetrieved ]   = useState(false);
    const [ saleTotal, setSaleTotal ]               = useState(0);

    useEffect(() => {
        async function getWishes() {
            try {
                const result    = await getMyWishlist();
                //return result.data;
                setContent(result.data);
            }
            catch(ex) {
                toast.error(ex);
            }
        }

        if (!wishesRetrieved) {
            getWishes();
            setWishesRetrieved(true);
        }

        let total = 0;
        for (let w of content) {
            total += w.salePrice;
        }

        setSaleTotal(total);
    }, [ setContent, setSaleTotal, wishesRetrieved, content ]);

    const deleteItem  = (itemId) => {
        const index = content.findIndex(e => e.id === itemId);
        
        if (index !== undefined) {
            const newContent    = [ ...content ];
            newContent.splice(index,1);
            setContent(newContent);
        }
    };

    const handleRemoveFromCart = async (e) => {
        const wishId    = e.target.id;
        try {
            const result    = await removeFromCart(wishId);
            deleteItem(wishId);
            toast.success(result.data);
        }
        catch (ex) {
            toast.error(ex);
        }
    };

    const handleCheckOut    = async () => {
        // Send only the wishId property... The backend doesn't need anything else.
        try {
            const result    = await submitPurchase(content.map(i => i.id ));
            if(result.status === 200) {
                toast.success('Items purchased!');
                setContent([]);
            }
        }
        catch (ex) {
            console.log(ex);
            toast.error('Error submitting purchase!');
        }
    };

    if (content.length > 0)
        return (<>
            <BreadCrumbs />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Product</th>
                        <th scope="col">Category</th>
                        <th scope="col">Added on</th>
                        <th scope="col">Base price</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {content.map(item =>
                        <tr key={item.id}>
                            <td style={{ width: '7%' }}>
                                <img
                                    className="card-img"
                                    src={`${process.env.REACT_APP_API_URL}/images/products/${item.ProductId}.png`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        // This conditional prevents an infinite fallback loop
                                        // when noImage is not available or undefined
                                        if(noImage) e.target.src=noImage;
                                        else e.target.src=''
                                    }}
                                    alt={item.Product.displayName}
                                />
                            </td>
                            <td>
                                <h6 style={{ margin: '2px 0 0 0'}}>
                                    <strong>{item.Product.displayName}</strong>
                                </h6>
                            </td>
                            <td>
                                {item.Product.Category.displayName}
                            </td>
                            <td>
                                {new Date(item.createdAt).toDateString()}
                            </td>
                            <td>
                                <h5 style={{ margin: '2px 0 0 0'}}>
                                    ${item.salePrice}
                                </h5>
                            </td>
                            <td>
                                <span role='button' >
                                    <ModalBox
                                        itemId={item.id}
                                        buttonComponent={() => <ToolTipEntry icon={Icons.trashIcon()} tip='Remove from cart' />}
                                        heading='Please confirm...'
                                        body={`Remove ${item.Product.displayName} from the cart?`}
                                        closeCaption='Cancel'
                                        confirmCaption='Accept'
                                        confirmAction={handleRemoveFromCart}
                                    />
                                </span>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan='3'></td>
                        <td className='text-right'>
                            <h5><strong>Total</strong></h5>
                        </td>
                        <td>
                            <h5><strong>${saleTotal}</strong></h5>
                        </td>
                        <td>
                            <ModalBox
                                buttonComponent={() => <ToolTipEntry icon={Icons.buyedIcon()} tip='Checkout!' />}
                                heading='Please confirm...'
                                body={`Buy the item(s) for a total of $${saleTotal}?`}
                                closeCaption='Cancel'
                                confirmCaption='Yeah!'
                                confirmAction={handleCheckOut}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>);
    else return (
            <>
                <BreadCrumbs />
                <EmptyCard
                    title="No wishes in your list!"
                    text="You have not added any products to your wishlist. Navigate the site and find the stuff you love!"
                />
            </>
        );
}

export default MyWishList;