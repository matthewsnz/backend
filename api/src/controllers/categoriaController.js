const servei = require("../services/categoriaService");
const llistar = async (req, res, next) => { try { res.json({ success: true, ...await servei.llistar(req.query) }); } catch (e) { next(e); } };
const crear = async (req, res, next) => { try { res.status(201).json({ success: true, data: await servei.crear(req.body) }); } catch (e) { next(e); } };
const obtenir = async (req, res, next) => { try { const data = await servei.obtenir(req.params.id); if (!data) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Categoria no trobada" } }); res.json({ success: true, data }); } catch (e) { next(e); } };
const modificar = async (req, res, next) => { try { const data = await servei.modificar(req.params.id, req.body); if (!data) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Categoria no trobada" } }); res.json({ success: true, data }); } catch (e) { next(e); } };
const eliminar = async (req, res, next) => { try { const data = await servei.eliminar(req.params.id); if (!data) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Categoria no trobada" } }); res.status(204).send(); } catch (e) { next(e); } };
module.exports = { llistar, crear, obtenir, modificar, eliminar };
