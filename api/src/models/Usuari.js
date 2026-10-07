const mongoose = require("mongoose");

const usuariSchema = new mongoose.Schema({
  idUsuari: {
    type: Number,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    validate: {
      validator: function (valor) {
        return valor.endsWith(".com") || valor.endsWith(".es");
      },
      message: "El email ha de acabar en .com o .es",
    },
  },
  contrasenya: {
    type: String,
    required: true,
    minlength: 6,
  },
  adreca: {
    type: String,
    required: true,
  },
});

usuariSchema.index({ email: 1 });

module.exports = mongoose.model("Usuari", usuariSchema);
