import { submitCategory, getCategory, updateCategory }	from './../services/categoryService';
import React			from 'react';
import { getSections }	from '../services/sectionService';
import { toast }		from 'react-toastify';
import ImageUpload		from './common/forms/imageUpload';
import Joi				from 'joi-browser';
import Form 			from './common/forms/form';

class CategoryForm extends Form {
	state	= {
		data: 		{},
		sections:	[],
		errors:		{}
	};
	
	async componentDidMount() {
		try {
			const { data: sections }	= await getSections();
			const CategoryId			= this.props.match.params.id;
			let	category	= {};

			if (CategoryId) {
				try {
					const { data }    = await getCategory(CategoryId);
					console.log(data);
					category = {
						id:				data.id,
						displayName:	data.displayName,
						SectionId:		data.SectionId,
						description:	data.description
					};
				}
				catch (ex) {
					toast.error(`Error retrieving category data: ${ex}`);
				}
			}
			//console.log(category)

			this.setState({ sections, data: category });
		}
		catch(ex) {
			console.log(ex);
		}
	}

	schema	= {
		id:				Joi.any().label('Id'),
		SectionId:		Joi.string().min(1).max(36).required().label('Section'),
		displayName:   	Joi.string().min(1).max(255).required().label('Name'),
		description:   	Joi.string().min(5).max(255).required().label('Description'),
		photo:   		Joi.any().label('Photo'),
	};

	doSubmit = async() => {
		try {
			const category	= { ...this.state.data };

			if (category.id) await updateCategory(category);
			else await submitCategory(category);
			
			toast.success(`Category '${this.state.data.name}' succesfully submitted!`);
		}
		catch (ex) {
			const errors	= { ...this.state.errors };
			errors.category	= ex.response.data;
			this.setState({ errors });	
			console.log(ex.response)
			return toast.error(`Error: ${ex.response.data}`);
		}
	};
	
	render() {
		return (<>
			<br />
			<div>
				<h2><strong>{ this.state.data.id ? 'Update category' : 'Add new category' }</strong></h2>
				<hr />
			</div>
			<div className="card border-dark mb-3" style={{width: '100%'}}>
				<div className="row no-gutters">
					<div className="col-md-4">
						<ImageUpload
							onImageUpdate={this.handleImageUpdate}
							imageId={ this.state.data ? this.state.data.id : null }
							title='Category logo'
							path='/categories'
						/>
					</div>
					<div className="col-md-8" style={{height: '90%'}}>
						<div className="card-header">
							<strong>Category data</strong>
						</div>
						<form onSubmit={this.handleSubmit}>
							<div className="card-body">
								{ this.renderSelect('SectionId', 'Section', this.state.sections) }
								{ this.renderInput('displayName', 'Name') }
								{ this.renderTextArea('description', 'Description') }
							</div>
							<div className="card-footer text-muted bg-transparent">
								{ this.state.data.id ? this.renderButton('Update') : this.renderButton('Submit') }
							</div>
						</form>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default CategoryForm;