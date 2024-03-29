import nodemailer from 'nodemailer';
import 'dotenv/config';

// variables de entorno
const { NODEMAILER_EMAIL, NODEMAILER_API_KEY } = process.env;

/**
 * @desc    Enviar respuesta en formato json
 * @param   {Object} res
 * @param   {Object} json
 * @param   {Number} code
 * @returns {Object}
 */
export const jsonResponse = (res, json, code = 500) =>
  res.status(code).json(json);

/**
 * @desc    Enviar email
 * @param   {Object} emailConfig
 * @param   {String} emailConfig.to
 * @param   {String} emailConfig.subject
 * @param   {String} emailConfig.message
 * @returns {Promise}
 */
export const sendEmail = async (emailConfig) => {
  // nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_API_KEY,
    },
  });

  // configuracion del email
  const mailOptions = {
    from: NODEMAILER_EMAIL,
    to: emailConfig.to,
    subject: `ADA HEALTH LABS 🫁 - ${emailConfig.subject}`,
    html: emailConfig.message,
  };

  // enviar email
  const emailInfo = await transporter.sendMail(mailOptions);

  return emailInfo;
};

/**
 * @desc    Paginación
 * @param   {Number} page
 * @param   {Number} pageSize
 * @returns {Object}
 */
export const getPaginationValues = (page, pageSize) => {
  const skip = (page - 1) * pageSize;

  return { skip, limit: pageSize };
};

/**
 * @desc    Obtener items paginados
 * @param   {Number} page
 * @param   {Number} pageSize
 * @param   {Function} findItems
 * @param   {Function} countItems
 * @returns {Object}
 */
export const getPaginatedItems = async ({
  page,
  pageSize,
  findItems,
  countItems,
  filter = {},
}) => {
  const { skip, limit } = getPaginationValues(page, pageSize);

  // Trae los items
  const items = await findItems(skip, limit, filter);

  // cuenta los items
  const totalItems = await countItems();

  // calcula el total de páginas
  const totalPages = Math.ceil(totalItems / limit);

  const currentPage = page;

  return {
    data: items,
    totalItems,
    totalPages,
    currentPage,
  };
};
