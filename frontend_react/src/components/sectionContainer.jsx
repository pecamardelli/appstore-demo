import React, { Fragment, useEffect, useState }    from 'react';
import { toast }    from 'react-toastify';
import http         from '../services/httpService';
import BreadCrumbs from './common/breadcrumbs';
import CardDeck     from './common/cardDeck';
import CategoryCard from './common/categoryCard';
import EmptyCard    from './common/emptyCard';

function SectionContainer(props) {
    const [ content, setContent ]   = useState([]);
    const { match } = props;

    useEffect(() => {
        async function call() {
            try {
                const result    = await http.get(`/store/${match.params.section}`);

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

    if (content.length > 0)
        return (
            <Fragment>
                <BreadCrumbs />
                <CardDeck
                    cards={ content }
                    cardComponent={ CategoryCard } 
                    cols={4}
                />
            </Fragment>
        );
    else return (
            <Fragment>
                <BreadCrumbs />
                <EmptyCard
                    title="No categories to show"
                    text="There are no categories in this section. Try again later!"
                />
            </Fragment>
        );
}

export default SectionContainer;