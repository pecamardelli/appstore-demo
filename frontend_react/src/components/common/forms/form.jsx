import React, { Component } from 'react';
import Joi			from 'joi-browser';
import Input		from './input';
import Select		from './select';
import TextArea		from './textArea';

export default class Form extends Component {
	state = {
		data:	{},
		errors:	{}
	};
	
	validate = () => {
		//const result	= this.schema.validate(this.state.data);
		const { error }	= Joi.validate(this.state.data, this.schema, { abortEarly: false });
		console.log(error)
		if(!error) return null;
	
		const errors	= {};	
		for(let item of error.details) errors[item.path[0]] = item.message;
		
		return errors;
	};
	
	validateProperty = ({ name, value }) => {
		let obj;
		let schema;

		// It is required to validate both password boxes because
		// confirmPassword references password.
		if(name === 'confirmPassword') {
			obj	= {
				password:			this.state.data.password,
				confirmPassword:	value
			};

			schema	= {
				password: 			this.schema.password,
				confirmPassword:	this.schema.confirmPassword,
			}
			
		}
		else {
			obj		= { [name]: value };
			schema	= { [name]: this.schema[name] };
		}

		const { error }	= Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};
	
	handleSubmit	= e => {
		e.preventDefault();
		
		const errors	= this.validate();
		this.setState({ errors: errors || {} });
		if(errors) return;
		
		this.doSubmit();
	};
	
	handleChange	= ({ currentTarget: input }) => {
		const errors		= { ...this.state.errors };
		const errMsg		= this.validateProperty(input);
		
		if(errMsg) errors[input.name] = errMsg;
		else delete errors[input.name];
		
		const data			= { ...this.state.data };
		data[input.name]	= input.value;
		this.setState({ data, errors });
	};
	
	renderButton	= label => {
		return (
			<div className='row'>
				<div className='col-2 mx-auto'>
					<button disabled={this.validate()} type="submit" className="btn btn-primary">{label}</button>
				</div>
			</div>
		);
	}
	
	renderInput		= (name, label, type = 'text', smallLabel = '', autoFocus = false) => {
		const	{ data, errors }	= this.state;
		
		return (
			<Input
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				autoFocus={autoFocus}
				type={type}
				smallLabel={smallLabel}
				error={errors[name]}
			/>
		);
	}

	renderNumber	= (name, label, step = 1, smallLabel = '', autoFocus = false) => {
		const	{ data, errors }	= this.state;
		
		return (
			<Input
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				autoFocus={autoFocus}
				type='number'
				step={step}
				smallLabel={smallLabel}
				error={errors[name]}
			/>
		);
	}

	renderTextArea		= (name, label, smallLabel = '', autoFocus = false) => {
		const	{ data, errors }	= this.state;
		
		return (
			<TextArea
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				autoFocus={autoFocus}
				smallLabel={smallLabel}
				error={errors[name]}
			/>
		);
	}
	
	renderSelect	= (name, label, options, smallLabel = '', autoFocus = false) => {
		const	{ data, errors }	= this.state;
		return (
			<Select
				name={name}
				value={data.genreId}
				options={options}
				label={label}
				onChange={this.handleChange}
				autoFocus={autoFocus}
				smallLabel={smallLabel}
				error={errors[name]}
			/>
		);
	};
}