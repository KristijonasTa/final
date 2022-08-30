import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Modal from '../../components/guests/guestsModal/Modal';
import Nav from '../../components/nav/Nav';
import './guests.scss';

const Guests = () => {
	const [guest, setGuest] = useState([]);
	const [modal, setModal] = useState(false);

	const fetchGuests = async () => {
		try {
			const resp = await fetch(`${process.env.REACT_APP_SERVER_URI}guests`);
			const data = await resp.json();
			setGuest(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchGuests();
	}, []);

	const onCardDelete = async (id) => {
		try {
			const resp = await fetch(
				`${process.env.REACT_APP_SERVER_URI}guests/${id}`,
				{
					method: 'DELETE',
				}
			);
			const data = await resp.json();

			if (data.affectedRows > 0) {
				setGuest((prev) => prev.filter((guests) => guests.id !== id));
			}
		} catch (err) {
			console.log(err);
		}
	};

	const openModal = () => setModal(true);
	const closeModal = () => setModal(false);

	const onCardChange = async (event, guestData) => {
		event.preventDefault();
		try {
			const resp = await fetch(`${process.env.REACT_APP_SERVER_URI}guests`, {
				method: 'POST',
				body: JSON.stringify(guestData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await resp.json();

			if (data.affectedRows > 0) {
				setGuest((prevState) => [...prevState, guestData]);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Nav />
			{modal ? (
				<Modal onModalClose={closeModal} onFormSubmit={onCardChange} />
			) : null}
			<Button title='Add guest' onClick={openModal} />
			<div>
				{guest.map((data) => {
					return (
						<div key={`${data.id}-guest`} className='container'>
							<h1>Name - {data.name}</h1>
							<p>Email - {data.email}</p>
							<p>Date of birth - {data.DOB}</p>

							<Link className='link' to={`/update/${data.id}`}>
								Update
							</Link>

							<Button
								title='Delete guest'
								onClick={() => onCardDelete(data.id)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Guests;
