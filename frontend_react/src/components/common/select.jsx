import React from 'react';

const Select	= ({ name, label, error, smallLabel, options, ...rest }) => {
	return (
		<div className="form-group row">
			<div className='col-4 mx-auto'>
			<label htmlFor={name}>{label}</label>
			</div>
			<div className='col-7 mx-auto'>
			<select id={name} name={name} {...rest} aria-describedby="selectHelp" className="form-control form-control-sm">
				<option key='none' value='' />
				{options.map(o => <option key={o.id} value={o.id}>{o.displayName}</option>)}
			</select>
			{ error && <div className='alert alert-danger'>{error}</div> }
			<small id="selectHelp" className="form-text text-muted">{smallLabel}</small>
		</div>
		</div>
	);
}

export default Select;