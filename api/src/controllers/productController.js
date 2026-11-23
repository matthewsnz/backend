const productService = require("../services/productService");

const crearProducte = async (req, res, next) => {
  try {
    const producte = await productService.crearProducte(req.body);
    res.status(201).json({ success: true, data: producte });
  } catch (error) { next(error); }
};

const obtenirProductes = async (req, res, next) => {
  try {
    const productes = await productService.obtenirProductes();
    res.status(200).json({ success: true, data: productes });
  } catch (error) { next(error); }
};

const obtenirProducte = async (req, res, next) => {
  try {
    const producte = await productService.obtenirProducte(req.params.id);
    if (!producte) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Producte no trobat" } });
    res.status(200).json({ success: true, data: producte });
  } catch (error) { next(error); }
};

const modificarProducte = async (req, res, next) => {
  try {
    const camps = ["idProducte", "nom", "descripcio", "preu", "stock", "imatge", "categoria"];
    const dades = {};
    for (const camp of camps) if (req.body[camp] !== undefined) dades[camp] = req.body[camp];
    const producte = await productService.modificarProducte(req.params.id, dades);
    if (!producte) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Producte no trobat" } });
    res.status(200).json({ success: true, data: producte });
  } catch (error) { next(error); }
};

const esborrarProducte = async (req, res, next) => {
  try {
    const producte = await productService.esborrarProducte(req.params.id);
    if (!producte) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Producte no trobat" } });
    res.status(204).send();
  } catch (error) { next(error); }
};

module.exports = { crearProducte, obtenirProductes, obtenirProducte, modificarProducte, esborrarProducte };
