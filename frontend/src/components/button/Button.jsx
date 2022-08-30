import React from 'react';
import './button.scss';

const Button = ({ className, title, onClick }) => {
	return (
		<button className={className} onClick={onClick}>
			{title}
		</button>
	);
};

export default Button;
