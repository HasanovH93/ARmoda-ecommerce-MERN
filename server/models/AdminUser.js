const { Schema, model, Types } = require("mongoose");

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  hashedPassword: { type: String, required: true },
});

adminSchema.index(
  { email: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const Admin = new model("Admin", adminSchema);

module.exports = Admin;
