const express = require('express');
require('dotenv').config();
const cors = require('cors');
const eventsRouter = require('./src/events');
const guestsRouter = require('./src/guests');
const eventHasGuestsRouter = require('./src/eventsHasGuests');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/guests', guestsRouter);
app.use('/api/attendees', eventHasGuestsRouter);

app.all('*', (req, res) => {
  res.status(404).send('Path not found');
});

app.listen(PORT, () => console.log(`Server is runing on PORT:${PORT}`));
