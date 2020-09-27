import { Link }         from 'react-router-dom';
import React            from 'react';
import ToolTipEntry     from './toolTip';
import userMenuIcons    from './userIcons';
import PopOverEntry     from './popOver';
import ProfileMenu      from './profileMenu';

function UserMenu(props) {
    return (
        <div className="form-inline my-2 my-lg-1">
            
            <Link to='/categories'>
                <ToolTipEntry icon={userMenuIcons.categoryIcon()} tip='Add category' />
            </Link>
            <Link to='/sections'>
                <ToolTipEntry icon={userMenuIcons.productIcon()} tip='Add section' />
            </Link>
            <Link to='/me/wishlist'>
                <ToolTipEntry icon={userMenuIcons.cartIcon()} tip='My wish list' />
            </Link>
            <div role='button' >
                <PopOverEntry icon={userMenuIcons.userIcon()} content={ProfileMenu} />
            </div>
        </div>
    );
}

export default UserMenu;