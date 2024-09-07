
const express = require('express');
const router = express.Router();
const Availability = require('../models/availability');


router.get('/user/:email', async (req, res) => {
  const { email } = req.params;
  const { date } = req.query;  
  
  try {
    const availability = await Availability.find({ user: email, date });
    res.json(availability);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});


module.exports = router;
