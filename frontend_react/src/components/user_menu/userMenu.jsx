import { Link }         from 'react-router-dom';
import React            from 'react';
import ToolTipEntry     from './toolTip';
import icons            from './userIcons';
import PopOverEntry     from './popOver';
import ProfileMenu      from './profileMenu';

function UserMenu(props) {
    return (
        <div className="form-inline my-2 my-lg-1">
            Hello, { `${props.user.firstname} ${props.user.lastname}` }!&nbsp;&nbsp;&nbsp;
            <Link to='/sections'>
                <ToolTipEntry icon={icons.sectionIcon()} tip='Add section' />
            </Link>
            <Link to='/categories'>
                <ToolTipEntry icon={icons.categoryIcon()} tip='Add category' />
            </Link>
            <Link to='/me/products/new'>
                <ToolTipEntry icon={icons.productIcon()} tip='Add product' />
            </Link>
            <div role='button' >
                <PopOverEntry icon={icons.userIcon()} content={ProfileMenu} />
            </div>
        </div>
    );
}

export default UserMenu;