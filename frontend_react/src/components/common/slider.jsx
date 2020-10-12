import React        from 'react';
import ReactSlider  from 'react-slick';
import { Link }     from 'react-router-dom';
import noImage      from '../../assets/images/image_not_found.png';

function Slider({ items = [], path = '/images' }) {
    const settings = {
        dots:           true,
        pauseOnHover:   false,
        infinite:       true,
        autoplaySpeed:  5000,
        speed:          1000,
        slidesToShow:   1,
        slidesToScroll: 1,
        centerMode:     true,
        autoplay:       true
    };

    return (
        <ReactSlider { ...settings }>
            { items.map(i => <div className="card border-dark" role='button'>
                <Link to={`/store/${i.displayName.toLowerCase()}`}>
                    <div className="card-body text-center">
                        <img
                            src={`${process.env.REACT_APP_API_URL}${path}/${i.id}.png`}
                            onError={(e) => { e.target.onError = null; e.target.src=noImage }}
                            alt={i.description}
                            style={{ margin: '0 0 0 10%'}}
                        />
                    </div>
                </Link>
            </div>) }
        </ReactSlider>
    );
}

export default Slider;