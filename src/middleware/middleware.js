const { decrypt } = require("../utils/jwt");

const verificarToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token no proporcionado");

    const decoded = await decrypt(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Token no válido o expirado");
  }
};

exports.verificarToken = verificarToken;