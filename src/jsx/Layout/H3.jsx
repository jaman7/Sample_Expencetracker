import React from 'react';
import PropTypes from 'prop-types';

const H3 = ({ children, className }) => <h3 className={className}>{children}</h3>;

H3.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.array
	])
};

H3.defaultProps = {
	className: '',
	children: ''
};

export default H3;
