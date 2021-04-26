import React from 'react';
import PropTypes from 'prop-types';

const H2 = ({ children, className, dataaos }) => (
	<h2 className={className} data-aos={dataaos}>
		{children}
	</h2>
);

H2.propTypes = {
	className: PropTypes.string,
	dataaos: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.array
	])
};

H2.defaultProps = {
	className: '',
	dataaos: '',
	children: ''
};

export default H2;
