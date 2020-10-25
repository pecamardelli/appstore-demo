import React, { useState, useEffect }  from 'react';
import BreadCrumbs          from './../common/breadcrumbs';
import CardDeck             from './../common/cardDeck';
import { getMyPurchases }   from './../../services/myService';
import { toast }            from 'react-toastify';
import PurchaseEntryCard    from './../common/purchaseEntryCard';
import EmptyCard            from './../common/emptyCard';

function MyPurchases(props) {
    const [ content, setContent ]   = useState([]);

    useEffect(() => {
        async function call() {
            try {
                const result    = await getMyPurchases();
                setContent(result.data);
            }
            catch(ex) {
                toast.error(ex);
            }
        }

        call();
    }, [ setContent ]);

    if (content.length > 0) {
        return (<>
            <BreadCrumbs />
            <h3>My purchases</h3><hr />
            <CardDeck
                cards={content}
                cardComponent={PurchaseEntryCard}
                cols={1}
            />
        </>);
    }
    else return (<>
            <BreadCrumbs />
            <EmptyCard
                title="No purchases to show!"
                text="You have not buyed anything yet. There is really amazing stuff in our store! Check it out!"
            />
        </>);
}

export default MyPurchases;