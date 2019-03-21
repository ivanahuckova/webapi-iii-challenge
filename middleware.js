function nameCheck(req, res, next) {
  // no 'name' in body of request
  if (!req.body.name) {
    res.status(400).json({ message: 'Name with uppercased first letter must be included' });
  }
  // Uppercased first letter in name = OK
  if (req.body.name[0] == req.body.name[0].toUpperCase()) {
    next();
    // no uppercased first letter in name
  } else {
    res.status(400).json({ message: 'First letter in name needs to be upper cased' });
  }
}

module.exports = {
  nameCheck
};
