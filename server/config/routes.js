const adminController = require("../controllers/admin");
const authController = require("../controllers/auth");
const dataController = require("../controllers/data");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({ message: "REST Service Working" });
  });

  app.use("/users", authController);
  app.use("/hotels", dataController);
  app.use("/admin", adminController);
};
