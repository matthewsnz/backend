const Producte = require("../models/Producte");

const crearProducte = async (dades) => new Producte(dades).save();

const obtenirProductes = async () => Producte.find().populate("categoria");

const obtenirProducte = async (id) => Producte.findById(id).populate("categoria");

const modificarProducte = async (id, dades) => Producte.findByIdAndUpdate(id, dades, {
  new: true,
  runValidators: true,
}).populate("categoria");

const esborrarProducte = async (id) => Producte.findByIdAndDelete(id);

module.exports = { crearProducte, obtenirProductes, obtenirProducte, modificarProducte, esborrarProducte };
