import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <Link
        to='/admin/products'
        className='bg-lime-400 block w-36 h-14 text-center '
      >
        Products
      </Link>
      <Link
        to='/admin/Collections'
        className='bg-lime-400 block w-36 h-14 text-center mt-4'
      >
        Collections
      </Link>
      <Link
        to='/admin/Category'
        className='bg-lime-400 block w-36 h-14 text-center mt-4'
      >
        Categories
      </Link>
    </div>
  );
};

export default AdminPage;
