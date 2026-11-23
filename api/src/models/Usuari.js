const mongoose = require("mongoose");

const usuariSchema = new mongoose.Schema({
  idUsuari: {
    type: Number,
    unique: true,
    sparse: true,
  },
  nom: {
    type: String,
    required: [true, "El nom es obligatori"],
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correu es obligatori"],
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["client", "admin"],
    default: "client",
  },
  active: {
    type: Boolean,
    default: true,
  },
  adreca: {
    type: String,
    default: "",
    maxlength: 200,
  },
}, { timestamps: true });

usuariSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Usuari", usuariSchema);
