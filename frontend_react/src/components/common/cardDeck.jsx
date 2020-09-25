import React    from 'react';
import Card from './card';

function CardDeck(props) {
    return (
        <div className="row row-cols-1 row-cols-md-4">
            { props.cards.map(item => 
                <div className="col mb-4">
                    <Card data={ item } />
                </div>)
            }
        </div>
    );
}

export default CardDeck;