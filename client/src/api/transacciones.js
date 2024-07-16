import axios from 'axios';

export const getTransaccionesRequest = async () => {
  return await axios.get(
    `https://organizacionproyecto.onrender.com/api/transacciones`
  );
};
export const createRequest = async (product) => {
  console.log(product);
  // console.log(product.quantity);
  const form = new FormData();

  for (let key in product) {
    console.log(product[key]);
    form.append(key, product[key]);
  }

  return await axios.post(
    `https://organizacionproyecto.onrender.com/api/transacciones`,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
