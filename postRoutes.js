const express = require('express');
const postDb = require('./data/helpers/postDb');

const routes = express.Router();
routes.use(express.json());

// ========== GET ROUTES ========== //
routes.get('/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

routes.get('/:id', async (req, res) => {
  try {
    const post = await postDb.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: 'Post with that id does not exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== POST ROUTES ========== //

module.exports = routes;
