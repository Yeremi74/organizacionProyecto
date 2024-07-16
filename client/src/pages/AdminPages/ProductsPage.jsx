import { useEffect, useState } from 'react';
import { useEcommerceContext } from '../../context/Context';
import { Link, useParams } from 'react-router-dom';
import TablePanelAdmin from '../../components/adminComponents/TablePanelAdmin/TablePanelAdmin';

import Aside from '../../components/adminComponents/Aside';
import Chart from './Chart';
import { getProductsbySearchRequest } from '../../api/products';
const ProductsPage = () => {
  const params = useParams();
  const [categoryOption, setCategory] = useState('all');
  const [collection, setCollection] = useState('all');
  const [sort, setSort] = useState(-1);
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [reload, setReload] = useState(false);
  const {
    getCollections,
    getCategory,
    filterProduct,
    getUsers,
    estado,
    setEstado,
    getProducts,
  } = useEcommerceContext();

  // console.log(dataContext[params.id.toLowerCase()]);
  useEffect(() => {
    const asyncFunc = async () => {
      if (params.id === 'products') {
        const res = await filterProduct(categoryOption, collection, sort);
        setData(res);
      }

      if (params.id === 'Collections') {
        const res = await getCollections();
        setData(res);

        return;
      }

      if (params.id === 'Category') {
        const res = await getCategory();
        setData(res);
        return;
      }
      if (params.id === 'Users') {
        const res = await getUsers();
        setData(res);
        return;
      }
    };

    asyncFunc();
  }, [params.id, params, categoryOption, collection, sort]);
  useEffect(() => {
    const hola = async () => {
      if (params.id === 'products') {
        const res = await filterProduct(categoryOption, collection, sort);
        setData(res);
      }

      if (params.id === 'Collections') {
        const res = await getCollections();
        setData(res);

        return;
      }

      if (params.id === 'Category') {
        const res = await getCategory();
        setData(res);
        return;
      }
    };
    hola();
  }, [estado]);

  if (params.id === 'graficos')
    return (
      <div className='flex'>
        <Aside />
        <div className='flex w-full'>
          <div className='w-20 sm:w-16'></div>
          <div className='w-full p-2 m-auto my-0 text-black rounded-md dark:text-white sm:p-6 '>
            <h1>
              <Chart />
            </h1>
          </div>
        </div>
      </div>
    );
  return (
    <div className='flex'>
      <Aside />
      <div className='flex w-full'>
        <div className='w-20 sm:w-16'></div>
        <div className='w-full p-2 m-auto my-0 text-black rounded-md dark:text-white sm:p-6 '>
          <header className='flex items-center justify-between p-5 rounded '>
            <Link
              to={`/admin/create/${params.id}`}
              className='p-2 text-2xl font-bold bg-gray-200 rounded-md hover:bg-gray-300'
            >
              Crear{' '}
              {params.id == 'products'
                ? 'Producto'
                : params.id == 'Category'
                ? 'Categoria'
                : params.id == 'Collections'
                ? 'Colecciones'
                : ''}
            </Link>
            <div className='flex gap-2'>
              <input
                type='text'
                className='p-2 bg-gray-300 rounded outline-none'
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button
                className='p-2 text-white bg-gray-500 rounded'
                onClick={async () => {
                  if (busqueda !== '') {
                    const res = await getProductsbySearchRequest(busqueda);
                    setData(res.data);
                  } else {
                    const res = await getProducts();
                    setData(res);
                    console.log(res);
                  }
                }}
              >
                Buscar
              </button>
            </div>
          </header>

          <TablePanelAdmin
            setReload={setReload}
            data={data}
            setCategory={setCategory}
            setCollection={setCollection}
            setSort={setSort}
            params={params.id}
            sort={sort}
            setEstado={setEstado}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
