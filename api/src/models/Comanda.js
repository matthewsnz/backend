const mongoose = require("mongoose");

const comandaSchema = new mongoose.Schema({
  idComanda: {
    type: Number,
    required: true,
    unique: true,
  },
  data: {
    type: Date,
    required: true,
  },
  estat: {
    type: String,
    required: true,
    enum: ["pendent", "pagada", "enviada", "entregada", "cancel·lada"],
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  usuari: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuari",
    required: true,
  },
});

comandaSchema.index({ usuari: 1 });
comandaSchema.index({ estat: 1 });

module.exports = mongoose.model("Comanda", comandaSchema);
