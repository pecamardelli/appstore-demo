import React, { Fragment, useEffect, useState }    from 'react';
import { getMyWishlist }    from './../../services/myService';
import { toast }            from 'react-toastify';
import CardDeck             from '../common/cardDeck';
import EmptyCard            from './../common/emptyCard';
import WishListEntryCard    from './../common/wishListEntryCard';
import WishListContext      from './../../context/wishListContext';
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

    const handleDelete  = (itemId) => {
        const index = content.findIndex(e => e.id === itemId);
        
        if (index !== undefined) {
            const newContent    = [ ...content ];
            newContent.splice(index,1);
            setContent(newContent);
        }
    };

    const handleCheckOut    = () => {
        console.log(content)
    };

    if (content.length > 0)
        return (
            <WishListContext.Provider value={{ onDelete: handleDelete }}>
                <BreadCrumbs />
                <CardDeck
                    cards={content}
                    cardComponent={WishListEntryCard}
                    cols={1}
                />
                <center>
                    <div className="card w-75">
                        <div className="d-flex flex-row-reverse bd-highlight">
                            <div className="p-2 bd-highlight" role='button'>
                            <ModalBox
                                buttonComponent={() => <ToolTipEntry icon={Icons.buyedIcon()} tip='Checkout!' />}
                                heading='Please confirm...'
                                body={`Buy the item(s) for a total of $${saleTotal}?`}
                                closeCaption='Cancel'
                                confirmCaption='Yeah!'
                                confirmAction={handleCheckOut}
                            />
                            </div>
                            <div
                                className="p-2 bd-highlight"
                                style={{ marginTop: '4px'}}
                            >
                                <h5><strong>Total: ${saleTotal}</strong></h5>
                            </div>
                        </div>
                    </div>
                </center>
            </WishListContext.Provider>
        );
    else return (
            <Fragment>
                <BreadCrumbs />
                <EmptyCard
                    title="No wishes in your list!"
                    text="You have not added any products to your wishlist. Navigate through all sections and find the stuff you love!"
                />
            </Fragment>
        );
}

export default MyWishList;