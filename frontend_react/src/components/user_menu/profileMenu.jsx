import React, { useState }        from 'react';
import { Table }    from 'react-bootstrap';
import { Link }     from 'react-router-dom';
import noImage      from '../../assets/images/image_not_found.png';
import auth			from '../../services/authService';
import icons        from './userIcons';

function ProfileMenu(props) {
    const [ user, setUser ] = useState(auth.getCurrentUser());

    return (
        <Table hover size="sm" style={{ marginTop: '15px'}}>
            <thead className='text-center'>
                <img
                    src={`${process.env.REACT_APP_API_URL}/images/users/avatar/${user.id}.png`}
                    onError={(e) => {e.target.onerror = null; e.target.src=noImage}}
                    style={{ maxHeight: '90%', maxWidth: '90%', margin: '0 0 5% 0'}}
                    alt=''
                />
            </thead>
            <tbody>
                <tr>
                    <Link to='/me/products'>
                        <td style={{ textAlign: "right"}}>
                            <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                                My products
                            </h6>
                        </td>
                        <td style={{ width: '20%'}}>{ icons.productIcon() }</td>
                    </Link>
                </tr>
                <tr>
                    <Link to='/me/wishlist'>
                        <td style={{ textAlign: "right"}}>
                            <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                                My wishlist
                            </h6>
                        </td>
                        <td style={{ width: '20%'}}>{ icons.cartIcon() }</td>
                    </Link>
                </tr>
                <tr>
                    <Link to='/me'>
                        <td style={{ textAlign: "right"}}>
                            <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                                My profile
                            </h6>
                        </td>
                        <td style={{ width: '20%'}}>{ icons.profileIcon() }</td>
                    </Link>
                </tr>
                <tr>
                    <Link to='/logout'>
                        <td style={{ textAlign: "right"}}>
                            <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                                Logout
                            </h6>
                        </td>
                        <td style={{ width: '20%'}}>{ icons.logoutIcon() }</td>
                    </Link>
                </tr>
            </tbody>
        </Table>
    );
}

export default ProfileMenu;