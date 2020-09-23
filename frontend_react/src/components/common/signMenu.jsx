import React    from 'react';
import { Link } from 'react-router-dom';

function SignMenu(props) {
    return (
        <div className="form-inline my-2 my-lg-1">
            <Link to='/register'>
                <button type="button" className="btn btn-outline-danger">Sign up</button>
            </Link>
            <Link to='/login'>
                <button type="button" className="btn btn-outline-danger">Sign in</button>
            </Link>
        </div>
    );
}

export default SignMenu;