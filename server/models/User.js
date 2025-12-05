const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // hashed password (optional for OAuth users)
    name: { type: String },
    googleId: { type: String, sparse: true }, // Google user ID for OAuth users
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' } // Track auth method
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
