import { model, Schema } from 'mongoose';

const resetTokenSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('ResetToken', resetTokenSchema);
