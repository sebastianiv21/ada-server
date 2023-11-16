import ResetToken from '#models/ResetToken.js';

const createResetToken = async (resetToken) => {
  await ResetToken.create(resetToken);
};

const findResetToken = async (token) => {
  const resetToken = await ResetToken.findOne({ token });

  return resetToken;
};

const deleteResetToken = async (id) => {
  await ResetToken.findByIdAndDelete(id);
};

export default {
  createResetToken,
  findResetToken,
  deleteResetToken,
};
