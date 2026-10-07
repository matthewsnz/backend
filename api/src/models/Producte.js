const mongoose = require("mongoose");

const producteSchema = new mongoose.Schema({
  idProducte: {
    type: Number,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  descripcio: {
    type: String,
    required: true,
    maxlength: 500,
  },
  preu: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  imatge: {
    type: String,
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
});

producteSchema.index({ nom: 1 });
producteSchema.index({ categoria: 1 });

module.exports = mongoose.model("Producte", producteSchema);
