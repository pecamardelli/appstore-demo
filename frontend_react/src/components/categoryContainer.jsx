import React, { useEffect, useState }   from 'react';
import { getProductsByCategory }        from './../services/productService';
import { toast }    from 'react-toastify';
import CardDeck     from './common/cardDeck';
import ProductCard  from './common/productCard';
import EmptyCard    from './common/emptyCard';

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
            <CardDeck
                cards={ content }
                cardComponent={ ProductCard } 
                cols={4}
            />
        );
    else return <EmptyCard
                    title="No products to show"
                    text="There are no products in this category. Try again later!"
                />;
}

export default CategoryContainer;