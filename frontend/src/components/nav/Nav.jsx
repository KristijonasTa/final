import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

const Nav = () => {
	return (
		<nav>
			<h1 className='navigation'>Navigation</h1>
			<div>
				<Link to='/'>Events</Link>
				<Link to='/guests'>Guests</Link>
				<Link to='/events'>More information</Link>
			</div>
		</nav>
	);
};

export default Nav;
