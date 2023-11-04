const getParam = async (model, skip = 0, limit = 0) => {
  const param = await model.find().skip(skip).limit(limit);
  return param;
};

export default getParam;
