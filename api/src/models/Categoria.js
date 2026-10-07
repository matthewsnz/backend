const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  idCategoria: {
    type: Number,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50,
  },
  descripcio: {
    type: String,
    required: true,
    maxlength: 200,
  },
});

categoriaSchema.index({ nom: 1 });

module.exports = mongoose.model("Categoria", categoriaSchema);
