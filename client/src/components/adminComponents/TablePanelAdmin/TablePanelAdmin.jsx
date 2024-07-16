import PropTypes from 'prop-types';
import './TablePanelAdmin.css';
import { useEffect, useState } from 'react';
import Row from '../row/Row';
import { useEcommerceContext } from '../../../context/Context';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const TablePanelAdmin = ({
  data,
  setCategory,
  setCollection,
  sort,
  setSort,
  params,
  setReload,
}) => {
  const [opened, setOpened] = useState('');

  const {
    // products,
    // getProducts,
    collections,
    getCollections,
    category,
    getCategory,
    // filterProduct,
  } = useEcommerceContext();

  useEffect(() => {
    getCategory();
    getCollections();
  }, []);
  // console.log(data[0]);
  // console.log(collection);

  const handlePrice = () => {
    console.log(sort);
    if (sort === -1) {
      setSort(1);
      return;
    }
    setSort(-1);
  };

  return (
    <div className='min-h-screen'>
      <table className='w-full'>
        <thead className='h-16'>
          <tr>
            {params !== 'Users' && <th className='text-left'>Imagen</th>}
            <th className='text-left'>Producto</th>
            {/* <th className='hidden sm:table-cell'>ID</th> */}
            {/* {params === 'Users' && <th>Email</th>}
            {params === 'Users' && <th>Rol</th>} */}
            {params === 'products' && (
              <ProductTable
                category={category}
                setCategory={setCategory}
                setCollection={setCollection}
                handlePrice={handlePrice}
                collections={collections}
                sort={sort}
              />
            )}
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody className=''>
          {data.map((article) => (
            <Row
              setReload={setReload}
              article={article}
              key={article._id}
              opened={opened}
              setOpened={setOpened}
              params={params}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

TablePanelAdmin.propTypes = {
  // data: PropTypes.array.isRequired,
};

export default TablePanelAdmin;
// !
// !
// !
// !
// !
// !
const ProductTable = ({
  category,
  setCategory,
  setCollection,
  handlePrice,
  collections,
  sort,
}) => {
  return (
    <>
      <th>
        <div className='hidden category sm:block'>
          <select
            className='w-full text-gray-600'
            name='category'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='all' className='text-gray-600'>
              Todas las categorias
            </option>
            {category.map((category) => (
              <option value={category.title} key={category._id}>
                {category.title.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </th>
      {/* <th>
        <div className='hidden category sm:table-cell'>
          <select
            className='w-full text-gray-600'
            name='collections'
            onChange={(e) => setCollection(e.target.value)}
          >
            <option value='all' className='dark:text-gray-600'>
              Todas las colecciones
            </option>
            {collections.map((collections) => (
              <option value={collections.title} key={collections._id}>
                {collections.title.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </th> */}
      <th className='hidden price sm:table-cell'>
        <span className='flex items-center gap-3 px-3'>
          <p className='hidden sm:block'>Cantidad</p>
        </span>
      </th>
      <th className='hidden price sm:table-cell'>
        <span className='flex items-center gap-3 px-3' onClick={handlePrice}>
          <p className='hidden sm:block'>Precio</p>
          <span className='block p-1 font-bold text-white bg-gray-300 rounded cursor-pointer'>
            {sort === -1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </span>
      </th>
      {/* <th>Tipo</th> */}
      <th className='hidden sm:table-cell'>Disponible</th>
    </>
  );
};
