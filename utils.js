import nodemailer from 'nodemailer';

// variables de entorno
const { NODEMAILER_EMAIL, NODEMAILER_API_KEY } = process.env;

/**
 * @desc    Enviar respuesta en formato json
 * @param   {Object} res
 * @param   {Object} json
 * @param   {Number} code
 * @returns {Object}
 */
export const jsonResponse = (res, json, code = 500) => res.status(code).json(json);

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
