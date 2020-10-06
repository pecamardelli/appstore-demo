import React, { useEffect, useState }    from 'react';
import { getCategoryItems } from './../services/storeService';
import { toast }    from 'react-toastify';
import CardDeck     from './common/cardDeck';
import ProductCard  from './common/productCard';

function CategoryContainer(props) {
    const [ content, setContent ]   = useState([]);
    const { match } = props;

    useEffect(() => {
        async function call() {
            try {
                const result    = await getCategoryItems(`${match.params.section}/${match.params.category}`);
                
                if(result) setContent(result.data);
                else setContent([]);
            }
            catch(ex) {
                toast.error(ex.response.data);
            }
        }

        call();
    }, [ setContent, match ]);

    return (
        <CardDeck cards={ content } cardComponent={ ProductCard } cols={4}/>
    );
}

export default CategoryContainer;