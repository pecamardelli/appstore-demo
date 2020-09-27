import React, { useEffect, useState }    from 'react';
import { toast }    from 'react-toastify';
import http         from '../services/httpService';
import CardDeck     from './common/cardDeck';

function ProductContainer(props) {
    const [ content, setContent ]   = useState([]);
    const { match } = props;

    useEffect(() => {
        async function call() {
            try {
                const result    = await http.get(`/store/${match.params.product}`);
                if(result) setContent(result.data);
                else setContent([]);
            }
            catch(ex) {
                console.log(ex)
                toast.error('Could not retrieve data from the backend.', ex);
            }
        }

        call();
    }, [ setContent, match ]);

    return (
        <CardDeck cards={ content }/>
    );
}

export default ProductContainer;