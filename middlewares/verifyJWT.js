/**
 * Verifica que el token sea válido, protege las rutas
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next
 * @returns {Object} - Response
 * @example
 */

import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'No autorizado' });

    req.email = decoded.userInfo.email;
    req.roles = decoded.userInfo.roles;
    next();
  });
};

export default verifyJWT;
