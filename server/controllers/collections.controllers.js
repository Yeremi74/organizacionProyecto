// // import { deleteImageProduct, uploadImageProduct } from '../libs/cloudinary.js';
import Collection from '../models/Collection.js';
// import fs from 'fs-extra';
const folder = 'collection';
export const getCollections = async (req, res) => {
  try {
    const collection = await Collection.find();
    res.send(collection);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createCollections = async (req, res) => {
  try {
    let image;
    if (req.files?.image) {
      // const result = await uploadImageProduct(
      //   req.files.image.tempFilePath,
      //   folder
      // );
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newCollection = new Collection({ ...req.body, image });
    await newCollection.save();

    return res.json(newCollection);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateCollections = async (req, res) => {
  try {
    const { id } = req.params;
    const productHola = await Collection.findById(id);
    if (productHola.image?.public_id && req.files?.image !== undefined) {
      // await deleteImageProduct(productHola.image.public_id);
    }

    if (req.files?.image) {
      // const result = await uploadImageProduct(
      //   req.files.image.tempFilePath,
      //   folder
      // );
      await fs.remove(req.files.image.tempFilePath);
      // add the new image to the req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    var updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedCollection);
    // return res.json(updatedProduct);
    // con el new: true hago que retorne el nuevo objeto
    // const updatedCollection = await Collection.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {
    //     new: true,
    //   }
    // );
    // await fs.remove(req.files.image.tempFilePath);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCollections = async (req, res) => {
  try {
    const collectionRemoved = await Collection.findByIdAndDelete(req.params.id);
    if (!collectionRemoved) return res.sendStatus(404);
    if (collectionRemoved.image.public_id) {
      // await deleteImageProduct(collectionRemoved.image.public_id);
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUniqueCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.sendStatus(404);
    return res.json(collection);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
