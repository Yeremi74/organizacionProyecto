import { useNavigate, useParams } from 'react-router-dom';
// import * as Yup from 'yup';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEcommerceContext } from '../../../context/Context';
import { useEffect, useState } from 'react';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './postForm.css';
import ProductsForm from '../../../components/adminComponents/productsForm/Productsform';
import OtherForm from '../../../components/adminComponents/otherForm/OtherForm';

const PostForm = () => {
  const params = useParams();

  const {
    createProduct,
    getUniqueProduct,
    updateProduct,
    getCategory,
    category,
    collections,
    getCollections,
  } = useEcommerceContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    sizes: [],
    category: '',
    price: 0,
    oldprice: 0,
    available: true,
    collectionType: '',
    type: '',
    image: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });
  // console.log(product);
  // useEffect(() => {
  //   (async () => {
  //     if (params.product) {
  //       const product = await getUniqueProduct(params.id, params.product);
  //       setProduct(product.data);
  //     }
  //   })();
  //   getCategory();
  //   getCollections();
  // }, [params.product, params.id]);
  // console.log(product.sizes);
  // const sizesJoined = product.sizes.flatMap((size) => size.split(','));
  // console.log(sizesJoined);
  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();

  //     setLoading(true);
  //     if (params.product) {
  //       await updateProduct(params.id, params.product, {
  //         ...product,
  //       });
  //     } else {
  //       createProduct(product, params.id);
  //     }

  //     navigate(`/admin/${params.id}`);
  //   } catch (error) {
  //     console.log();
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // console.log(sizesJoined); // Resultado: 's,xl,xs,m,l'
  // const sizesCovertes = product.sizes.join(',');
  // console.log(sizesCovertes.split(','));
  // console.log(sizesCovertes.split(',').filter((size) => size !== 's'));
  // const handleOptionChange = () => {
  //   if (product.available) return setProduct({ ...product, available: false });
  //   setProduct({ ...product, available: true });
  // };
  return (
    <>
      {params.id == 'products' && <ProductsForm />}
      {params.id !== 'products' && <OtherForm />}
    </>
  );
};

export default PostForm;
