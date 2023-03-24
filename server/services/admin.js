const Admin = require("../models/AdminUser");
const bcrypt = require("bcryptjs");

async function adminLogin(email, password) {
  console.log(email, password);
  const user = await Admin.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) {
    throw new Error("incorrect username or password");
  }

  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    throw new Error("incorrect username or password");
  }
  return user;
}

module.exports = adminLogin;
