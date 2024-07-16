import { deleteImageProduct, uploadImageProduct } from '../libs/cloudinary.js';
import Products from '../models/Products.js';
import fs from 'fs-extra';
const folder = 'products';

export const filterProductsByName = async (req, res) => {
  try {
    // Assuming you have a model for Products (replace with your actual model)
    console.log(req.params.name);
    const products = await Products.find({
      title: { $regex: new RegExp(req.params.name, 'i') },
    });

    res.send(products);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for proper handling
  }
};

export const Filters = async (req, res) => {
  try {
    const categoryName = req.params.cat;
    const collectionType = req.params.collec;

    let query = {};

    if (categoryName !== 'all') {
      query.category = categoryName;
    }

    if (collectionType !== 'all') {
      query.collectionType = collectionType;
    }

    const products = await Products.find(query)
      .sort({ price: Number(req.params.sort) })
      .sort({ category: 1 })
      .exec();

    res.send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getProductsCategory = async (req, res) => {
  try {
    const categoryName = req.params.cat;
    const products = await Products.find({ category: categoryName });
    res.send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const sumarProductQuantity = async (req, res) => {
  try {
    // Encuentra el producto por su ID
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verifica que req.params.number sea un número válido
    const numToAdd = parseInt(req.params.number);
    if (isNaN(numToAdd)) {
      return res
        .status(400)
        .json({ message: 'El número recibido no es válido' });
    }

    // Verifica que product.quantity sea un número antes de sumar
    if (typeof product.quantity !== 'number') {
      return res
        .status(500)
        .json({ message: 'Error en el tipo de dato de quantity' });
    }

    // Suma el número recibido al quantity actual del producto
    product.quantity += numToAdd; // Asegúrate de convertir el número a entero

    // Guarda el producto actualizado en la base de datos
    await product.save();
    console.log(product);
    return res.json(product); // Devuelve el producto actualizado como respuesta
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const restarProductQuantity = async (req, res) => {
  try {
    // Encuentra el producto por su ID
    const product = await Products.findById(req.params.id);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verifica que req.params.number sea un número válido
    const numToAdd = parseInt(req.params.number);
    if (isNaN(numToAdd)) {
      return res
        .status(400)
        .json({ message: 'El número recibido no es válido' });
    }

    // Verifica que product.quantity sea un número antes de sumar
    if (typeof product.quantity !== 'number') {
      return res
        .status(500)
        .json({ message: 'Error en el tipo de dato de quantity' });
    }

    // Suma el número recibido al quantity actual del producto
    product.quantity -= numToAdd; // Asegúrate de convertir el número a entero

    // Guarda el producto actualizado en la base de datos
    await product.save();

    return res.json(product); // Devuelve el producto actualizado como respuesta
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByName = async (req, res) => {
  try {
    const searchText = req.params.texto; // Cambia 'texto' por el nombre del parámetro que recibes en la ruta
    const products = await Products.find({
      title: { $regex: searchText, $options: 'i' },
    });
    res.send(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
export const createProducts = async (req, res) => {
  try {
    let image;
    let image2;
    let image3;
    let image4;
    let image5;

    if (req.files?.image) {
      const result = await uploadImageProduct(
        req.files.image.tempFilePath,
        folder
      );
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.files?.image2) {
      const result = await uploadImageProduct(
        req.files.image2.tempFilePath,
        folder
      );
      await fs.remove(req.files.image2.tempFilePath);
      image2 = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.files?.image3) {
      const result = await uploadImageProduct(
        req.files.image3.tempFilePath,
        folder
      );
      await fs.remove(req.files.image3.tempFilePath);
      image3 = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.files?.image4) {
      const result = await uploadImageProduct(
        req.files.image4.tempFilePath,
        folder
      );
      await fs.remove(req.files.image4.tempFilePath);
      image4 = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.files?.image5) {
      const result = await uploadImageProduct(
        req.files.image5.tempFilePath,
        folder
      );
      await fs.remove(req.files.image5.tempFilePath);
      image5 = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newProduct = new Products({
      ...req.body,
      image,
      image2,
      image3,
      image4,
      image5,
    });
    await newProduct.save();

    return res.json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    // TODO: validate req.body before to update
    const { id } = req.params;
    const productHola = await Products.findById(id);
    // if a new image is uploaded upload it to cloudinary

    if (productHola.image?.public_id && req.files?.image !== undefined) {
      await deleteImageProduct(productHola.image.public_id);
    }
    if (productHola.image2?.public_id && req.files?.image2 !== undefined) {
      await deleteImageProduct(productHola.image2.public_id);
    }
    if (productHola.image3?.public_id && req.files?.image3 !== undefined) {
      await deleteImageProduct(productHola.image3.public_id);
    }
    if (productHola.image4?.public_id && req.files?.image4 !== undefined) {
      await deleteImageProduct(productHola.image4.public_id);
    }
    if (productHola.image5?.public_id && req.files?.image5 !== undefined) {
      await deleteImageProduct(productHola.image5.public_id);
    }

    if (req.files?.image) {
      const result = await uploadImageProduct(
        req.files.image.tempFilePath,
        folder
      );
      await fs.remove(req.files.image.tempFilePath);
      // add the new image to the req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    if (req.files?.image2) {
      const result = await uploadImageProduct(
        req.files.image2.tempFilePath,
        folder
      );
      await fs.remove(req.files.image2.tempFilePath);
      // add the new image to the req.body
      req.body.image2 = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    if (req.files?.image3) {
      const result = await uploadImageProduct(
        req.files.image3.tempFilePath,
        folder
      );
      await fs.remove(req.files.image3.tempFilePath);
      // add the new image to the req.body
      req.body.image3 = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    if (req.files?.image4) {
      const result = await uploadImageProduct(
        req.files.image4.tempFilePath,
        folder
      );
      await fs.remove(req.files.image4.tempFilePath);
      // add the new image to the req.body
      req.body.image4 = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    if (req.files?.image5) {
      const result = await uploadImageProduct(
        req.files.image5.tempFilePath,
        folder
      );
      await fs.remove(req.files.image5.tempFilePath);
      // add the new image to the req.body
      req.body.image5 = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    var updatedProduct = await Products.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const productRemoved = await Products.findByIdAndDelete(req.params.id);
    if (!productRemoved) return res.sendStatus(404);

    if (
      productRemoved.image.public_id ||
      productRemoved.image2.public_id ||
      productRemoved.image3.public_id ||
      productRemoved.image4.public_id ||
      productRemoved.image5.public_id
    ) {
      await deleteImageProduct(productRemoved.image.public_id);
      await deleteImageProduct(productRemoved.image2.public_id);
      await deleteImageProduct(productRemoved.image3.public_id);
      await deleteImageProduct(productRemoved.image4.public_id);
      await deleteImageProduct(productRemoved.image5.public_id);
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUniqueProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) return res.sendStatus(404);
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
