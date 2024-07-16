import { useEffect, useState } from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import GridArticle from '../../components/clientComponents/GridArticle';
import { useParams } from 'react-router-dom';
import { useEcommerceContext } from '../../context/Context';

const CatalogSearch = () => {
  const params = useParams();
  const { getSearch } = useEcommerceContext();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const objFunc = async () => {
      console.log(params);

      const res = await getSearch(params.search);
      setProduct(res.data);
    };
    objFunc();
  }, [params.search]);
  return (
    <div>
      <Navbar />
      <div>
        <section className='py-8'>
          {product.length == 0 ? (
            <div className='uppercase font-bold flex flex-col items-center'>
              <p>no hay productos</p>
              <span>:(</span>
            </div>
          ) : (
            <GridArticle products={product} title='' />
          )}
        </section>
      </div>
    </div>
  );
};

export default CatalogSearch;
