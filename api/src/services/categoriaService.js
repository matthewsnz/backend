const Categoria = require("../models/Categoria");
const Producte = require("../models/Producte");

const opcionsConsulta = (query) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
    const error = new Error("page i limit han de ser enters positius");
    error.status = 400;
    throw error;
  }
  if (limit > 50) {
    const error = new Error("El limit maxim es 50");
    error.status = 400;
    throw error;
  }
  const camps = ["nom", "slug", "createdAt"];
  const sort = query.sort || "nom";
  if (!camps.includes(sort.replace(/^-/, ""))) {
    const error = new Error("Camp d'ordenacio no permès");
    error.status = 400;
    throw error;
  }
  return { page, limit, sort: sort.startsWith("-") ? { [sort.slice(1)]: -1 } : { [sort]: 1 } };
};

const llistar = async (query) => {
  const { page, limit, sort } = opcionsConsulta(query);
  const filtre = {};
  if (query.active !== undefined) {
    if (!["true", "false"].includes(query.active)) { const e = new Error("active ha de ser true o false"); e.status = 400; throw e; }
    filtre.active = query.active === "true";
  }
  if (query.nom) filtre.nom = { $regex: query.nom, $options: "i" };
  const total = await Categoria.countDocuments(filtre);
  const data = await Categoria.find(filtre).sort(sort).skip((page - 1) * limit).limit(limit);
  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};
const crear = async (dades) => new Categoria({ nom: dades.nom, slug: dades.slug, descripcio: dades.descripcio, active: dades.active }).save();
const obtenir = async (id) => Categoria.findById(id);
const modificar = async (id, dades) => {
  const camps = ["nom", "slug", "descripcio", "active"];
  const canvi = {};
  for (const camp of camps) if (dades[camp] !== undefined) canvi[camp] = dades[camp];
  return Categoria.findByIdAndUpdate(id, canvi, { new: true, runValidators: true });
};
const eliminar = async (id) => {
  const productes = await Producte.countDocuments({ categoria: id });
  if (productes > 0) { const e = new Error("No es pot eliminar una categoria que te productes assignats"); e.status = 409; throw e; }
  return Categoria.findByIdAndDelete(id);
};
module.exports = { llistar, crear, obtenir, modificar, eliminar };
