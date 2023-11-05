import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '#models/User.js';
import usuarioServices from '#services/usuarioServices.js';
import { jsonResponse } from '#utils';

// tiempo de expiracion de los tokens
const EXPIRATION_TIME = Object.freeze({
  ACCESS_TOKEN: '1m',
  REFRESH_TOKEN: '1d',
  JWT: 7 * 24 * 60 * 60 * 1000, // 7 dias
});

/**
 * @desc    Iniciar sesión
 * @route   POST /auth
 * @access  Public
 */
const login = async (req, res) => {
  const { email, clave } = req.body;

  const usuarioEncontrado = await usuarioServices.findUsuarioPorEmail(
    email.toString(),
  );

  if (!usuarioEncontrado?.activo) {
    return jsonResponse(res, { message: 'No autorizado' }, 401); // 401 Unauthorized
  }

  const match = await compare(clave, usuarioEncontrado.clave);

  if (!match) return jsonResponse(res, { message: 'No autorizado' }, 401);

  // Generar tokens
  const accessToken = jwt.sign(
    {
      infoUsuario: {
        email: usuarioEncontrado.email,
        rol: usuarioEncontrado.rol,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: EXPIRATION_TIME.ACCESS_TOKEN },
  );

  const refreshToken = jwt.sign(
    { email: usuarioEncontrado.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: EXPIRATION_TIME.REFRESH_TOKEN },
  );

  // crea cookie con refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // no se puede acceder desde el cliente
    secure: true, // solo se envia en https
    sameSite: 'None', // cross-site cookie
    maxAge: EXPIRATION_TIME.JWT,
  });

  // envia accessToken
  return jsonResponse(res, { accessToken }, 200);
};

/**
 * @desc    Refresh
 * @route   GET /auth/refresh
 * @access  Public - porque el token ha expirado
 */
const refresh = async (req, res) => {
  const { cookies } = req;

  if (!cookies?.jwt) return res.status(401).json({ message: 'No autorizado' });

  const refreshToken = cookies.jwt;

  // verifica que el token sea valido
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'No autorizado' });

      const foundUser = await User.findOne({ email: decoded.email }).exec();

      if (!foundUser) return res.status(401).json({ message: 'No autorizado' });

      // Generar tokens
      const accessToken = jwt.sign(
        {
          userInfo: {
            email: foundUser.email,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: EXPIRATION_TIME.ACCESS_TOKEN },
      );

      // envia accessToken
      res.status(200).json({ accessToken });
    },
  );
};

/**
 * @desc    Logout user
 * @route   POST /auth/logout
 * @access  Public - limpia la cookie si existe
 */
const logout = async (req, res) => {
  const { cookies } = req;

  if (!cookies?.jwt) return res.sendStatus(204); // no hay cookie

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(200).json({ message: 'Cookie eliminada' });
};

export { login, logout, refresh };
