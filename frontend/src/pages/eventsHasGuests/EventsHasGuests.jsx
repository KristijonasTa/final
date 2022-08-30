import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Nav from '../../components/nav/Nav';
import './eventsHasGuests.scss';

const EventsHasGuests = () => {
	const [eventsHasGuests, setEventsHasGuests] = useState([]);

	const fetchEventsHasGuests = async () => {
		try {
			const resp = await fetch(`${process.env.REACT_APP_SERVER_URI}attendees`);
			const data = await resp.json();
			setEventsHasGuests(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchEventsHasGuests();
	}, []);

	const onCardDelete = async (id) => {
		try {
			console.log(id);
			const resp = await fetch(
				`${process.env.REACT_APP_SERVER_URI}attendees/${id}`,
				{
					method: 'DELETE',
				}
			);
			const data = await resp.json();

			if (data.affectedRows > 0) {
				setEventsHasGuests((prev) =>
					prev.filter((eventsHasGuests) => eventsHasGuests.id !== id)
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Nav />
			{eventsHasGuests.map(({ id, name, email, events_name }) => {
				return (
					<div key={id} className='container'>
						<h1>Guest name - {name}</h1>
						<h3>Guest email - {email}</h3>
						<h3>Event - {events_name}</h3>
						<Button
							title={'Delete events information'}
							onClick={() => onCardDelete(id)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default EventsHasGuests;
