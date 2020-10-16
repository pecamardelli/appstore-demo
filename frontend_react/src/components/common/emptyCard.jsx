import React from 'react';

function EmptyCard(props) {
    return (
        <div className="card w-100">
            <div className="card-body">
                <h5 className="card-title">{ props.title }</h5>
                <p className="card-text">{ props.text }</p>
            </div>
        </div>
    );
}

export default EmptyCard;