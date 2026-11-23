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
    trim: true,
  },
  descripcio: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true,
  },
  preu: {
    type: Number,
    required: true,
    min: 0,
    max: 10000,
    validate: {
      validator: Number.isFinite,
      message: "El preu ha de ser un numero valid",
    },
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    validate: { validator: Number.isInteger, message: "L'estoc ha de ser un enter" },
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
}, { timestamps: true });

producteSchema.index({ nom: 1 });
producteSchema.index({ categoria: 1 });

module.exports = mongoose.model("Producte", producteSchema);
