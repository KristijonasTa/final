const express = require('express');
const mysql = require('mysql2/promise');
const joi = require('joi');
const DB_CONFIG = require('../config');

const router = express.Router();

const eventHasGuestsShema = joi.object({
  eventsId: joi.string().required(),
  guestsId: joi.string().required(),
});

router.get('/', async (req, res) => {
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      'SELECT events_has_guests.id, events_has_guests.guests_id, events.name  AS events_name, guests.name, guests.email FROM events_has_guests JOIN guests ON events_has_guests.guests_id=guests.id JOIN events ON events_has_guests.events_id=events.id',
    );
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const { events_id: eventsId, guests_id: guestsId } = req.body;
  try {
    await eventHasGuestsShema.validateAsync({ eventsId, guestsId });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query('INSERT INTO events_has_guests SET ?', {
      events_id: eventsId,
      guests_id: guestsId,
    });
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [resp] = await con.query(
      `DELETE FROM events_has_guests WHERE id=${Number(id)}`,
    );
    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({ status: 500, err });
  }
});

module.exports = router;
