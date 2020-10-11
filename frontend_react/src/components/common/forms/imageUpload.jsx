import React, { useState }  from 'react';
import ImageUploading       from 'react-images-uploading';

function ImageUpload(props) {
    const [images, setImages] = useState([{}]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        props.onImageUpdate(imageList[0]);
        //console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <ImageUploading
            multiple={false}
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            resolutionType='more'
            resolutionHeight='500'
            resolutionWidth='500'
            acceptType={['jpg','gif','png']}
        >
            {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
            }) => (
            // write your building UI
            <div className="card text-center" style={{ height: '100%'}}>
                <div className="card-header">
                    <strong>Product image</strong>
                </div>
                <div className="card-body">
                    <div className="upload__image-wrapper">
                        {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img
                                src={image['data_url'] ? image['data_url'] : `${process.env.REACT_APP_API_URL}/products/${props.imageId}_logo.png`}
                                alt="" width="300"
                            />
                        </div>
                        ))}
                    </div>
                </div>
                <div className="card-footer text-muted bg-transparent">
                <button
                    className="btn btn-primary"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    >
                    Select
                </button>
                &nbsp;
                <button className="btn btn-primary" onClick={onImageRemoveAll}>Remove</button>
                </div>
            </div>
            
            )}
        </ImageUploading>
    );
}

export default ImageUpload;