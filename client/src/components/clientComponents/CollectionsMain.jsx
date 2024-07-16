import { Link } from 'react-router-dom';

const CollectionsMain = () => {
  return (
    <div className='flex justify-center w-full gap-3 flex-wrap flex-col sm:flex-row '>
      <Link
        to={`/catalog/cat/chaquetas`}
        className='flex-1 flex justify-center w-full sm:min-w-80 relative'
      >
        <img
          src='https://nude-project.com/cdn/shop/files/Sin_titulo-56.jpg?v=1709548759'
          alt='imagen de hoodies'
          className='hover:brightness-75'
        />
        <p className='uppercase absolute top-1/2 text-white font-bold text-2xl pointer-events-none'>
          jackets
        </p>
      </Link>
      <Link
        to={`/catalog/cat/pantalones`}
        className='flex-1 flex justify-center w-full sm:min-w-80 relative last:text-red-500'
      >
        <img
          src='https://nude-project.com/cdn/shop/files/Sintitulo-37.jpg?v=1708590063'
          alt='imagen de pantalones'
          className='hover:brightness-75'
        />
        <p className='uppercase absolute top-1/2 text-white font-bold text-2xl pointer-events-none'>
          bottoms
        </p>
      </Link>
      <Link
        to={`/catalog/cat/all`}
        className='flex-1 flex justify-center w-full sm:min-w-80 relative'
      >
        <img
          src='https://nude-project.com/cdn/shop/files/Sin_titulo-30.jpg?v=1709548691'
          alt='imagen de todos los productos'
          className='hover:brightness-75'
        />
        <p className='uppercase absolute top-1/2 text-white font-bold text-2xl pointer-events-none'>
          all products
        </p>
      </Link>
    </div>
  );
};

export default CollectionsMain;
