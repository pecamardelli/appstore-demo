import { getProduct, submitProduct }	from '../services/productService';
import { getSections }		from '../services/sectionService';
import { getCategories }	from '../services/categoryService';
import { toast }	from 'react-toastify';
import React, { Fragment }        from 'react';
import Joi			from 'joi-browser';
import Form 		from './common/forms/form';
import ImageUpload	from './common/forms/imageUpload';
import { updateProduct } from './../services/productService';

class ProductForm extends Form {
	state	= {
		data: {},
		sections:	[],
		categories:	[],
        errors: {}
    };
    
	async componentDidMount() {
		try {
			const { data: sections }	= await getSections();
			const productId				= this.props.match.params.id;
			let	product	= {};

			if (productId) {
				const { data }    = await getProduct(productId);
				product = {
					id:				data.id,
					displayName:	data.displayName,
					sectionId:		data.Category.Section.id,
					categoryId:		data.Category.id,
					description:	data.description,
					price:			data.price
				};
			}

			this.setState({ sections, data: product });
		}
		catch(ex) {
			console.log(ex);
		}
	}

	selectedSectionId = '';

	async componentDidUpdate() {
		if (this.selectedSectionId !== this.state.data.sectionId) {
			try {
				const { data: categories }	= await getCategories(this.state.data.sectionId);
				this.selectedSectionId		= this.state.data.sectionId;
				this.setState({ categories });
			}
			catch(ex) {
				console.log(ex);
			}
		}
	}

	schema	= {
		id:				Joi.any().label('Photo'),
		displayName:	Joi.string().min(1).max(255).required().label('Display name'),
		sectionId:		Joi.string().min(1).max(255).required().label('Section'),
		categoryId:		Joi.string().min(1).max(255).required().label('Category'),
		description:   	Joi.string().min(5).max(1024).required().label('Description'),
		photo:   		Joi.any().label('Photo'),
		price:			Joi.number().min(0).max(255).required().label('Price')
	};
	
	handleImageUpdate = (imageObject) => {
		const photo	= imageObject ? imageObject.data_url : null;
		const data	= { ...this.state.data, photo };
		this.setState({ data });
	}

	doSubmit = async() => {
		try {
			const product	= { ...this.state.data };
console.log(product)
			if (product.id) await updateProduct(product);
			else await submitProduct(product);

			toast.success(`Product '${this.state.data.displayName}' succesfully submitted!`);
			
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				const errors	= { ...this.state.errors };
				this.setState({ errors });
				return toast.error(`Error: ${ex.response.data}`);	
			}
		}
	};
	
	render() {
		return (
			<Fragment>
				<div>
					<h2><strong>{ this.state.data.id ? 'Update product' : 'Add new product' }</strong></h2>
				</div>
				<div className="card border-dark mb-3" style={{width: '100%'}}>
					<div className="row no-gutters">
						<div className="col-md-4">
							<ImageUpload
								onImageUpdate={this.handleImageUpdate}
								imageId={ this.state.data ? this.state.data.id : null }
							/>
						</div>
						<div className="col-md-8" style={{height: '90%'}}>
							<div className="card-header">
								<strong>Product data</strong>
							</div>
							<form onSubmit={this.handleSubmit}>
								<div className="card-body">
									{ this.renderInput('displayName', 'Display name') }
									{ this.renderSelect('sectionId', 'Section', this.state.sections) }
									{ this.renderSelect('categoryId', 'Category', this.state.categories) }
									{ this.renderTextArea('description', 'Description') }
									{ this.renderNumber('price', 'Price', '0.01') }
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

export default ProductForm;