import React, {  useEffect, useState }  from 'react';
import { searchProducts }   from './../services/productService';
import { toast }    from 'react-toastify';
import CardDeck     from './common/cardDeck';
import ProductCard  from './common/productCard';
import EmptyCard    from './common/emptyCard';
import BreadCrumbs  from './common/breadcrumbs';

function SearchContainer(props) {
    const [ content, setContent ]   = useState([]);

    useEffect(() => {
        async function call() {
            try {
                const result    = await searchProducts(props.keywords);
                
                if(result) setContent(result.data);
                else setContent([]);
            }
            catch(ex) {
                toast.error(ex.response.data);
            }
        }

        if(props.keywords) call();
    }, [ setContent, props.keywords ]);

    if (content.length > 0)
        return (<>
                <BreadCrumbs />
                <h5>Found {content.length} item(s) matching <strong>'{props.keywords}'</strong></h5><hr />
                <CardDeck
                    cards={ content }
                    cardComponent={ ProductCard } 
                    cols={4}
                />
            </>);
        else return (<>
                <BreadCrumbs />
                <EmptyCard
                    title="No products to show"
                    text="Write some keywords in the search bar!"
                />
            </>);
}

export default SearchContainer;