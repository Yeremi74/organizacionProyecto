import { useEffect, useState } from 'react';
import Aside from '../../components/adminComponents/Aside';
import { useEcommerceContext } from '../../context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlusCircle, FaShoppingCart } from 'react-icons/fa';
import { restarRequest, sumarRequest } from '../../api/products';
import { createRequest } from '../../api/transacciones';
const Purchase = () => {
  const params = useParams();
  const navigate = useNavigate();

  console.log(params);

  const [signo, setSigno] = useState('entrada');
  const [quantity, setQuantity] = useState(0);

  const [transaccion, setTransaccion] = useState({
    product: '',
    description: '',
    empresa: '',
    type: 'entrada',
    quantity: 0,
    price: 0,
  });

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

  const { getUniqueProduct, getCategory, getCollections } =
    useEcommerceContext();

  useEffect(() => {
    (async () => {
      if (params.product) {
        const product = await getUniqueProduct(params.id, params.product);
        setProduct(product.data);
        console.log(product.data);
        setTransaccion((prevState) => ({
          ...prevState,
          product: product.data.title,
        }));
      }
    })();
    getCategory();
    getCollections();
  }, [params.product, params.id]);

  const handleSubmit = async () => {
    if (signo === 'entrada') {
      console.log(transaccion.quantity);
      console.log('entrada');
      await sumarRequest(transaccion.quantity, params.product);
      //   const product = await getUniqueProduct(params.id, params.product);
      //   setProduct(product.data);
    }
    if (signo === 'salida') {
      console.log('salida');
      await restarRequest(transaccion.quantity, params.product);
      //   const product = await getUniqueProduct(params.id, params.product);
      //   setProduct(product.data);
    }
    await createRequest(transaccion);
    navigate(`/admin/products`);
  };

  return (
    <div>
      <div className='flex capitalize '>
        <Aside />
        <div className='flex w-full'>
          <div className='w-20 sm:w-16'></div>
          <div className='flex items-center justify-center w-full h-screen gap-4 p-2 m-auto my-0 text-black rounded-md dark:text-white sm:p-6'>
            <div className='flex flex-col items-center justify-between gap-5 p-10 px-20 bg-gray-200 rounded w-96'>
              <div className='flex flex-col items-center gap-4'>
                {product.title}
                <img src={product.image?.url} alt='' className='w-16' />
                <p>Estas realizando una: {transaccion.type}</p>
                <div className='flex gap-4'>
                  <FaPlusCircle
                    onClick={() => {
                      setSigno('entrada');
                      setTransaccion((prevState) => ({
                        ...prevState,
                        type: 'entrada',
                      }));
                    }}
                    className='w-10 h-10 p-2 text-green-900 bg-green-400 rounded-sm cursor-pointer'
                  />
                  <FaShoppingCart
                    onClick={() => {
                      setSigno('salida');
                      setTransaccion((prevState) => ({
                        ...prevState,
                        type: 'salida',
                      }));
                    }}
                    className='w-10 h-10 p-2 text-red-900 bg-red-400 rounded-sm cursor-pointer'
                  />
                </div>
                Cantidad del Producto: {product.quantity}
                <input
                  type='text'
                  className='w-full bg-gray-300'
                  placeholder='Nombre del Cliente/Empresa'
                  onChange={(e) => {
                    setTransaccion((prevState) => ({
                      ...prevState,
                      empresa: e.target.value,
                    }));
                  }}
                />
                <textarea
                  className='w-full bg-gray-300'
                  name=''
                  id=''
                  placeholder='Descripcion'
                  onChange={(e) => {
                    setTransaccion((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }));
                  }}
                ></textarea>
                <input
                  type='number'
                  className='w-full bg-gray-300'
                  placeholder='Precio'
                  value={product.price}
                  onChange={(e) => {
                    setTransaccion((prevState) => ({
                      ...prevState,
                      price: e.target.value,
                    }));
                    setProduct((prevState) => ({
                      ...prevState,
                      price: e.target.value,
                    }));
                  }}
                />
                <input
                  type='number'
                  className='w-full bg-gray-300'
                  placeholder='Cantidad'
                  onChange={(e) => {
                    setTransaccion((prevState) => ({
                      ...prevState,
                      quantity: e.target.value,
                    }));
                  }}
                />
                <button onClick={handleSubmit}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
