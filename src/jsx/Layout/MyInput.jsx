import React from 'react';
import PropTypes from 'prop-types';
import { Field, useField } from 'formik';
// import { toJS } from 'mobx';

const MyInput = ({ label, ...props }) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input> and alse replace ErrorMessage entirely.
	const [field, meta] = useField(props);
	const { id, className } = props;

	const mainclass = className;

	return (
		<>
			<div className="form-group">
				<label htmlFor={id}>{label}</label>

				<Field {...field} {...props} className={mainclass} />

				{meta.touched && meta.error ? <span className="error">{meta.error}</span> : null}
			</div>
		</>
	);
};

MyInput.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string
};

MyInput.defaultProps = {
	id: '',
	className: ''
};

export default MyInput;
