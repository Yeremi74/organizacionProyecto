import axios from 'axios';

// !GET

export const getSearchProductRequest = async (searchText) => {
  return await axios.get(
    `https://organizacionproyecto.onrender.com/api/products/catalog/${searchText}`
  );
};

export const getProductsRequest = async () =>
  await axios.get(`https://organizacionproyecto.onrender.com/api/products`);

export const getProductsbySearchRequest = async (text) => {
  console.log(text);
  return await axios.get(
    `https://organizacionproyecto.onrender.com/api/products/search/${text}`
  );
};

// !DELETE
export const deleteRequest = async (params, id) => {
  console.log(`https://organizacionproyecto.onrender.com/api/${params}/${id}`);
  await axios.delete(
    `https://organizacionproyecto.onrender.com/api/${params}/${id}`
  );
};

// !GET
export const getUniqueProductRequest = async (params, id) =>
  await axios.get(
    `https://organizacionproyecto.onrender.com/api/${params.toLowerCase()}/${id}`
  );

// !POST
export const createRequest = async (product, id) => {
  console.log(product);
  console.log(product.quantity);
  const form = new FormData();

  for (let key in product) {
    console.log(product[key]);
    form.append(key, product[key]);
  }

  return await axios.post(
    `https://organizacionproyecto.onrender.com/api/${id}`,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const filterRequest = async (cat, collec, sort) => {
  return await axios.get(
    `https://organizacionproyecto.onrender.com/api/products/${cat}/${collec}/${sort}`
  );
};

// ! PUT
export const sumarRequest = async (number, id) => {
  return await axios.put(
    `https://organizacionproyecto.onrender.com/api/products/sumar/${number}/${id}`
  );
};
export const restarRequest = async (number, id) => {
  return await axios.put(
    `https://organizacionproyecto.onrender.com/api/products/restar/${number}/${id}`
  );
};

export const updateProductRequest = async (params, id, newFields) => {
  const form2 = new FormData();
  for (let key in newFields) {
    if (
      key === 'image' ||
      key === 'image2' ||
      key === 'image3' ||
      key === 'image4' ||
      key === 'image5'
    ) {
      if (
        newFields[key] !== null &&
        newFields[key] !== undefined &&
        newFields[key] !== '' &&
        newFields[key].toString() !== '[object Object]'
      ) {
        form2.append(key, newFields[key]);
      }
    } else {
      form2.append(key, newFields[key]);
    }
  }
  return await axios.put(
    `https://organizacionproyecto.onrender.com/api/${params}/${id}`,
    form2,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
