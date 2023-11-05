import { jsonResponse } from '#utils';

const validAdmin = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return jsonResponse(res, { message: error.message }, 400); // 400 Bad Request
  }
};

export default { validAdmin };
