import React, { Fragment, useEffect, useState }   from 'react';
import { getProductsByCategory }        from './../services/productService';
import { toast }    from 'react-toastify';
import CardDeck     from './common/cardDeck';
import ProductCard  from './common/productCard';
import EmptyCard    from './common/emptyCard';
import BreadCrumbs from './common/breadcrumbs';

function CategoryContainer(props) {
    const [ content, setContent ]   = useState([]);
    const { match } = props;

    useEffect(() => {
        async function call() {
            try {
                const result    = await getProductsByCategory(match.params.section, match.params.category);
                
                if(result) setContent(result.data);
                else setContent([]);
            }
            catch(ex) {
                toast.error(ex.response.data);
            }
        }

        call();
    }, [ setContent, match ]);

    if (content.length > 0)
        return (
            <Fragment>
                <BreadCrumbs />
                <CardDeck
                    cards={ content }
                    cardComponent={ ProductCard } 
                    cols={4}
                />
            </Fragment>
        );
        else return (
            <Fragment>
                <BreadCrumbs />
                <EmptyCard
                    title="No products to show"
                    text="There are no products in this category. Try again later!"
                />
            </Fragment>
        );
}

export default CategoryContainer;