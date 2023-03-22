function hasUser() {
  return (req, res, next) => {
    if (req.user) {
      console.log(req.user);
      next();
    } else {
      console.log("not user");
      res.status(401).json({ message: "Please Login" });
    }
  };
}

function isGuest() {
  return (req, res, next) => {
    if (req.user) {
      res.status(400).json({ message: "You are already logged in!" });
    }
    next();
  };
}

module.exports = {
  hasUser,
  isGuest,
};
