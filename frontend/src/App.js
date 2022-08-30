import React from 'react';
import MainPage from './pages/mainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import Guests from './pages/guests/Guests';
import EventsHasGuests from './pages/eventsHasGuests/EventsHasGuests';
import UpdateGuests from './components/guests/updateGuests/UpdateGuests';

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/guests' element={<Guests />} />
			<Route path='/events' element={<EventsHasGuests />} />
			<Route path='/update/:id' element={<UpdateGuests />} />
			<Route path='*' element={'Page not found'} />
		</Routes>
	);
}

export default App;
