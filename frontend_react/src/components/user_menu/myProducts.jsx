import React, { useEffect, useState }    from 'react';
import { getMyProducts }    from './../../services/myService';
import { toast }            from 'react-toastify';
import CardDeck             from '../common/cardDeck';
import ProductCard          from './productCard';

function MyProducts(props) {
    const [ content, setContent ]   = useState([]);
    const { match } = props;

    useEffect(() => {
        async function call() {
            try {
                const result    = await getMyProducts();
                
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
        <CardDeck cards={ content } cardComponent={ ProductCard }  cols={5}/>
    );
}

export default MyProducts;