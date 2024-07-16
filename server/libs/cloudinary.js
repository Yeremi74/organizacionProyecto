import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'de7xaokg0',
  api_key: '993251549941888',
  api_secret: 'yE9xCX9Zn-ASg5BCP13ljsB8B_U',
});

export const uploadImageProduct = async (filePath, folder) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: folder,
  });
};

export const deleteImageProduct = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
