
const servei = require("../services/usuariService");

const llistar = async (req, res, next) => {
  try {
    res.json({
      success: true,
      ...await servei.consulta(req.query)
    });
  } catch (e) {
    next(e);
  }
};

const crear = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      data: await servei.crear(req.body)
    });
  } catch (e) {
    next(e);
  }
};

const registrar = async (req, res, next) => {
  try {
    const usuari = await servei.registrarUsuari(req.body);

    res.status(201).json({
      message: "Usuari registrat!!!",
      usuari
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const resultat = await servei.loginUsuari(req.body);

    res.json({
      message: "Login correcte!!!",
      token: resultat.token,
      usuari: resultat.usuari
    });
  } catch (e) {
    next(e);
  }
};

const obtenir = async (req, res, next) => {
  try {
    const data = await servei.obtenir(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Usuari no trobat"
        }
      });
    }

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

const modificar = async (req, res, next) => {
  try {
    const data = await servei.modificar(req.params.id, req.body);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Usuari no trobat"
        }
      });
    }

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

const desactivar = async (req, res, next) => {
  try {
    const data = await servei.desactivar(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Usuari no trobat"
        }
      });
    }

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  llistar,
  crear,
  registrar,
  login,
  obtenir,
  modificar,
  desactivar
};
