import React from 'react';
import PropTypes from 'prop-types';

const P = ({ children, className }) => <p className={className}>{children}</p>;

P.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.array,
		PropTypes.bool
	])
};

P.defaultProps = {
	className: '',
	children: ''
};

export default P;
