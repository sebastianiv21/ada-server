import ResetToken from '#models/ResetToken.js';

const createResetToken = async (resetToken) => {
  await ResetToken.create(resetToken);
};

const deleteResetToken = async (id) => {
  await ResetToken.findByIdAndDelete(id);
};

export default {
  createResetToken,
  deleteResetToken,
};
