import React, { useState } from 'react';
import Button from '../../button/Button';
import Input from '../../input/Input';
import '../guestsModal/modal.scss';

const Modal = ({ onModalClose, onFormSubmit }) => {
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		DOB: '',
	});

	return (
		<div className='container_wrapper'>
			<form
				className='container'
				onSubmit={(event) => onFormSubmit(event, formValues)}
			>
				<Input
					type='text'
					placeholder='Enter Name'
					onChange={(event) =>
						setFormValues((prevState) => ({
							...prevState,
							name: event.target.value,
						}))
					}
					value={formValues.name}
					required
				/>
				<Input
					type='text'
					placeholder='Enter Email'
					onChange={(event) =>
						setFormValues((prevState) => ({
							...prevState,
							email: event.target.value,
						}))
					}
					value={formValues.email}
					required
				/>
				<Input
					type='text'
					placeholder='Enter Date of Birth'
					onChange={(event) =>
						setFormValues((prevState) => ({
							...prevState,
							DOB: event.target.value,
						}))
					}
					value={formValues.DOB}
					required
				/>
				<Button title='Add guest' />
				<Button title='Close' onClick={onModalClose} />
			</form>
		</div>
	);
};

export default Modal;
