import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createRequest,
  deleteRequest,
  filterRequest,
  getProductsRequest,
  getUniqueProductRequest,
  updateProductRequest,
  getSearchProductRequest,
} from '../api/products';
import { getCollectionRequest } from '../api/colleciones';
import { getCategoryRequest } from '../api/category';
import {
  getUniqueRequest,
  getUsersRequest,
  updateUserRequest,
} from '../api/auth';
import { useLocation } from 'react-router-dom';

const context = createContext();

export const useEcommerceContext = () => {
  const contexto = useContext(context);
  return contexto;
};
export const ContextProvider = ({ children }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [category, setCategory] = useState([]);
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  const [users, setUsers] = useState([]);

  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  const [estado, setEstado] = useState(false);

  const [searchState, setSearchState] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setIsScrollDisabled(false);
    setSearchState(false);
    setShowMenu(false);
    console.log(location.pathname);
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // !

  const getProducts = async () => {
    const res = await getProductsRequest();
    setProducts(res.data);
    return res.data;
  };

  const getCollections = async () => {
    const res = await getCollectionRequest();
    setCollections(res.data);
    return res.data;
  };

  const getCategory = async () => {
    const res = await getCategoryRequest();
    setCategory(res.data);
    return res.data;
  };

  const getSearch = async (searchText) => {
    const res = await getSearchProductRequest(searchText);
    console.log(searchText);
    console.log(res);
    return res;
  };

  const createProduct = async (product, id) => {
    try {
      console.log(product);
      const res = await createRequest(product, id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (params, id) => {
    try {
      console.log(params, id);
      await deleteRequest(params, id);
    } catch (error) {
      console.log(error);
    }
  };

  const getUniqueProduct = async (params, id) => {
    const res = await getUniqueProductRequest(params, id);
    return res;
  };

  const updateProduct = async (params, id, product) => {
    await updateProductRequest(params.toLowerCase(), id, product);
  };

  const filterProduct = async (cat, collec, sort) => {
    const res = await filterRequest(cat, collec, sort);
    setProducts(res.data);
    return res.data;
  };

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) => {
    const res = await getUniqueRequest(id);
    return res.data;
  };

  const updateUser = async (id, user) => {
    const res = await updateUserRequest(id, user);

    return res.data;
  };

  return (
    <context.Provider
      value={{
        products,
        collections,
        category,
        getProducts,
        getCollections,
        getCategory,
        createProduct,
        deleteProduct,
        getUniqueProduct,
        updateProduct,
        darkMode,
        setDarkMode,
        filterProduct,
        isScrollDisabled,
        setIsScrollDisabled,
        estado,
        setEstado,
        getSearch,
        searchState,
        setSearchState,
        showMenu,
        setShowMenu,
        getUsers,
        users,
        setUsers,
        getUser,
        updateUser,
      }}
    >
      {children}
    </context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
