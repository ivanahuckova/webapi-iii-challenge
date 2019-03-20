// code away!
const server = require('./server');
const port = 9000;

server.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
