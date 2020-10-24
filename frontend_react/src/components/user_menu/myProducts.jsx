import React, { useEffect, useState }    from 'react';
import { getMyProducts }    from './../../services/myService';
import { toast }            from 'react-toastify';
import CardDeck             from '../common/cardDeck';
import MyProductCard        from './myProductCard';
import EmptyCard            from './../common/emptyCard';
import BreadCrumbs          from '../common/breadcrumbs';

function MyProducts(props) {
    const [ content, setContent ]   = useState([]);

    useEffect(() => {
        async function call() {
            try {
                const result    = await getMyProducts();
                if(result) setContent(result.data);
            }
            catch(ex) {
                toast.error(ex.response.data);
            }
        }

        call();
    }, [ setContent ]);

    if (content.length > 0)
        return <>
                <BreadCrumbs />
                <CardDeck
                    cards={ content }
                    cardComponent={ MyProductCard } 
                    cols={5}
                />
            </>;
    else return <>
                    <BreadCrumbs />
                    <EmptyCard
                        title="No products to show"
                        text="You have not created any products yet. Look at the user menu! Click on the box and create!"
                    />
                </>;
}

export default MyProducts;