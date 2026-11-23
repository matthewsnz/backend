
const express = require("express");
const router = express.Router();

const usuariController = require("../controllers/usuariController");

router.post("/registro", usuariController.registrar);
router.post("/login", usuariController.login);

router.post("/", usuariController.crear);
router.get("/", usuariController.llistar);
router.get("/:id", usuariController.obtenir);
router.put("/:id", usuariController.modificar);
router.delete("/:id", usuariController.desactivar);

module.exports = router;
