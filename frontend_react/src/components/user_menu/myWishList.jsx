import React, { Fragment, useEffect, useState }    from 'react';
import { getMyWishlist }    from './../../services/myService';
import { toast }            from 'react-toastify';
import CardDeck             from '../common/cardDeck';
import EmptyCard            from './../common/emptyCard';
import WishListEntryCard    from './../common/wishListEntryCard';
import WishListContext      from './../../context/wishListContext';
import BreadCrumbs          from '../common/breadcrumbs';

function MyWishList(props) {
    const [ content, setContent ]   = useState([]);
    const { match } = props;

    useEffect(() => {
        async function call() {
            try {
                const result    = await getMyWishlist();
                
                if(result) setContent(result.data);
                //else setContent([]);
            }
            catch(ex) {
                toast.error(ex);
            }
        }

        call();
    }, [ setContent, match ]);

    const handleDelete  = (itemId) => {
        const index = content.findIndex(e => e.id === itemId);
        
        if (index !== undefined) {
            const newContent    = [ ...content ];
            newContent.splice(index,1);
            setContent(newContent);
        }
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
            </WishListContext.Provider>
        );
    else return (
            <Fragment>
                <BreadCrumbs />
                <EmptyCard
                    title="No wishes in your list!"
                    text="You have not added any products to your wishlist. Navigate through all sections and find all the stuff you love!"
                />
            </Fragment>
        );
}

export default MyWishList;