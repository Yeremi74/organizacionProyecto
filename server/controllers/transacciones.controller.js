import Transacciones from '../models/Transaccion.model.js';

export const getTransacciones = async (req, res) => {
  try {
    const products = await Transacciones.find();
    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createTransacciones = async (req, res) => {
  try {
    const newTransaccion = new Transacciones({ ...req.body });
    await newTransaccion.save();

    return res.json(newTransaccion);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
