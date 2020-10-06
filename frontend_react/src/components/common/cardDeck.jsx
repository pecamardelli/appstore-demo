import React    from 'react';

function CardDeck(props) {
    const CardComponent = props.cardComponent;
    return (
        <div className={`row row-cols-1 row-cols-md-${props.cols}`}>
            { props.cards.map(item => 
                <div className={`col mb-${props.cols}`}>
                    <CardComponent data={ item } />
                </div>)
            }
        </div>
    );
}

export default CardDeck;