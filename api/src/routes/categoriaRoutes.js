const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoriaController");
router.post("/", controller.crear);
router.get("/", controller.llistar);
router.get("/:id", controller.obtenir);
router.put("/:id", controller.modificar);
router.delete("/:id", controller.eliminar);
module.exports = router;
