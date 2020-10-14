import React, { Fragment }	from 'react';
import { submitSection }	from '../services/sectionService';
import ImageUpload		from './common/forms/imageUpload';
import { toast }		from 'react-toastify';
import Form 			from './common/forms/form';
import Joi				from 'joi-browser';

class SectionForm extends Form {
	state	= {
		data: 		{},
		errors:		{}
	};

	schema	= {
		id:				Joi.any().label('Id'),
		displayName:   	Joi.string().min(1).max(255).required().label('Name'),
		description:   	Joi.string().min(5).max(255).required().label('Description'),
		photo:   		Joi.any().label('Photo')
	};

	doSubmit = async () => {
		try {
			const section	= { ...this.state.data };
			await submitSection(section);
			toast.success(`Section '${this.state.data.name}' succesfully submitted!`);
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				const errors	= { ...this.state.errors };
				errors.section	= ex.response.data;
				this.setState({ errors });	
			}

			return toast.error(`Error: ${ex.response.data}`);
		}
	};
	
	render() {
		return (
			<Fragment>
				<div>
					<h2><strong>{ this.state.data.id ? 'Update section' : 'Add new section' }</strong></h2>
					<hr />
				</div>
				<div className="card border-dark mb-3" style={{width: '100%'}}>
					<div className="row no-gutters">
						<div className="col-md-4">
							<ImageUpload
								onImageUpdate={this.handleImageUpdate}
								imageId={ this.state.data ? this.state.data.id : null }
								title='Section pic'
								path='/sections'
							/>
						</div>
						<div className="col-md-8" style={{height: '90%'}}>
							<div className="card-header">
								<strong>Section data</strong>
							</div>
							<form onSubmit={this.handleSubmit}>
								<div className="card-body">
									
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
			</Fragment>
		);
	}
}

export default SectionForm;