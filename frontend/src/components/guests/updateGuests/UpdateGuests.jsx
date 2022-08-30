import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../nav/Nav';

const UpdateGuests = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		DOB: '',
	});

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_URI}guests/${Number(id)}`
				);
				const [data] = await response.json();
				setUserData((prev) => ({
					...prev,
					name: data.name,
					email: data.email,
					DOB: data.DOB,
				}));
			} catch (err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, [id]);

	const onGuestSubmit = async (event) => {
		event.preventDefault();
		const user = {
			name: userData.name,
			email: userData.email,
			DOB: userData.DOB,
		};
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URI}guests/${Number(id)}`,
				{
					method: 'PATCH',
					body: JSON.stringify(user),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			if (data.err) return alert('User is not updated!');
			navigate('/guests');
		} catch (err) {
			alert(err);
		}
	};

	return (
		<div>
			<Nav />
			<h2>Update Guest</h2>
			<form onSubmit={onGuestSubmit}>
				<input
					type='text'
					name='name'
					id='name'
					onChange={(event) =>
						setUserData((prev) => ({ ...prev, name: event.target.value }))
					}
					value={userData.name}
					required
				/>
				<input
					type='text'
					name='email'
					id='email'
					onChange={(event) =>
						setUserData((prev) => ({ ...prev, email: event.target.value }))
					}
					value={userData.email}
					required
				/>
				<input
					type='text'
					name='DOB'
					id='DOB'
					value={userData.DOB}
					onChange={(event) =>
						setUserData((prev) => ({ ...prev, DOB: event.target.value }))
					}
				/>
				<button type='submit'>Update user</button>
			</form>
		</div>
	);
};

export default UpdateGuests;
