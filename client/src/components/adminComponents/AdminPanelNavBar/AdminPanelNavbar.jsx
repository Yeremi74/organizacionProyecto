import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const AdminPanelNavbar = ({ setActiveMobileMenu }) => {
  return (
    <div className='flex flex-col bg-gray-700 h-screen w-44 fixed text-3xl text-center gap-4 items-center text-white shadow-2xl shadow-gray-500 admin-panel-navbar'>
      <Link
        className='hover:bg-gray-400 transition-all w-fit p-2 rounded-md'
        to='/admin/products'
        onClick={() => setActiveMobileMenu(false)}
      >
        Products
      </Link>
      <Link
        className='hover:bg-gray-400 transition-all w-fit p-2 rounded-md'
        to='/admin/Collections'
        onClick={() => setActiveMobileMenu(false)}
      >
        Collections
      </Link>
      <Link
        className='hover:bg-gray-400 transition-all w-fit p-2 rounded-md'
        to='/admin/Category'
        onClick={() => setActiveMobileMenu(false)}
      >
        Categories
      </Link>
    </div>
  );
};

AdminPanelNavbar.propTypes = {
  setActiveMobileMenu: PropTypes.func.isRequired,
};

export default AdminPanelNavbar;
