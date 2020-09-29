import React    from 'react';

function CardDeck(props) {
    const CardComponent = props.cardComponent;
    return (
        <div className="row row-cols-1 row-cols-md-4">
            { props.cards.map(item => 
                <div className="col mb-4">
                    <CardComponent data={ item } />
                </div>)
            }
        </div>
    );
}

export default CardDeck;