import User from '../models/User.model.js';

export const roleRequired = async (req, res, next) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  if (userFound.rol !== 'admin')
    return res.status(400).json({ message: 'User is not a admin' });

  req.user = userFound;

  next();
};
