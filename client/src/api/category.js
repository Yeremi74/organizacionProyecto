import axios from 'axios';
export const getCategoryRequest = async () =>
  await axios.get(`http://localhost:3001/api/category`);

export const createRequest = async (product) => {
  console.log(product);
  // console.log(product.quantity);
  const form = new FormData();

  for (let key in product) {
    console.log(product[key]);
    form.append(key, product[key]);
  }

  return await axios.post(`http://localhost:3001/api/category`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
