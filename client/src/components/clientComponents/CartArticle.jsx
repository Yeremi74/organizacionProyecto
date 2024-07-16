import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/cartReducer';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CartArticle = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div key={product._id} className='flex gap-2'>
      <img src={product?.img} className='h-40' />
      <div className='flex flex-col justify-between pb-2'>
        <div className='flex flex-col gap-2'>
          <Link to={`/product/${product._id}`} className='font-bold'>
            {product.title}
          </Link>
          <span> ${product.price}</span>
          <span className='uppercase'>{product.sizes}</span>
          <span> {product.quantity}</span>
        </div>
        <div className='flex flex-col'>
          <span
            onClick={() => dispatch(removeItem(product._id))}
            className='text-gray-700 underline cursor-pointer w-fit'
          >
            QUITAR
          </span>
        </div>
      </div>
    </div>
  );
};

CartArticle.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CartArticle;
