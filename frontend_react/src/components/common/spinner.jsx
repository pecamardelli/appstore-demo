import React from 'react';

function Spinner(props) {
    return (
        <div className="text-center">
            <div
                className="spinner-border spinner-border"
                style={{ width: [props.size], height: [props.size] }}
                role="status">

                <span className="sr-only">Loading...</span>
                
            </div>
        </div>
    );
}

export default Spinner;