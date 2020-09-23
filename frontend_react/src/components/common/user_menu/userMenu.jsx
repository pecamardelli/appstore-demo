import { Link } from 'react-router-dom';
import React    from 'react';
import UserMenuEntry from './menuEntry';
import userMenuIcons from './userIcons';

function UserMenu(props) {
    const iconSize  = '1.5em';
        
    return (
        <div className="form-inline my-2 my-lg-1">
            
            <h6 style={{ margin: '10px'}} data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">{props.username}</h6>
            <Link to='/logout'>
                <UserMenuEntry icon={userMenuIcons.logoutIcon()} tip='Logout' />
            </Link>
            <Link to='/categories'>
                <UserMenuEntry icon={userMenuIcons.categoryIcon()} tip='Add category' />
            </Link>
            <Link to='/apps'>
                <UserMenuEntry icon={userMenuIcons.appIcon()} tip='Add application' />
            </Link>
            <Link to='/apps'>
                <UserMenuEntry icon={userMenuIcons.cartIcon()} tip='My wish list' />
            </Link>
            <Link to='/apps'>
                <UserMenuEntry icon={userMenuIcons.userIcon()} tip='My profile' />
            </Link>
        </div>
    );
}

export default UserMenu;