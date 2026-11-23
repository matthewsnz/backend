
const mongoose = require("mongoose");

const tokensSchema = new mongoose.Schema({
  usuari: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuari",
    required: true
  },
  tokenHash: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  revocat: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Tokens", tokensSchema);
