import React				from 'react';
import { submitCategory }	from './../services/categoryService';
import { getSections }	from '../services/sectionService';
import { toast }		from 'react-toastify';
import Form 			from './common/forms/form';
import Joi				from 'joi-browser';

class CategoryForm extends Form {
	state	= {
		data: 		{},
		sections:	[],
		errors:		{}
	};
	
	async componentDidMount() {
		try {
			const { data: sections }	= await getSections();
			this.setState({ sections });
		}
		catch(ex) {
			console.log(ex);
		}
	}

	schema	= {
		sectionId:		Joi.string().min(1).max(36).required().label('Section'),
		displayName:   	Joi.string().min(1).max(255).required().label('Name'),
		description:   	Joi.string().min(5).max(255).required().label('Description')
	};
	
	doSubmit = async() => {
		try {
			const category	= { ...this.state.data };
			console.log(category)
			await submitCategory(category);
			toast.success(`Category '${this.state.data.name}' succesfully submitted!`);
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				const errors	= { ...this.state.errors };
				errors.category	= ex.response.data;
				this.setState({ errors });	
			}

			return toast.error(`Error: ${ex.response.data}`);
		}
	};
	
	render() {
		return (
			<div className='row' style={{ marginTop: '5%' }}>
				<div className="card bg-light border-secondary mb-2 mx-auto" style={{ width: '35rem' }}>
					<div className="card-header">
						<h4 className="card-title">Add new category</h4>
					</div>
					<div className="card-body">
						<form onSubmit={this.handleSubmit} >
							{ this.renderSelect('sectionId', 'Section', this.state.sections) }
							{ this.renderInput('displayName', 'Name') }
							{ this.renderTextArea('description', 'Description') }
							{ this.renderButton('Add') }
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default CategoryForm;