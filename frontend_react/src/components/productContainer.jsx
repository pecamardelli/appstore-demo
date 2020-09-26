import React, { useEffect, useState }    from 'react';
import { toast }    from 'react-toastify';
import http         from '../services/httpService';
import CardDeck     from './common/cardDeck';

function ProductContainer(props) {
    const [ content, setContent ]   = useState([]);
console.log(props)
const { match } = props;
    useEffect(() => {
        async function call() {
            try {
                const result    = await http.get(`/store/${match.params.product}`);
                setContent(result.data);
            }
            catch(ex) {
                toast.error('Could not retrieve data from the backend.', ex.response.data);
            }
        }

        call();
    }, [ setContent ]);

    return (
        <CardDeck cards={ content }/>
    );
}

export default ProductContainer;