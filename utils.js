exports.jsonResponse = (res, json, code = 500) => res.status(code).json(json);
