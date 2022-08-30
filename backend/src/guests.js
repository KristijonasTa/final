const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const DB_CONFIG = require('../config');

const router = express.Router();

const guestsShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false },
  }),
  DOB: Joi.date().required(),
});

router.get('/', async (req, res) => {
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query('SELECT * FROM guests');
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ status: 500, err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      `SELECT * FROM guests WHERE id=${Number(id)}`,
    );
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ status: 500, err });
  }
});

router.post('/', async (req, res) => {
  const { name, email, DOB } = req.body;
  try {
    try {
      await guestsShema.validateAsync({ name, email, DOB });
    } catch (err) {
      return res.status(401).json({
        status: 401,
        err,
      });
    }
    const con = await mysql.createConnection(DB_CONFIG);
    const [insertGuest] = await con.query('INSERT INTO guests SET ?', {
      name,
      email,
      DOB,
    });
    await con.end();
    return res.json(insertGuest);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [resp] = await con.query(`DELETE FROM guests WHERE id=${Number(id)}`);
    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({ status: 500, err });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const { name, email, DOB } = req.body;

  try {
    await guestsShema.validateAsync({ name, email, DOB });
  } catch (err) {
    return res.status(401).json({
      status: 401,
      err,
    });
  }
  const userData = {};
  if (name) userData.name = name;
  if (email) userData.email = email;
  if (DOB) userData.DOB = DOB;
  const con = await mysql.createConnection(DB_CONFIG);
  const [resp] = await con.query(
    `UPDATE guests SET ? WHERE id="${Number(id)}"`,
    userData,
  );
  await con.end();
  return res.json(resp);
});

module.exports = router;

// `DELETE FROM events_has_guests
// FROM table AS events_has_guests
// INNER JOIN table AS guests ON events_has_guests.guests_Id = guests.Id
// WHERE id=${Number(id)}`,
//   `DELETE FROM guests
// FROM table AS guests
// WHERE id=${Number(id)}`,
