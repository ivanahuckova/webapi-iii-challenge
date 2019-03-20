const express = require('express');
const postDb = require('./data/helpers/postDb');

const routes = express.Router();

// ========== GET ROUTES ========== //
// to '/posts'

routes.get('/', async (req, res) => {
  try {
    const allPosts = await postDb.get();
    if (allPosts) {
      res.status(200).json(allPosts);
    } else {
      res.status(204).json({ message: 'No posts in database' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// to '/posts/:id'

routes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postDb.getById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: `Post with ${id} does not exists` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== POST ROUTES ========== //
// to '/posts'

routes.post('/', async (req, res) => {
  try {
    const { user_id, text } = req.body;
    //if user_id or text missing -> throw error
    if (user_id === undefined || text === undefined) {
      res.status(400).json({ message: "Make sure you are including 'user_id' and 'text' in your request" });
    } else {
      const newPost = await postDb.insert({ user_id, text });
      if (newPost) {
        res.status(200).json(newPost);
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== DELETE ROUTES ========== //
// to '/posts/:id'

routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletePost = await postDb.remove(id);
    if (deletePost) {
      res.status(200).json({ message: `Post with id ${id} was delete` });
    } else {
      res.status(400).json({ message: 'Post with that id does not exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== UPDATE ROUTES ========== //
// to '/posts/:id'

routes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const updatePost = await postDb.update(id, { text: text });
    if (updatePost) {
      res.status(200).json({ message: `Post with id ${id} was updated with following text: ${text}` });
    } else {
      res.status(400).json({ message: `Post with that id ${id} does not exists` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = routes;
