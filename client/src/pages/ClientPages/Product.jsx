import { useParams } from 'react-router-dom';
import { useEcommerceContext } from '../../context/Context';
import { useEffect, useState } from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import InfoProduct from '../../components/clientComponents/InfoProduct';
import GridArticle from '../../components/clientComponents/GridArticle';
import DraggableCarrousel from '../../components/clientComponents/DraggableCarrousel';
const Product = () => {
  const params = useParams();
  const { getUniqueProduct, getProducts, filterProduct } =
    useEcommerceContext();
  const [product, setProduct] = useState([]);
  const [sizesSelected, setSizesSelected] = useState('');
  const [allProduct, setAllProduct] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    const objFunc = async () => {
      const res = await getUniqueProduct('products', params.id);
      setProduct(res.data);
      const allProducts = await getProducts();
      setAllProduct(allProducts);
      const categoryFilterReq = await filterProduct(
        res.data.category,
        'all',
        1
      );
      setCategoryFilter(categoryFilterReq);
    };
    objFunc();
  }, [params.id]);

  //   console.log(sizesJoined);
  return (
    <div>
      <Navbar />
      <div className='px-2 sm:px-6 gap-8 flex flex-col'>
        <InfoProduct
          product={product}
          sizesSelected={sizesSelected}
          setSizesSelected={setSizesSelected}
        />

        <GridArticle products={allProduct} title='YOU MAY ALSO LIKE' />
        <DraggableCarrousel size={'full'} />
        <GridArticle products={categoryFilter} title='YOU MAY ALSO LIKE' />
      </div>
    </div>
  );
};

export default Product;
