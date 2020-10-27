import React		    from 'react';
import auth 		    from '../../services/authService';
import noImage          from '../../assets/images/image_not_found.png';
import userIcons        from './userIcons';
import ModalBox         from './../common/modal';
import ChangePassword   from '../common/changePassword';

function MyProfile() {
    const user    = auth.getCurrentUser();
    const iconColumnStyle = {
        className:  'text-center',
        style:      {
            width:  '8%'
        }
    };

	return (<>
        <br /><h3>My profile</h3><hr />
        <div className="card border-dark mb-3" style={{width: '100%'}}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/images/users/avatar/${user.id}.png`}
                        onError={(e) => {e.target.onerror = null; e.target.src=noImage}}
                        style={{ maxWidth: '100%'}}
                        alt=''
                    />
                </div>
                <div className="col-md-8" style={{height: '90%'}}>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td { ...iconColumnStyle }>
                                    <span>{ userIcons.userIcon('2em') }</span>
                                </td>
                                <td>
                                    <h3>
                                        <strong>{ `${user.firstname} ${user.lastname}` }</strong>
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td { ...iconColumnStyle }>
                                    { userIcons.atIcon('3em') }
                                </td>
                                <td>
                                    <h4 style={{ marginTop: '5px'}}>{ user.username }</h4>
                                </td>
                            </tr>
                            <tr>
                                <td { ...iconColumnStyle }>
                                    { userIcons.mailIcon('2em') }
                                </td>
                                <td>
                                    <h4>{ user.email }</h4>
                                </td>
                            </tr>
                            <tr>
                                <td { ...iconColumnStyle }>
                                    { userIcons.roleIcon('2em') }
                                </td>
                                <td>
                                    <h4>{ user.role }</h4>
                                </td>
                            </tr>
                            <tr>
                                <td { ...iconColumnStyle }>
                                    { userIcons.keyIcon('2.2em') }
                                </td>
                                <td>
                                    <ModalBox
                                        buttonComponent={() => <button type="submit" className="btn btn-outline-secondary btn-block">Change password</button>}
                                        heading='Please confirm...'
                                        body={<ChangePassword />}
                                        closeCaption='Cancel'
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

export default MyProfile;