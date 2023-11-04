export const jsonResponse = (res, json, code = 500) => {
  return res.status(code).json(json);
};
