const express = require('express');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

const server = express();

server.use(express.json());
server.use('/users', userRoutes);
server.use('/posts', postRoutes);

module.exports = server;
