const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({ success: false, error: { code: "DUPLICATE_VALUE", message: "El valor ja existeix" } });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, error: { code: "INVALID_ID", message: "L'identificador no es valid" } });
  }
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((item) => ({ field: item.path, message: item.message }));
    return res.status(422).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Les dades no son valides", details } });
  }
  const status = err.status || 500;
  res.status(status).json({ success: false, error: { code: status === 500 ? "SERVER_ERROR" : "REQUEST_ERROR", message: status === 500 ? "Error intern del servidor" : err.message } });
};
module.exports = errorHandler;
