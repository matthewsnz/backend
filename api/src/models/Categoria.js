const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  idCategoria: {
    type: Number,
    unique: true,
    sparse: true,
  },
  nom: {
    type: String,
    required: [true, "El nom de la categoria es obligatori"],
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "El slug es obligatori"],
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  },
  descripcio: {
    type: String,
    maxlength: 500,
    default: "",
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

categoriaSchema.index({ nom: 1 });

module.exports = mongoose.model("Categoria", categoriaSchema);
