import { Link }             from 'react-router-dom';
import React                from 'react';
import ToolTipEntry         from './toolTip';
import icons                from './userIcons';
import PopOverEntry         from './popOver';
import ProfileMenu          from './profileMenu';
import { getCurrentUser }   from './../../services/authService';


function UserMenu(props) {
    const me    = getCurrentUser();
    let buttons;

    if (me.accessLevel <= 2) {
        buttons =  <><Link to='/sections'>
                <ToolTipEntry icon={icons.sectionIcon()} tip='Add section' />
            </Link>
            <Link to='/categories'>
                <ToolTipEntry icon={icons.categoryIcon()} tip='Add category' />
            </Link>
            <Link to='/me/products/new'>
                <ToolTipEntry icon={icons.productIcon()} tip='Add product' />
            </Link></>
    }
    else if (me.accessLevel <= 4){
        buttons     = <Link to='/me/products/new'>
                <ToolTipEntry icon={icons.productIcon()} tip='Add product' />
            </Link>
    }

    return (
        <div className="form-inline my-2 my-lg-1">
            Hello, { `${me.firstname} ${me.lastname}` }!&nbsp;&nbsp;&nbsp;
            { buttons }
            <div role='button' >
                <PopOverEntry icon={icons.userIcon()} content={ProfileMenu} />
            </div>
        </div>
    );
}

export default UserMenu;