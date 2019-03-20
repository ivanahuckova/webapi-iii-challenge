const express = require('express');
const userDb = require('./data/helpers/userDb');
const md = require('./middleware');

const nameCheck = md.nameCheck;

const routes = express.Router();

// ========== GET ROUTES ========== //
// to '/users'

routes.get('/', async (req, res) => {
  try {
    const allUsers = await userDb.get();
    if (allUsers) {
      res.status(200).json(allUsers);
    } else {
      res.status(204).json({ message: 'No users in database' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// to '/users:id'

routes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userDb.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User with id ${id} does not exists` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// to '/users:id/posts'

routes.get('/:id/posts', async (req, res) => {
  try {
    const { id } = req.params;

    const allCommentsOfUser = await userDb.getUserPosts(id);
    if (allCommentsOfUser.length > 0) {
      res.status(200).json(allCommentsOfUser);
    } else {
      res.status(404).json({ message: `User with id ${id} does not exists` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== POST ROUTES ========== //
// to '/posts'

routes.post('/', nameCheck, async (req, res) => {
  //nameCheck handling lower-case users and wrong format of request
  try {
    const { name } = req.body;

    const newUser = await userDb.insert({ name });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== DELETE ROUTES ========== //
// to '/posts/:id'
routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await userDb.remove(id);
    console.log(deleteUser);
    if (deleteUser) {
      res.status(200).json(`Deleted user with id ${id}`);
    } else {
      res.status(404).json({ message: `User with id ${id} does not exists` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ========== UPDATE ROUTES ========== //
// to '/posts/:id'
routes.put('/:id', nameCheck, async (req, res) => {
  //nameCheck handling lower-case users and wrong format of request
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateUser = await userDb.update(id, { name: name });
    console.log(updateUser);
    if (updateUser) {
      res.status(200).json(`Updated user with id ${id} to name ${name}`);
    } else {
      res.status(404).json({ message: `User with id ${id} does not exists` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = routes;
