import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import usuarioServices from '#services/usuarioServices.js';
import resetTokenServices from '#services/resetTokenServices.js';
import { jsonResponse, sendEmail } from '#utils';

// variables de entorno
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  PASSWORD_CHANGE_TOKEN_SECRET,
  NODEMAILER_EMAIL,
  PORT,
} = process.env;

// tiempo de expiracion de los tokens
const EXPIRATION_TIME = Object.freeze({
  ACCESS_TOKEN: '1m',
  REFRESH_TOKEN: '1d',
  PASSWORD_CHANGE_TOKEN: '1h',
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
        id: usuarioEncontrado._id,
      },
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: EXPIRATION_TIME.ACCESS_TOKEN },
  );

  const refreshToken = jwt.sign(
    { email: usuarioEncontrado.email },
    REFRESH_TOKEN_SECRET,
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

  if (!cookies?.jwt) {
    return jsonResponse(res, { message: 'No autorizado' }, 401);
  }

  const refreshToken = cookies.jwt;

  // verifica que el token sea valido
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return jsonResponse(res, { message: 'No autorizado' }, 403);

    const usuarioEncontrado = await usuarioServices.findUsuarioPorEmail(
      decoded.email,
    );

    if (!usuarioEncontrado) {
      return jsonResponse(res, { message: 'No autorizado' }, 401);
    }

    // Generar tokens
    const accessToken = jwt.sign(
      {
        infoUsuario: {
          email: usuarioEncontrado.email,
          rol: usuarioEncontrado.rol,
          id: usuarioEncontrado._id,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: EXPIRATION_TIME.ACCESS_TOKEN },
    );

    // envia accessToken
    return jsonResponse(res, { accessToken }, 200);
  });
};

/**
 * @desc    Logout user
 * @route   POST /auth/logout
 * @access  Public - limpia la cookie si existe
 */
const logout = async (req, res) => {
  const { cookies } = req;

  if (!cookies?.jwt) {
    return jsonResponse(res, { message: 'No hay cookie' }, 204); // no hay cookie
  }

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  return jsonResponse(res, { message: 'Cookie eliminada' }, 200);
};

/**
 * @desc    Enviar correo de recuperación de contraseña
 * @route   POST /auth/recuperar-clave
 * @access  Public
 * @param   {string} email
 * @returns {json} { message: string }
 * @returns {json} { message: string, error: string }
 */
const recuperarClave = async (req, res) => {
  const { email } = req.body;

  const usuarioEncontrado = await usuarioServices.findUsuarioPorEmail(email);

  if (!usuarioEncontrado) {
    return jsonResponse(
      res,
      {
        message: 'No hay un usuario registrado con este email',
      },
      404,
    );
  }

  // Generar token de cambio de contraseña
  const token = jwt.sign(
    { idUsuario: usuarioEncontrado._id },
    PASSWORD_CHANGE_TOKEN_SECRET,
    {
      expiresIn: EXPIRATION_TIME.PASSWORD_CHANGE_TOKEN,
    },
  );

  // Guardar token en la base de datos
  const nuevoResetToken = {
    usuario: usuarioEncontrado._id.toString(),
    token: token.toString(),
  };

  await resetTokenServices.createResetToken(nuevoResetToken);

  // Enviar correo
  const dominio = PORT ? `localhost:${PORT}` : 'adahealthlabs.com';

  const url = `https://${dominio}/recuperar-clave/${token}`;

  const emailMessage = `
    <h1>Recuperación de contraseña</h1>
    <p>Para cambiar tu contraseña, haz click <a href="${url}">aquí</a></p>
  `;

  const emailConfig = {
    to: email,
    subject: 'Recuperación de contraseña',
    message: emailMessage,
  };

  const emailInfo = await sendEmail(emailConfig);

  if (!emailInfo) {
    return jsonResponse(
      res,
      {
        message: 'Error al enviar el correo',
      },
      500,
    );
  }

  console.log('Email enviado:', emailInfo.messageId);

  return jsonResponse(res, { message: 'Correo de recuperación enviado' }, 200);
};

export { login, logout, recuperarClave, refresh };
