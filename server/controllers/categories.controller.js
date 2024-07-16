import { deleteImageProduct, uploadImageProduct } from '../libs/cloudinary.js';
// import Category from '../models/category.js';
import Category from '../models/Category.js';
import fs from 'fs-extra';
const folder = 'categories';
export const getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createCategories = async (req, res) => {
  try {
    let image;

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
    const newCategory = new Category({ ...req.body, image });
    await newCategory.save();

    return res.json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const productHola = await Category.findById(id);
    if (productHola.image?.public_id && req.files?.image !== undefined) {
      await deleteImageProduct(productHola.image.public_id);
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

    var updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedCategory);
    // con el new: true hago que retorne el nuevo objeto
    // const updatedCategory = await Category.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {
    //     new: true,
    //   }
    // );
    // await fs.remove(req.files.image.tempFilePath);
    // return res.send(updatedCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const categoryRemoved = await Category.findByIdAndDelete(req.params.id);
    if (!categoryRemoved) return res.sendStatus(404);
    if (categoryRemoved.image.public_id) {
      await deleteImageProduct(categoryRemoved.image.public_id);
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUniqueCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.sendStatus(404);
    return res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
