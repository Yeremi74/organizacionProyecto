import PropTypes from 'prop-types';
import { TbRulerMeasure } from 'react-icons/tb';
import BtnInfoProduct from './BtnInfoProduct';
import { ClassNames } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContex';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';

const InfoProduct = ({ product, sizesSelected, setSizesSelected }) => {
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  return (
    <div className='bg-white'>
      <div className='w-full pt-6'>
        <nav aria-label='Breadcrumb'>
          <ol
            role='list'
            className='flex items-center max-w-2xl space-x-2 lg:max-w-7xl'
          >
            <li>
              <div className='flex items-center'>
                <Link
                  to='/catalog/*'
                  className='mr-2 text-sm font-medium text-gray-900'
                >
                  Tienda
                </Link>
                <svg
                  width='16'
                  height='20'
                  viewBox='0 0 16 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-5 text-gray-300'
                >
                  <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                </svg>
              </div>
            </li>
            <li>
              <div className='flex items-center'>
                <Link
                  to={`/catalog/cat/${product.category}`}
                  className='mr-2 text-sm font-medium text-gray-900 capitalize'
                >
                  {product.category}
                </Link>
                <svg
                  width='16'
                  height='20'
                  viewBox='0 0 16 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-4 h-5 text-gray-300'
                >
                  <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                </svg>
              </div>
            </li>

            <li className='text-sm'>
              <a
                href='#'
                aria-current='page'
                className='font-medium text-gray-500 hover:text-gray-600'
              >
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        <div className='max-w-2xl mt-6 lg:grid lg:max-w-screen-2xl lg:grid-cols-3 lg:gap-x-8'>
          <div className='overflow-hidden rounded-lg aspect-h-4 aspect-w-3 lg:block'>
            <img
              src={product.image?.url}
              alt='Two each of gray, white, and black shirts laying flat.'
              className='object-cover object-center w-full h-full'
            />
          </div>
          <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
            <div className='overflow-hidden rounded-lg aspect-h-2 aspect-w-3'>
              <img
                src={product.image2?.url}
                alt='Model wearing plain black basic tee.'
                className='object-cover object-center w-full h-full'
              />
            </div>
            <div className='overflow-hidden rounded-lg aspect-h-2 aspect-w-3'>
              <img
                src={product.image3?.url}
                alt='Model wearing plain gray basic tee.'
                className='object-cover object-center w-full h-full'
              />
            </div>
          </div>
          <div className='hidden overflow-hidden aspect-h-5 lg:block aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:rounded-lg'>
            <img
              src={product.image4?.url}
              alt='Model wearing plain white basic tee.'
              className='object-cover object-center w-full h-full'
            />
          </div>
        </div>

        <div className=' max-w-2xl pb-16 pt-10 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:pb-24 lg:pt-16'>
          <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
              {product.title}
            </h1>
          </div>

          <div className='mt-4 lg:row-span-3 lg:mt-0'>
            <h2 className='sr-only'>Product information</h2>
            <p className='text-3xl tracking-tight text-gray-900'>
              ${product.price}
            </p>

            <form className='mt-10'>
              <div className='mt-10'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-sm font-medium text-gray-900'>Size</h3>
                  <p className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                    Size guide
                  </p>
                </div>

                <fieldset className='w-full mt-4'>
                  <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
                    <BtnInfoProduct
                      talla={'xs'}
                      setSizesSelected={setSizesSelected}
                      product={product}
                      sizesSelected={sizesSelected}
                    />
                    <BtnInfoProduct
                      talla={'s'}
                      setSizesSelected={setSizesSelected}
                      product={product}
                      sizesSelected={sizesSelected}
                    />
                    <BtnInfoProduct
                      talla={'m'}
                      setSizesSelected={setSizesSelected}
                      product={product}
                      sizesSelected={sizesSelected}
                    />
                    <BtnInfoProduct
                      talla={'l'}
                      setSizesSelected={setSizesSelected}
                      product={product}
                      sizesSelected={sizesSelected}
                    />
                    <BtnInfoProduct
                      talla={'xl'}
                      setSizesSelected={setSizesSelected}
                      product={product}
                      sizesSelected={sizesSelected}
                    />
                  </div>
                </fieldset>
                {error && (
                  <div className='my-3 font-bold text-rose-500'>{error}</div>
                )}
              </div>
              <div className='flex my-5 w-fit'>
                <span
                  onClick={() => {
                    if (quantity >= 2) {
                      setQuantity((quantity) => (quantity -= 1));
                    }
                  }}
                  className='px-2 py-1 bg-gray-200 cursor-pointer'
                >
                  -
                </span>
                <input
                  type='number'
                  value={quantity}
                  className='w-20 text-center outline-none'
                />
                <span
                  onClick={() => setQuantity((quantity) => (quantity += 1))}
                  className='px-2 py-1 bg-gray-200 cursor-pointer'
                >
                  +
                </span>
              </div>
              <p
                onClick={() => {
                  if (sizesSelected == '') {
                    setError('Selecciona una talla');
                  } else {
                    dispatch(
                      addToCart({
                        _id: product._id,
                        title: product.title,
                        sizes: sizesSelected,
                        price: product.price,
                        img: product.image.url,
                        quantity: quantity,
                      })
                    );
                  }
                }}
                className='flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Add to bag
              </p>
            </form>
          </div>

          <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
            <div>
              <h3 className='sr-only'>Description</h3>

              <div className='space-y-6'>
                <p className='text-base text-gray-900'>
                  {product.description &&
                    product.description.length > 0 &&
                    product.description.slice(0, 1500)}
                  ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;

InfoProduct.propTypes = {
  product: PropTypes.object.isRequired,
  sizesSelected: PropTypes.string.isRequired,
  setSizesSelected: PropTypes.func.isRequired,
};
