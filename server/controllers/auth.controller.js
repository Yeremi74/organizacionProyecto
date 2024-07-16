import User from '../models/User.model.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
  const { email, password, username, rol } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(['The email already exists']);

    const passwordHash = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      rol,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie('token', token, {
      sameSite: 'none', // Establece SameSite como None
      secure: true, // Debe establecerse como true si SameSite es None y estás usando HTTPS
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      rol: userSaved.rol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password, rol } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcryptjs.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: 'Incorrect password' });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token, {
      sameSite: 'none', // Establece SameSite como None
      secure: true, // Debe establecerse como true si SameSite es None y estás usando HTTPS
      // httpOnly: true, // Permite que la cookie solo sea accesible a través de HTTP
      // maxAge: 31536000, // Define la duración de la cookie en milisegundos (1 hora en este caso)
      // domain: 'example.com', // Especifica el dominio al que pertenece la cookie
      // path: '/', // Establece la ruta para la cual la cookie es válida
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      rol: userFound.rol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  console.log(req.user);
  if (req.user.username) {
    return res.json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
      rol: req.user.rol,
    });
  }

  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
    rol: userFound.rol,
  });
};

export const users = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(400).json({ message: 'User not found' });

    res.send(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  if (!token) return res.status(401).json({ message: 'Unauthorized 1' });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized2' });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: 'Unauthorized3' });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      rol: userFound.rol,
    });
  });
};

export const getUniqueUser = async (req, res) => {
  try {
    const product = await User.findById(req.params.id);
    if (!product) return res.sendStatus(404);
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, password, username, rol } = req.body;
    console.log(password);
    // const userFound = await User.findOne({ email });
    // if (userFound) return res.status(400).json(['The email already exists']);

    const passwordHash = await bcryptjs.hash(password, 10);
    console.log(passwordHash);

    const newUser = {
      username,
      email,
      password: passwordHash,
      rol,
    };

    const userUpdated = await User.findByIdAndUpdate(req.params.id, newUser, {
      new: true,
    });
    res.json(userUpdated);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const productRemoved = await User.findByIdAndDelete(req.params.id);
    if (!productRemoved) return res.json('ya eliminado');
    res.json('eliminado');
  } catch (error) {
    console.log(error);
  }
};
