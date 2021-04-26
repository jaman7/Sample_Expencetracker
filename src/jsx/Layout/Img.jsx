import React from 'react';
import PropTypes from 'prop-types';

const Img = ({ src, alt, className }) => (
	<img
		src={src}
		alt={alt || 'imagetitle'}
		className={className ? `img-fluid ${className}` : 'img-fluid'}
		aria-label={alt}
	/>
);

Img.propTypes = {
	src: PropTypes.string,
	className: PropTypes.string,
	alt: PropTypes.string
};

Img.defaultProps = {
	src: '',
	className: 'img-fluid',
	alt: ''
};

export default Img;
