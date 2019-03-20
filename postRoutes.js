const express = require('express');
const postDb = require('./data/helpers/postDb');

const routes = express.Router();

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
      res.status(404).json({ message: 'Post with that id does not exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== POST ROUTES ========== //

routes.post('/', async (req, res) => {
  try {
    const { user_id, text } = req.body;
    const newPost = await postDb.insert({ user_id, text });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== DELETE ROUTES ========== //
routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await postDb.remove(id);
    if (deletePost) {
      res.status(200).json({ message: `Post with id ${id} was delete` });
    } else {
      res.status(404).json({ message: 'Post with that id does not exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== UPDATE ROUTES ========== //
routes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, text } = req.body;
    const updatePost = await postDb.update(id, { text: text });
    if (updatePost) {
      res.status(200).json({ message: `Post with id ${id} was updated with following text: ${text}` });
    } else {
      res.status(404).json({ message: 'Post with that id does not exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = routes;
