
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuari = require("../models/Usuari");

const consulta = async (query) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 50) {
    const e = new Error("page ha de ser positiu i limit ha d'estar entre 1 i 50");
    e.status = 400;
    throw e;
  }

  const sort = query.sort || "nom";
  const camps = ["nom", "email", "createdAt"];

  if (!camps.includes(sort.replace(/^-/, ""))) {
    const e = new Error("Camp d'ordenacio no permès");
    e.status = 400;
    throw e;
  }

  const filtre = {};

  if (query.active !== undefined) {
    if (!["true", "false"].includes(query.active)) {
      const e = new Error("active ha de ser true o false");
      e.status = 400;
      throw e;
    }
    filtre.active = query.active === "true";
  }

  if (query.nom) filtre.nom = { $regex: query.nom, $options: "i" };

  const total = await Usuari.countDocuments(filtre);

  const data = await Usuari.find(filtre)
    .sort(sort.startsWith("-") ? { [sort.slice(1)]: -1 } : { [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const crear = async (dades) => {
  if (typeof dades.contrasenya !== "string" || dades.contrasenya.length < 12) {
    const e = new Error("La contrasenya ha de tenir minim 12 caracters");
    e.status = 422;
    throw e;
  }

  const passwordHash = await bcrypt.hash(dades.contrasenya, 10);

  const usuari = new Usuari({
    nom: dades.nom,
    email: dades.email,
    passwordHash,
    adreca: dades.adreca || "",
    role: "client"
  });

  return usuari.save();
};

const registrarUsuari = async ({ nom, email, password }) => {
  email = email.toLowerCase().trim();

  const existeix = await Usuari.findOne({ email });

  if (existeix) {
    const e = new Error("Email ja esta en us");
    e.status = 409;
    throw e;
  }

  if (typeof password !== "string" || password.length < 6) {
    const e = new Error("La contrasenya ha de tenir minim 6 caracters");
    e.status = 422;
    throw e;
  }

  const usuari = new Usuari({
    nom,
    email,
    passwordHash: password
  });

  await usuari.save();

  return usuari;
};

const loginUsuari = async ({ email, password }) => {
  email = email.toLowerCase().trim();

  const usuari = await Usuari.findOne({ email }).select("+passwordHash");

  if (!usuari || !usuari.active) {
    const e = new Error("Email o contrasenya incorrectes");
    e.status = 401;
    throw e;
  }

  const correcte = await bcrypt.compare(password, usuari.passwordHash);

  if (!correcte) {
    const e = new Error("Email o contrasenya incorrectes");
    e.status = 401;
    throw e;
  }

  const token = jwt.sign(
    {
      id: usuari._id,
      role: usuari.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    usuari,
    token
  };
};

const obtenir = async (id) => Usuari.findById(id);

const modificar = async (id, dades) => {
  const canvi = {};

  for (const camp of ["nom", "email", "adreca"]) {
    if (dades[camp] !== undefined) canvi[camp] = dades[camp];
  }

  if (dades.contrasenya !== undefined) {
    if (typeof dades.contrasenya !== "string" || dades.contrasenya.length < 12) {
      const e = new Error("La contrasenya ha de tenir minim 12 caracters");
      e.status = 422;
      throw e;
    }

    canvi.passwordHash = await bcrypt.hash(dades.contrasenya, 10);
  }

  return Usuari.findByIdAndUpdate(id, canvi, {
    new: true,
    runValidators: true
  });
};

// Desactivar usuari
const desactivar = async (id) => {
  return Usuari.findByIdAndUpdate(id, { active: false }, { new: true });
};

module.exports = {
  consulta,
  crear,
  registrarUsuari,
  loginUsuari,
  obtenir,
  modificar,
  desactivar
};
