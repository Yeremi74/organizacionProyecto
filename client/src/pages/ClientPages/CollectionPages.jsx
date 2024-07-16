import { useEffect } from 'react';
import { useEcommerceContext } from '../../context/Context';
import { Link } from 'react-router-dom';
import Navbar from '../../components/clientComponents/Navbar';

const CollectionPages = () => {
  const { getCollections, collections } = useEcommerceContext();

  useEffect(() => {
    const objFunc = async () => {
      await getCollections();
    };
    objFunc();
  }, []);
  return (
    <div>
      <Navbar />
      <h2 className='uppercase my-4 mx-auto w-fit font-bold text-2xl'>
        Colecciones
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-14 justify-items-center uppercase my-8 p-6'>
        {collections.map((collect) => (
          <div
            key={collect._id}
            className='flex flex-col items-center gap-3 hover:brightness-110'
          >
            <Link to={`/catalog/${collect.title}`}>
              <img src={collect.image.url} alt='' className='' />
            </Link>
            <p className='font-bold'>{collect.title}</p>
            <Link
              to={`/catalog/${collect.title}`}
              className='border bottom-custom border-black p-2 text-xs hover:bg-red-600 hover:text-white'
            >
              view products
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPages;
