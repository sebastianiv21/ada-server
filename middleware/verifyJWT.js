import jwt from 'jsonwebtoken';
// TODO: apply this middleware to all routes that need to be protected (tests)
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
