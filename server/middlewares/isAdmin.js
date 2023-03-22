// Middleware function to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // User is an admin, allow access to admin panel
    next();
  } else {
    // User is not an admin, deny access
    res
      .status(401)
      .json({ message: "You are not authorized to access this page." });
  }
};

module.exports = isAdmin;
