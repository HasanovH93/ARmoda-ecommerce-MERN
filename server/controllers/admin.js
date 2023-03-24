const adminController = require("express").Router();
const removePassword = require("../helpers/removePassword");
const adminLogin = require("../services/admin");
const { createToken } = require("../services/user");
const { parseError } = require("../util/parser");

adminController.post("/login", async (req, res) => {
  try {
    const user = await adminLogin(req.body.email, req.body.password);
    console.log(user);
    const token = createToken(user);
    const userData = removePassword(user);

    res.json({ userData, token, expiresIn: 3600 });
  } catch (error) {
    console.log(error.message);
    const message = parseError(error);
    res.status(401).json({ message });
  }
});

module.exports = adminController;
