import React from 'react';
import './button.scss';

const Button = ({ type, className, title, onClick }) => {
	return (
		<button type={type} className={className} onClick={onClick}>
			{title}
		</button>
	);
};

export default Button;
