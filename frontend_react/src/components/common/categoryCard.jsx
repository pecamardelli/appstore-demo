import React, { useState, useEffect }    from 'react';
import { getCurrentUser }   from './../../services/authService';
import { Link }             from 'react-router-dom';
import ToolTipEntry         from '../user_menu/toolTip';
import Icons                from '../user_menu/userIcons';

function CategoryCard(props) {
    const [ user, setUser ] = useState({});

    useEffect(() => {
        const currentUser   = getCurrentUser();
        if (currentUser) setUser(currentUser);
    }, [ setUser ]);

    function renderEditIcon() {
        if (user.accessValue && user.accessValue === 1) {
            return  <Link to={`/categories/${props.data.id}`}>
                        <ToolTipEntry icon={Icons.editIcon()} tip='Edit category' />
                    </Link>;
        }
    }

    return (
        <div className="card border-dark mb-4 text-center" >
            <Link to={`${props.data.Section.alias}/${props.data.alias}`}>
                <div className="card-body" style={{marginTop: '10px'}}>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/images/categories/${props.data.id}.png`}
                        className="card-img-top img-category-card"
                        alt={props.data.displayName}
                    />
                    <br /><br />
                    <h5 className="card-title">{props.data.displayName}</h5>
                </div>
            </Link>
            <div className="card-footer d-flex justify-content-between align-items-center">
                Total items
                <span className="badge badge-danger badge-pill">{props.data.total}</span>
                { renderEditIcon() }
            </div>
        </div>
    );
}

export default CategoryCard;