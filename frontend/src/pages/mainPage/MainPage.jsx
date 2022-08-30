import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/nav/Nav';
import './mainPage.scss';

function MainPage() {
	const [events, setEvents] = useState([]);
	const fetchEvents = async () => {
		try {
			const resp = await fetch(`${process.env.REACT_APP_SERVER_URI}events`);
			const data = await resp.json();
			setEvents(data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchEvents();
	}, []);

	return (
		<div>
			<Nav />
			<div className='table_wrapper'>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Date</th>
							<th>More information</th>
						</tr>
					</thead>
					<tbody>
						{events.map(({ id, name, date }) => {
							return (
								<tr key={id}>
									<td>{id}</td>
									<td>{name}</td>
									<td>{date}</td>
									<td>
										<Link to='/events'>
											<button>More info</button>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default MainPage;
