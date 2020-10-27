import React		from 'react';
import { toast }	from 'react-toastify';
import Joi			from 'joi-browser';
import Form 		from './forms/form';
import ModalContext from '../../context/modalContext';
import { submitPassword } from '../../services/myService';

class ChangePassword extends Form {
	state	= {
        data:	{},
        closeModal: null,
		errors: {}
    };

    static contextType  = ModalContext;

	schema	= {
		password:	Joi.string().min(8).max(64).required().label('Password'),
		confirmPassword: Joi.string().equal(Joi.ref('password')).min(8).max(64).required().options({
			language:{
				any: {
					allowOnly: ' does not match'
				}
			}
		}).label('Confirm password')
	};
	
	doSubmit = async() => {
		try {
			const result	= await submitPassword(this.state.data);
			toast.success(result.message);
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				return toast.error(`Error: ${ex.response.data}`);	
			}
		}
	};
	
	render() {
		return (
            <ModalContext.Consumer>
            { ModalContext => <div className="card border-dark mb-3" style={{width: '100%'}}>
                    <div className="card-header">
                        <strong>Update your password</strong>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="card-body">
                            { this.renderInput('password', 'Password', 'password')}
                            { this.renderInput('confirmPassword', 'Confirm password', 'password')}
                        </div>
						{ /* Assign ModalContext to the onClick event to close modal on submit */}
                        <div className="card-footer text-muted bg-transparent" onClick={ModalContext}>
                            { this.renderButton('Submit') }
                        </div>
                    </form>
                </div>
            }
            </ModalContext.Consumer>
		);
	}
}

export default ChangePassword;