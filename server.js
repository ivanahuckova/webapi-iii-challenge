const express = require('express');
const postRoutes = require('./postRoutes');

const server = express();

server.use(express.json());
server.use('/posts/', postRoutes);

module.exports = server;
