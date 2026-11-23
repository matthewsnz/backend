const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.post("/", productController.crearProducte);
router.get("/", productController.obtenirProductes);
router.get("/:id", productController.obtenirProducte);
router.put("/:id", productController.modificarProducte);
router.delete("/:id", productController.esborrarProducte);

module.exports = router;
