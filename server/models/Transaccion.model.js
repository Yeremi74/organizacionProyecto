import mongoose from 'mongoose';

const transaccionSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    empresa: {
      type: String,
    },
    type: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Transaccion', transaccionSchema);

/*
producto
descripcion
empresa
cantidad
precio
tipo
*/
