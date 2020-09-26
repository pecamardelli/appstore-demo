import React, { useEffect, useState }    from 'react';
import { toast } from 'react-toastify';
import http     from '../services/httpService';
import CardDeck from './common/cardDeck';


function Apps(props) {
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        async function call() {
            try {
                const result    = await http.get('/apps');
                setCategories(result.data);
            }
            catch(ex) {
                toast.error('Could not retrieve categories from backend.', ex.response.data);
            }
        }

        call();
    }, [ setCategories ]);

    return (
        <CardDeck cards={ categories }/>
    );
}

export default Apps;