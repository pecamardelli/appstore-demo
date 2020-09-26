import React from 'react';

const Input	= ({ name, label, error, smallLabel, ...rest }) => {
	return (
		<div className="form-group row">
			<div className='col-4 mx-auto'>
			<label htmlFor={name}>{label}</label>
			</div>
			<div className='col-7 mx-auto'>
			<input
				id={name}
				name={name}
				{...rest}
				className="form-control form-control-sm"
				aria-describedby="inputHelp"
			/>
			{ error && <div className='alert alert-danger'>{error}</div> }
		    <small id="inputHelp" className="form-text text-muted">{smallLabel}</small>
		  </div>
		  </div>
	);
}

export default Input;