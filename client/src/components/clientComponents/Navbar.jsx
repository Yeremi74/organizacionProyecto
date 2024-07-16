import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CollectionMenu from './CollectionMenu';
import Search from './Search';
import { useEcommerceContext } from '../../context/Context';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineShopping } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContex';
import { useDispatch } from 'react-redux';
import { removeItem, resetCart } from '../../redux/cartReducer';
import CartArticle from './CartArticle';

const Navbar = () => {
  const location = useLocation();

  const {
    isScrollDisabled,
    setIsScrollDisabled,
    searchState,
    setSearchState,
    showMenu,
    setShowMenu,
  } = useEcommerceContext();

  const { cartMenu, setCartMenu, total, products } = useCart();

  const { user } = useAuth();
  const [isHoveringCollections, setIsHoveringCollections] = useState(false);

  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  const handleMouseEnterCollections = () => {
    setIsHoveringCollections(true);
  };

  const handleMouseLeaveCollections = () => {
    setIsHoveringCollections(false);
  };

  useEffect(() => {
    if (isScrollDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isScrollDisabled]);

  useEffect(() => {
    setIsHoveringCollections(false);
    setIsScrollDisabled(false);
    setSearchState(false);
    setShowMenu(false);
  }, []);
  // useEffect(() => {
  //   setIsScrollDisabled(false);
  //   setSearchState(false);
  //   setShowMenu(false);
  //   console.log(location.pathname);

  //   document.body.style.overflow = 'auto';
  // }, [location.pathname]);

  return (
    <nav className='h-20 -mt-1 bg-white'>
      <div className='fixed z-20 w-full h-20 bg-white'>
        <div className='relative flex items-center justify-between h-10 px-4 bg-white'>
          <div className='block w-full sm:hidden'>
            <GiHamburgerMenu
              className='h-7 w-7'
              onClick={() => {
                setIsScrollDisabled(showMenu ? true : !isScrollDisabled);
                setActiveMobileMenu(!activeMobileMenu);
                setShowMenu(false);
              }}
            />
          </div>

          <div className='items-center hidden w-full h-full gap-3 sm:flex'>
            <Link
              to='/login'
              className='font-bold text-gray-600 uppercase cursor-pointer hover:text-black'
            >
              login
            </Link>
            <Link
              to='/catalog/*'
              className='font-bold text-gray-600 uppercase cursor-pointer hover:text-black'
            >
              tienda
            </Link>
            <Link
              className={`uppercase cursor-pointer hover:text-black text-gray-600 font-bold h-full flex items-center ${
                isHoveringCollections ? 'collections-hover' : ''
              }`}
              onMouseEnter={handleMouseEnterCollections}
              onMouseLeave={handleMouseLeaveCollections}
              to='/collections'
            >
              colecciones
            </Link>

            <Link
              to='/admin/products'
              className='font-bold text-gray-600 uppercase cursor-pointer hover:text-black'
            >
              admin
            </Link>
          </div>
          <div className='flex justify-center w-full'>
            <Link
              to='/'
              className='justify-center font-bold uppercase cursor-pointer w-fullflex'
            >
              Ecommerce
            </Link>
          </div>
          <div className='flex justify-end w-full gap-3'>
            <FaSearch
              className='block w-6 h-6 sm:hidden'
              onClick={() => {
                setSearchState(!searchState);
                // setIsScrollDisabled(!isScrollDisabled);
                setIsScrollDisabled(showMenu ? true : !isScrollDisabled);
                setShowMenu(false);
              }}
            />
            <p
              className='hidden font-bold text-black uppercase cursor-pointer hover:text-gray-600 sm:block'
              onClick={() => {
                setSearchState(!searchState);
                setIsScrollDisabled(!isScrollDisabled);
              }}
            >
              buscar
            </p>
            <AiOutlineShopping
              className='block w-6 h-6 sm:hidden'
              onClick={() => {
                setCartMenu(!cartMenu);
                setIsScrollDisabled(!isScrollDisabled);
              }}
            />
            <p
              onClick={() => {
                setCartMenu(!cartMenu);
                setIsScrollDisabled(!isScrollDisabled);
              }}
              className='hidden font-bold text-black uppercase cursor-pointer hover:text-gray-600 sm:block'
            >
              carrito ({products.length})
            </p>
          </div>
        </div>
        <div className='relative flex flex-col items-center justify-center bg-red-950'>
          <p className='py-4 text-center text-white sm:text-xs text-peque'>
            FREE SHIPPING: NATIONAL OVER 100€ | INTERNATIONAL OVER 200€
          </p>
          {isHoveringCollections && (
            <CollectionMenu
              isHoveringCollections={isHoveringCollections}
              setIsHoveringCollections={setIsHoveringCollections}
            />
          )}
          {searchState && (
            <Search
              setSearchState={setSearchState}
              setIsScrollDisabled={setIsScrollDisabled}
              isScrollDisabled={isScrollDisabled}
            />
          )}
          {cartMenu && (
            <div className='absolute top-0 right-0 flex flex-col w-screen h-screen gap-4 pb-10 overflow-y-scroll bg-white sm:w-96'>
              {products.map((product) => (
                <CartArticle product={product} key={product._id} />
              ))}
              <div className='flex justify-between px-2'>
                <div className='flex flex-col'>
                  <p>CARRITO</p>
                  <p>{products.length} Productos</p>
                </div>
                <div className='flex flex-col'>
                  <p>TOTAL</p>
                  <p>${total()}</p>
                </div>
              </div>
              {/* <span onClick={() => dispatch(resetCart())} className='px-2'>
                Reiniciar
              </span> */}
              <button className='p-2 mx-2 font-bold text-white bg-red-900'>
                CHECKOUT
              </button>
            </div>
          )}
          <section
            className={`bg-white h-screen w-screen absolute top-0 -translate-x-full flex flex-col gap-4 ${
              activeMobileMenu && 'translate-x-0'
            } transition-all z-50`}
          >
            <Link
              to='/login'
              className='font-bold text-gray-600 uppercase cursor-pointer hover:text-black'
            >
              login
            </Link>
            <Link
              to='/catalog/*'
              className='font-bold text-gray-600 uppercase cursor-pointer hover:text-black h-fit'
              onClick={() => {
                setIsScrollDisabled(false);
                setActiveMobileMenu(false);
                setShowMenu(false);
              }}
            >
              shop
            </Link>
            <Link
              className={`uppercase cursor-pointer hover:text-black text-gray-600 font-bold flex items-center  h-fit${
                isHoveringCollections ? 'collections-hover' : ''
              }`}
              to='/collections'
              onClick={() => {
                setIsScrollDisabled(false);
                setActiveMobileMenu(false);
                setShowMenu(false);
              }}
            >
              colecciones
            </Link>
            {user?.rol === 'admin' && (
              <Link
                to='/admin/products'
                className='font-bold text-gray-600 uppercase cursor-pointer hover:text-black h-fit'
                onClick={() => {
                  setIsScrollDisabled(false);
                  setActiveMobileMenu(false);
                  setShowMenu(false);
                }}
              >
                admin
              </Link>
            )}
          </section>
        </div>
      </div>
      {searchState && (
        <div
          className='fixed top-0 z-10 w-screen h-screen bg-custom_transparent'
          onClick={() => {
            setIsScrollDisabled(false);
            setSearchState(false);
          }}
        ></div>
      )}
      {cartMenu && (
        <div
          className='fixed top-0 z-10 w-screen h-screen bg-custom_transparent'
          onClick={() => {
            setIsScrollDisabled(false);
            setCartMenu(false);
          }}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
