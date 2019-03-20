function nameCheck(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: 'Name must be included' });
  }

  if (req.body.name[0] == req.body.name[0].toUpperCase()) {
    next();
  } else {
    res.status(400).json({ message: 'First letter in name needs to be upper cased' });
  }
}

module.exports = {
  nameCheck
};
