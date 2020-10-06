import React        from 'react';
import { Table }    from 'react-bootstrap';
import { Link }     from 'react-router-dom';
import icons        from './userIcons';

function ProfileMenu(props) {
    return (
        <Table hover size="sm" style={{ marginTop: '15px'}}>
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
                                My wish list
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