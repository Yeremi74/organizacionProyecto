import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEcommerceContext } from '../../context/Context';
const Card = ({ product }) => {
  const { setIsScrollDisabled } = useEcommerceContext;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const string = product.sizes[0];
  const array = string.split(',');
  //   console.log(array);
  return (
    <Link
      to={`/product/${product._id}`}
      className='flex flex-col w-full'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsScrollDisabled(false)}
    >
      <header>
        <img
          src={product.image?.url}
          alt={`imagen de ${product.title}`}
          className={`h-96 w-full cursor-pointer ${isHovered && 'hidden'}`}
        />
        <img
          src={product.image2?.url}
          alt={`imagen de ${product.title}`}
          className={`h-96 w-full cursor-pointer ${!isHovered && 'hidden'}`}
        />
      </header>
      {!isHovered ? (
        <div className='h-20'>
          <p className='uppercase relative font-bold'>{product.title}</p>
          <span>${product.price}</span>
          <div className='flex gap-2 w-full'>
            <div className='w-4 h-4 rounded-full bg-black'></div>
            <div className='w-4 h-4 rounded-full bg-blue-500'></div>
          </div>
        </div>
      ) : (
        <div className='flex justify-evenly uppercase relative h-20 items-center'>
          <button
            disabled={array.includes('xs') ? true : false}
            className={`${
              array.includes('xs')
                ? 'text-black font-bold'
                : 'text-gray-500 opacity-35'
            } uppercase relative `}
          >
            {!array.includes('xs') && (
              <div className='before absolute top-1/2 left-0 w-full h-custom bg-gray-900' />
            )}
            xs
          </button>
          <button
            disabled={array.includes('s') ? true : false}
            className={`${
              array.includes('s')
                ? 'text-black font-bold'
                : 'text-gray-500 opacity-35'
            } uppercase relative`}
          >
            {!array.includes('s') && (
              <div className='before absolute top-1/2 left-0 w-full h-custom bg-gray-900' />
            )}
            s
          </button>
          <button
            disabled={array.includes('m') ? true : false}
            className={`${
              array.includes('m')
                ? 'text-black font-bold'
                : 'text-gray-500 opacity-35'
            } uppercase relative`}
          >
            {!array.includes('m') && (
              <div className='before absolute top-1/2 left-0 w-full h-custom bg-gray-900' />
            )}
            m
          </button>
          <button
            disabled={array.includes('l') ? true : false}
            className={`${
              array.includes('l')
                ? 'text-black font-bold'
                : 'text-gray-500 opacity-35'
            } uppercase relative`}
          >
            {!array.includes('l') && (
              <div className='before absolute top-1/2 left-0 w-full h-custom bg-gray-900' />
            )}
            l
          </button>
          <button
            disabled={array.includes('xl') ? true : false}
            className={`relative ${
              array.includes('xl')
                ? 'text-black font-bold'
                : 'text-gray-500 opacity-35'
            } uppercase`}
          >
            {!array.includes('xl') && (
              <div className='before absolute top-1/2 left-0 w-full h-custom bg-gray-900' />
            )}
            xl
          </button>
        </div>
      )}
    </Link>
  );
};

export default Card;

Card.propTypes = {
  product: PropTypes.object.isRequired,
};
