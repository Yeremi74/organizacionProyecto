import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useEcommerceContext } from '../../context/Context';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GridArticle from './GridArticle';
const Search = ({ setSearchState, setIsScrollDisabled }) => {
  const { getSearch } = useEcommerceContext();
  const [searchTextApi, setSearchTextApi] = useState('');
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const objFunc = async () => {
      const res = await getSearch(searchTextApi);

      setProduct(res.data);
    };
    objFunc();
  }, [searchTextApi]);

  return (
    <div
      className={`w-full z-30 bg-white flex items-center px-10 ${
        searchTextApi !== '' ? 'min-h-96 overflow-y-scroll' : 'min-h-16'
      } gap-4 flex-col`}
    >
      <div className='flex w-full h-10 items-center py-8 gap-4'>
        <FaSearch className='h-6 w-6' />
        <input
          type='text'
          className='w-full outline-none'
          placeholder='BUSCA...'
          onChange={(e) => setSearchTextApi(e.target.value)}
        />
        <IoClose
          className='h-6 w-6 cursor-pointer'
          onClick={() => {
            setSearchState(false);
            setIsScrollDisabled(false);
          }}
        />
      </div>
      {searchTextApi !== '' && (
        <div className='w-full'>
          <div className='uppercase flex justify-between border-b border-b-gray-500 border-solid pb-4'>
            <p>
              <span>{product.length}</span> resultados
            </p>
            <Link
              to={`/catalog/search/${searchTextApi}/all`}
              onClick={() => {
                setSearchState(false);
                setIsScrollDisabled(false);
              }}
            >
              ver todo
            </Link>
          </div>
          {searchTextApi !== '' && (
            <div className='h-11'>
              <GridArticle products={product} title='' height='.' />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  setSearchState: PropTypes.func.isRequired,
  setIsScrollDisabled: PropTypes.func.isRequired,
};

export default Search;
