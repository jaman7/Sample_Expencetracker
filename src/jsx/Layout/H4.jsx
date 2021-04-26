import React from 'react';
import PropTypes from 'prop-types';

const H4 = ({ children, className }) => <h3 className={className}>{children}</h3>;

H4.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.array,
		PropTypes.bool
	])
};

H4.defaultProps = {
	className: '',
	children: ''
};

export default H4;
