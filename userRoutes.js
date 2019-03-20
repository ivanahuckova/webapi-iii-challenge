const express = require('express');
const userDb = require('./data/helpers/userDb');
const md = require('./middleware');

const nameCheck = md.nameCheck;

const routes = express.Router();

// ========== GET ROUTES ========== //

routes.get('/', async (req, res) => {
  try {
    const posts = await userDb.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

routes.get('/:id', async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User with that id does not exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== POST ROUTES ========== //

routes.post('/', nameCheck, async (req, res) => {
  try {
    const user = await userDb.insert(req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'You need to add name' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = routes;
