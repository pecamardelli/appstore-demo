import React, { useEffect, useState }    from 'react';
import { toast }    from 'react-toastify';
import http         from '../services/httpService';
import CardDeck     from './common/cardDeck';
import ItemCard     from './common/itemCard';

function CategoryContainer(props) {
    const [ content, setContent ]   = useState([]);
    const { match } = props;

    useEffect(() => {
        async function call() {
            try {
                const path      = `/store/${match.params.section}/${match.params.category}`;
                const result    = await http.get(path);
                
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
        <CardDeck cards={ content } cardComponent={ ItemCard }/>
    );
}

export default CategoryContainer;