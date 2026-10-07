const mongoose = require("mongoose");

const liniaComandaSchema = new mongoose.Schema({
  idLinia: {
    type: Number,
    required: true,
    unique: true,
  },
  quantitat: {
    type: Number,
    required: true,
    min: 1,
  },
  preu: {
    type: Number,
    required: true,
    min: 0,
  },
  comanda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comanda",
    required: true,
  },
  producte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producte",
    required: true,
  },
});

liniaComandaSchema.index({ comanda: 1 });
liniaComandaSchema.index({ producte: 1 });

module.exports = mongoose.model("LiniaComanda", liniaComandaSchema);
