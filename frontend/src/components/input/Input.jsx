import React from 'react';
import './input.scss';

const Input = ({ onChange, value, type, placeholder, required }) => {
	return (
		<input
			type={type}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			required={required}
		/>
	);
};

export default Input;
