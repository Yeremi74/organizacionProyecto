import { useEffect } from 'react';
import { useEcommerceContext } from '../../context/Context';
import { Link } from 'react-router-dom';

const CollectionMenu = ({ setIsHoveringCollections }) => {
  const { getCollections, collections } = useEcommerceContext();

  useEffect(() => {
    const objFunc = async () => {
      await getCollections();
    };
    objFunc();
  }, []);

  const handleMouseEnterCollections = () => {
    setIsHoveringCollections(true);
  };

  const handleMouseLeaveCollections = () => {
    setIsHoveringCollections(false);
  };

  return (
    <div
      className='absolute w-full top-0 z-30 bg-white left-0'
      onMouseEnter={handleMouseEnterCollections}
      onMouseLeave={handleMouseLeaveCollections}
    >
      <div className='p-6 flex flex-col h-96 overflow-y-scroll'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
          {collections.slice(0, 4).map((collections) => (
            <Link
              to={`/catalog/${collections.title}`}
              key={collections._id}
              onClick={handleMouseLeaveCollections}
            >
              <img src={collections.image.url} alt='' />
              <p className='uppercase font-bold my-4 mx-auto  w-fit '>
                {collections.title}
              </p>
            </Link>
          ))}
        </div>
        <Link
          className='uppercase w-fit my-0 mx-auto bg-red-800 text-white py-1 px-2'
          to='/collections'
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default CollectionMenu;
