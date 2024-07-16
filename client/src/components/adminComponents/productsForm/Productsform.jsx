import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { useEcommerceContext } from '../../../context/Context';
import './switch.css';

import Aside from '../Aside';

const ProductsForm = () => {
  const params = useParams();
  const {
    createProduct,
    getUniqueProduct,
    updateProduct,
    getCategory,
    category,
    collections,
    getCollections,
    setEstado,
  } = useEcommerceContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    sizes: [],
    category: '',
    price: 0,
    oldprice: 0,
    available: true,
    collectionType: '',
    type: '',
    image: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    quantity: 0,
  });
  // console.log(product);
  useEffect(() => {
    (async () => {
      if (params.product) {
        const product = await getUniqueProduct(params.id, params.product);
        setProduct(product.data);
      }
    })();
    getCategory();
    getCollections();
  }, [params.product, params.id]);
  // console.log(product.sizes);
  const sizesJoined = product.sizes.flatMap((size) => size.split(','));
  // console.log(sizesJoined);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      if (params.product) {
        await updateProduct(params.id, params.product, {
          ...product,
          sizes: sizesJoined,
        });
      } else {
        createProduct(product, params.id);
      }

      navigate(`/admin/${params.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(sizesJoined); // Resultado: 's,xl,xs,m,l'
  const sizesCovertes = product.sizes.join(',');
  // console.log(sizesCovertes.split(','));
  // console.log(sizesCovertes.split(',').filter((size) => size !== 's'));
  const handleOptionChange = () => {
    if (product.available) return setProduct({ ...product, available: false });
    setProduct({ ...product, available: true });
  };

  return (
    <div>
      <div className='flex capitalize '>
        <Aside />
        <div className='w-20 sm:w-16'></div>
        <div className='flex w-full pr-2 my-7 sm:pr-0'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center w-full gap-3 pl-2 text-black dark:text-white'>
              <div className='flex w-full sm:w-1/2'>
                <div className='flex flex-col w-full gap-4'>
                  <label htmlFor='title'>
                    Titulo
                    <span className='text-2xl font-bold text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    name='title'
                    placeholder='Titulo'
                    value={product.title || ''}
                    onChange={(e) => {
                      setProduct({ ...product, title: e.target.value });
                    }}
                    className='w-full h-10 p-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  />
                </div>
              </div>

              {/* <div className='flex w-full sm:w-1/2'> */}
              {/* <div className='flex flex-col w-full gap-4'>
                  <p>
                    <span>Tallas:</span>
                  </p>

                  <div className='flex flex-wrap w-full gap-4 sm:justify-start'>
                    <div className='flex flex-col gap-3 sm:flex-row'>
                      <label className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          className='w-7 h-7'
                          name='xs'
                          checked={
                            params.product
                              ? sizesCovertes
                                  .toLowerCase()
                                  .split(',')
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('xs')
                              : product.sizes
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('xs')
                          }
                          onChange={(e) => {
                            const { name, checked } = e.target;
                            if (checked) {
                              if (!sizesCovertes.split(',').includes(name)) {
                                setProduct({
                                  ...product,
                                  sizes: [...product.sizes, name],
                                });
                              }
                            } else {
                              setProduct({
                                ...product,
                                sizes: sizesCovertes
                                  .split(',')
                                  .filter((size) => size !== name),
                              });
                            }
                          }}
                        />
                        <span>xs</span>
                      </label>
                      <label className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          className='w-7 h-7'
                          name='s'
                          checked={
                            params.product
                              ? sizesCovertes
                                  .toLowerCase()
                                  .split(',')
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('s')
                              : product.sizes
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('s')
                          }
                          onChange={(e) => {
                            const { name, checked } = e.target;
                            if (checked) {
                              if (!sizesCovertes.split(',').includes(name)) {
                                setProduct({
                                  ...product,
                                  sizes: [...product.sizes, name],
                                });
                              }
                            } else {
                              setProduct({
                                ...product,
                                sizes: sizesCovertes
                                  .split(',')
                                  .filter((size) => size !== name),
                              });
                            }
                          }}
                        />
                        <span>s</span>
                      </label>
                      <label className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          className='w-7 h-7'
                          name='m'
                          checked={
                            params.product
                              ? sizesCovertes
                                  .toLowerCase()
                                  .split(',')
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('m')
                              : product.sizes
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('m')
                          }
                          onChange={(e) => {
                            const { name, checked } = e.target;
                            if (checked) {
                              if (!sizesCovertes.split(',').includes(name)) {
                                setProduct({
                                  ...product,
                                  sizes: [...product.sizes, name],
                                });
                              }
                            } else {
                              setProduct({
                                ...product,
                                sizes: sizesCovertes
                                  .split(',')
                                  .filter((size) => size !== name),
                              });
                            }
                          }}
                        />
                        <span>m</span>
                      </label>
                    </div>
                    <div className='flex flex-col gap-3 sm:flex-row'>
                      <label className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          className='w-7 h-7'
                          name='l'
                          checked={
                            params.product
                              ? sizesCovertes
                                  .toLowerCase()
                                  .split(',')
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('l')
                              : product.sizes
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('l')
                          }
                          onChange={(e) => {
                            const { name, checked } = e.target;
                            if (checked) {
                              if (!sizesCovertes.split(',').includes(name)) {
                                setProduct({
                                  ...product,
                                  sizes: [...product.sizes, name],
                                });
                              }
                            } else {
                              setProduct({
                                ...product,
                                sizes: sizesCovertes
                                  .split(',')
                                  .filter((size) => size !== name),
                              });
                            }
                          }}
                        />
                        <span>l</span>
                      </label>
                      <label className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          className='w-7 h-7'
                          name='xl'
                          checked={
                            params.product
                              ? sizesCovertes
                                  .toLowerCase()
                                  .split(',')
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('xl')
                              : product.sizes
                                  .map((size) => size.trim()) // Aplica trim() a cada elemento del arreglo
                                  .includes('xl')
                          }
                          onChange={(e) => {
                            const { name, checked } = e.target;
                            if (checked) {
                              if (!sizesCovertes.split(',').includes(name)) {
                                setProduct({
                                  ...product,
                                  sizes: [...product.sizes, name],
                                });
                              }
                            } else {
                              setProduct({
                                ...product,
                                sizes: sizesCovertes
                                  .split(',')
                                  .filter((size) => size !== name),
                              });
                            }
                          }}
                        />
                        <span>xl</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className='flex w-full gap-4 sm:w-1/2'>
                <div className='flex flex-col w-full gap-4 '>
                  <label htmlFor='category'>Categorias</label>
                  <select
                    name='category'
                    value={product.category || ''}
                    onChange={(e) =>
                      setProduct({ ...product, category: e.target.value })
                    }
                    className='w-full h-10 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  >
                    <option value='' disabled>
                      Selecciona una categoria
                    </option>
                    {category.map((category) => (
                      <option value={category.title} key={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className='flex flex-col w-full gap-4'>
                  <label htmlFor='collectionType'>Coleccion</label>
                  <select
                    name='collectionType'
                    value={product.collectionType || ''}
                    onChange={(e) =>
                      setProduct({ ...product, collectionType: e.target.value })
                    }
                    className='w-full h-10 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  >
                    <option value='' disabled>
                      Selecciona una coleccion
                    </option>
                    {collections.map((collection) => (
                      <option value={collection.title} key={collection._id}>
                        {collection.title}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>
              <div className='flex flex-col w-full gap-4 sm:w-1/2'>
                <label htmlFor='available'>Disponible</label>
                <div className='checkbox-wrapper-51'>
                  <input
                    id='cbx-51'
                    type='checkbox'
                    checked={product.available}
                    onChange={handleOptionChange}
                  />
                  <label className='toggle' htmlFor='cbx-51'>
                    <span>
                      <svg viewBox='0 0 10 10' height='10px' width='10px'>
                        <path d='M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z'></path>
                      </svg>
                    </span>
                  </label>
                </div>
                <div className='flex flex-col w-full gap-4'>
                  <label htmlFor='quantity'>Inventario Inicial</label>
                  <input
                    type='number'
                    name='quantity'
                    placeholder='Cantidad'
                    value={product.quantity}
                    onChange={(e) =>
                      setProduct({ ...product, quantity: e.target.value })
                    }
                    className='w-full h-10 p-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  />
                </div>
              </div>
              {/* <div>
              <label htmlFor='type'>tipo</label>
              <select
                name='type'
                value={product.type || ''}
                onChange={(e) =>
                  setProduct({ ...product, type: e.target.value })
                }
              >
                <option value=''>Seleccione una opción</option>
                <option value='Option 1'>Option 1</option>
                <option value='Option 2'>Option 2</option>
                <option value='Option 3'>Option 3</option>
              </select>
            </div> */}
              <div className='flex w-full gap-4 sm:w-1/2'>
                <div className='flex flex-col w-full gap-4'>
                  <label htmlFor='price'>Precio</label>
                  <input
                    type='number'
                    name='price'
                    placeholder='Precio actual'
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    className='w-full h-10 p-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  />
                </div>
                {/* <div className='flex flex-col w-full gap-4 '>
                  <label htmlFor='oldprice'>Precio antiguo</label>
                  <input
                    type='number'
                    name='oldprice'
                    placeholder='Precio antiguo'
                    value={product.oldprice || 0}
                    onChange={(e) =>
                      setProduct({ ...product, oldprice: e.target.value })
                    }
                    className='w-full h-10 p-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  />
                </div> */}
              </div>
              <div className='flex w-full sm:w-1/2'>
                <div className='flex flex-col w-full gap-4'>
                  <label htmlFor='description'>Descripcion</label>
                  <textarea
                    name='description'
                    value={product.description || ''}
                    placeholder='Descripcion'
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                    rows={6}
                    className='w-full p-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-wrap items-center justify-center w-full gap-4 py-6 m-auto my-10 rounded sm:w-1/2'>
              <div className='flex flex-col gap-3 p-2 overflow-hidden text-white rounded-lg sm:w-2/5'>
                <input
                  type='file'
                  className='w-full'
                  name='image'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setProduct({
                          ...product,
                          image: file,
                          previewUrl: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {product.previewUrl ? (
                  <img src={product.previewUrl} alt='' className='h-72' />
                ) : (
                  <img src={product.image?.url} alt='' className='h-72' />
                )}
              </div>
              <div className='flex flex-col gap-3 p-2 overflow-hidden text-white rounded-lg sm:w-2/5'>
                <input
                  type='file'
                  className='w-full '
                  name='image'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setProduct({
                          ...product,
                          image2: file,
                          previewUrl2: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {product.previewUrl2 ? (
                  <img src={product.previewUrl2} alt='' className='h-72' />
                ) : (
                  <img src={product.image2?.url} alt='' className='h-72' />
                )}
              </div>
              <div className='flex flex-col gap-3 p-2 overflow-hidden text-white rounded-lg sm:w-2/5'>
                <input
                  type='file'
                  className='w-full '
                  name='image'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setProduct({
                          ...product,
                          image3: file,
                          previewUrl3: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {product.previewUrl3 ? (
                  <img src={product.previewUrl3} alt='' className='h-72' />
                ) : (
                  <img src={product.image3?.url} alt='' className='h-72' />
                )}
              </div>
              <div className='flex flex-col gap-3 p-2 overflow-hidden text-white rounded-lg sm:w-2/5'>
                <input
                  type='file'
                  className='w-full '
                  name='image'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setProduct({
                          ...product,
                          image4: file,
                          previewUrl4: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {product.previewUrl4 ? (
                  <img src={product.previewUrl4} alt='' className='h-72' />
                ) : (
                  <img src={product.image4?.url} alt='' className='h-72' />
                )}
              </div>
              <div className='flex flex-col gap-3 p-2 overflow-hidden text-white rounded-lg sm:w-2/5'>
                <input
                  type='file'
                  className='w-full '
                  name='image'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setProduct({
                          ...product,
                          image5: file,
                          previewUrl5: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {product.previewUrl5 ? (
                  <img src={product.previewUrl5} alt='' className='h-72' />
                ) : (
                  <img src={product.image5?.url} alt='' className='h-72' />
                )}
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              onClick={() => {
                setEstado(true);
                setTimeout(() => {
                  setEstado(false);
                }, 1000);
              }}
              className={`my-0 m-auto block p-3 rounded-md hover:dark:bg-gray-900 transition-all disabled:cursor-not-allowed bg-gray_custom-200 text-white hover:bg-gray_custom-300
                `}
            >
              {loading ? (
                <FaSpinner className={loading ? 'rotate-animation' : ''} />
              ) : (
                'Guardar'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsForm;
