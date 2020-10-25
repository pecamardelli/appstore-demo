import React        from 'react';
import { Table }    from 'react-bootstrap';
import { Link }     from 'react-router-dom';
import noImage      from '../../assets/images/image_not_found.png';
import auth			from '../../services/authService';
import icons        from './userIcons';

function ProfileMenu(props) {
    const user  = auth.getCurrentUser();
    let myProductsButton    = '';

    if (user.accessLevel <= 4) {
        myProductsButton    = (<tr>
            <td style={{ textAlign: "right"}}>
                <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                    My products
                </h6>
            </td>
            <td style={{ width: '20%'}}>
                <Link to='/me/products'>
                    { icons.productIcon() }
                </Link>
            </td>
        </tr>);
    }

    return (
        <Table hover size="sm" style={{ marginTop: '15px'}}>
            <thead className='text-center'>
                <tr>
                    <td colSpan='2'>
                        <img
                            src={`${process.env.REACT_APP_API_URL}/images/users/avatar/${user.id}.png`}
                            onError={(e) => {e.target.onerror = null; e.target.src=noImage}}
                            style={{ maxHeight: '90%', maxWidth: '90%', margin: '0 0 5% 0'}}
                            alt=''
                        />
                    </td>
                </tr>
            </thead>
            <tbody>
                { myProductsButton }
                <tr>
                    <td style={{ textAlign: "right"}}>
                        <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                            My wishlist
                        </h6>
                    </td>
                    <td style={{ width: '20%'}}>
                        <Link to='/me/wishlist'>
                        { icons.cartIcon() }
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: "right"}}>
                        <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                            My purchases
                        </h6>
                    </td>
                    <td style={{ width: '20%'}}>
                        <Link to='/me/purchases'>
                        { icons.buyedIcon() }
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: "right"}}>
                        <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                            My profile
                        </h6>
                    </td>
                    <td style={{ width: '20%'}}>
                        <Link to='/me'>
                        { icons.profileIcon() }
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: "right"}}>
                        <h6 style={{ marginTop: '3px'}} className='text-secondary'>
                            Logout
                        </h6>
                    </td>
                    <td style={{ width: '20%'}}>
                        <Link to='/logout'>
                        { icons.logoutIcon() }
                        </Link>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default ProfileMenu;