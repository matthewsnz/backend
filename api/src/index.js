require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const usuariRoutes = require("./routes/usuariRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Ecommerce de jocs de taula en marxa");
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoriaRoutes);
app.use("/api/users", usuariRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escoltant al port ${PORT}`);
  });
});
