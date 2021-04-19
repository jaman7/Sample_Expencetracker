import React from 'react';

export const InputNewTransaction = (name, value, placeholder, onChange, ref) => (
	<>
		<label htmlFor={name}>Text</label>
		<input
			id={name}
			name={name}
			className="form-control"
			type={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			ref={ref}
		/>
	</>
);

export default InputNewTransaction;
