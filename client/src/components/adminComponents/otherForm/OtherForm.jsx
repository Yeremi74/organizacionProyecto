import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useEcommerceContext } from '../../../context/Context';
import { FaSpinner } from 'react-icons/fa6';
import '../productsForm/switch.css';

import Aside from '../Aside';
const OtherForm = () => {
  const params = useParams();
  const {
    createProduct,
    getUniqueProduct,
    updateProduct,
    getCategory,
    getCollections,
    getUser,
    updateUser,
    getUsers,
  } = useEcommerceContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: '',
    email: '',
    password: '',
    rol: '',
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
  });
  // console.log(product);
  useEffect(() => {
    (async () => {
      if (params.id === 'Users') {
        const user = await getUser(params.product);
        setProduct(user);
      } else if (params.product) {
        const product = await getUniqueProduct(params.id, params.product);
        setProduct(product.data);
      }
    })();
    getCategory();
    getCollections();
  }, [params.product, params.id]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      if (params.id == 'Users') {
        await updateUser(params.product, {
          ...product,
        });
      } else if (params.product) {
        await updateProduct(params.id, params.product, {
          ...product,
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

  return (
    <div className='flex capitalize '>
      <Aside />
      <div className='w-20 sm:w-16'></div>
      <div className='flex w-full pr-2 my-7 sm:pr-0'>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex flex-col items-center pl-2 text-black w-fullgap-3 dark:text-white'>
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
                  value={product.title || product.title || ''}
                  onChange={(e) => {
                    params.id
                      ? setProduct({ ...product, title: e.target.value })
                      : setProduct({ ...product, title: e.target.value });
                  }}
                  className='w-full h-10 p-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                />
              </div>
            </div>
            {params.id === 'Users' && (
              <div className='flex flex-col w-full gap-4 mb-4 sm:w-1/2'>
                <div className='flex flex-col w-full gap-4'>
                  <label htmlFor='email'>
                    Email
                    <span className='text-2xl font-bold text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={product.email || product.email || ''}
                    onChange={(e) => {
                      setProduct({ ...product, email: e.target.value });
                    }}
                    className='w-full h-10 p-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  />
                </div>
                <div className='flex flex-col w-full gap-4'>
                  <label htmlFor='password'>
                    Contraseña
                    <span className='text-2xl font-bold text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    name='password'
                    placeholder='Titulo'
                    value={product.password || product.password || ''}
                    onChange={(e) => {
                      setProduct({ ...product, password: e.target.value });
                    }}
                    className='w-full h-10 p-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  />
                </div>
                <div className='flex flex-col w-full gap-4'>
                  <label htmlFor='Rol'>
                    Rol
                    <span className='text-2xl font-bold text-red-500'>*</span>
                  </label>
                  <select
                    name='Rol'
                    value={product.rol}
                    onChange={(e) => {
                      // const selectedRole =
                      //   e.target.value === 'usuario' ? '' : 'admin';
                      setProduct({ ...product, rol: e.target.value });
                    }}
                    className='w-full h-10 px-3 text-black border border-gray-400 border-solid rounded-lg dark:text-white'
                  >
                    <option value='admin'>Admin</option>
                    <option value=''>Usuario</option>
                  </select>
                </div>
              </div>
            )}

            {params.id !== 'Users' && (
              <div className='flex flex-wrap items-center justify-center w-full gap-4 px-2 py-6 m-auto my-10 rounded sm:w-1/2'>
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
                    <img src={product.previewUrl} alt='' className='w-full' />
                  ) : (
                    <img src={product.image?.url} alt='' className='w-full' />
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`my-0 m-auto  block p-3 rounded-md hover:dark:bg-gray-900 transition-all disabled:cursor-not-allowed bg-gray_custom-200 text-white hover:bg-gray_custom-300
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
  );
};

export default OtherForm;
