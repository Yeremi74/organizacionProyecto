import PropTypes from 'prop-types';
import Card from './Card';

const GridArticle = ({ products, title, height = 'min-h-screen' }) => {
  // console.log(products);
  return (
    <div className={height}>
      <p className='uppercase pb-6 font-bold'>{title}</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default GridArticle;

GridArticle.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
