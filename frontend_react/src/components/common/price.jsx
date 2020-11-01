import React    from 'react';
import noImage  from '../../assets/images/image_not_found.png';
import freeIcon from '../../assets/images/free_icon.png';

function Price(props) {
    if(props.price) return <h4><strong>${props.price}</strong></h4>;

    return (<img
                src={freeIcon}
                onError={(e) => {e.target.onError = null; e.target.src=noImage}}
                alt='Free!!'
                width='20%'
            />);
}

export default Price;