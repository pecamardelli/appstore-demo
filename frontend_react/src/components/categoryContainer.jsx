import React, { useEffect, useState }    from 'react';
import { toast }    from 'react-toastify';
import http         from '../services/httpService';
import CardDeck     from './common/cardDeck';

function CategoryContainer(props) {
    const [ content, setContent ]   = useState([]);
    const { match } = props;

    useEffect(() => {
        async function call() {
            try {
                const endpoint  = `/store/${match.params.section}/${match.params.category}`;
                const result    = await http.get(endpoint);
                console.log(result)
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
        <CardDeck cards={ content }/>
    );
}

export default CategoryContainer;