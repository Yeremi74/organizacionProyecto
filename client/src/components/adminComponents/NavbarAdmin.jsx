// import { useEffect, useState } from 'react';
// import DarkModeButton from './darkModeButton/DarkModeButton';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import AdminPanelNavbar from './AdminPanelNavBar/AdminPanelNavbar';
// import { Link } from 'react-router-dom';

// const NavbarAdmin = () => {
//   const [activeMobileMenu, setActiveMobileMenu] = useState(false);
//   useEffect(() => {
//     document.body.style.overflow = 'auto';
//   }, []);
//   return (
//     <nav className='-mt-1 bg-white'>
//       <div className='fixed z-20 w-full bg-white'>
//         <div className='relative flex items-center justify-between p-4 bg-white dark:bg-gray-900 dark:text-white'>
//           <div
//             className='block w-full '
//             onClick={() => {
//               setActiveMobileMenu(!activeMobileMenu);
//             }}
//           >
//             <GiHamburgerMenu className='w-12 h-12 cursor-pointer' />
//           </div>

//           <div className='flex justify-center w-full'>
//             <Link to='/' className='font-bold uppercase cursor-pointer '>
//               Inicio
//             </Link>
//           </div>
//           <div className='flex justify-end w-full'>
//             <DarkModeButton />
//           </div>
//         </div>
//         <div className='relative'>
//           <section
//             className={`h-screen w-screen absolute top-0 -translate-x-full ${
//               activeMobileMenu && 'translate-x-0'
//             } transition-all z-40`}
//             onClick={(e) => {
//               const navbarElement = document.querySelector(
//                 '.admin-panel-navbar'
//               ); // Ejemplo de selector
//               if (
//                 e.target === navbarElement ||
//                 navbarElement.contains(e.target)
//               ) {
//                 e.stopPropagation();
//               } else {
//                 setActiveMobileMenu(false);
//               }
//             }}
//           >
//             <AdminPanelNavbar setActiveMobileMenu={setActiveMobileMenu} />
//           </section>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavbarAdmin;
import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react';
import { useContext, createContext, useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarContext = createContext();

const NavbarAdmin = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <aside className={`h-screen fixed z-40 ${expanded ? 'w-fit' : 'w-fit'}`}>
        <nav className='flex flex-col h-full bg-white border-r shadow-sm'>
          <div className='flex items-center justify-between p-4 pb-2'>
            <p>
              <img
                src='https://img.logoipsum.com/243.svg'
                className={`overflow-hidden transition-all ${
                  expanded ? 'w-32' : 'w-0 hidden'
                }`}
                alt=''
              />
            </p>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className='flex-1 px-3'>{children}</ul>
          </SidebarContext.Provider>

          <div className='flex p-3 border-t'>
            <img
              src='https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'
              alt=''
              className='w-10 h-10 rounded-md'
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
            >
              <div className='leading-4'>
                <h4 className='font-semibold'>John Doe</h4>
                <span className='text-xs text-gray-600'>johndoe@gmail.com</span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
      {expanded && (
        <div
          className='fixed top-0 z-20 w-screen h-screen bg-custom_transparent'
          onClick={() => setExpanded(false)}
        ></div>
      )}
    </div>
  );
};

export function SideBarItem({
  icon,
  text,
  active,
  url,
  selected,
  setSelected,
}) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center my-1
        font-medium rounded-md cursor-pointer
        transition-colors group 
        ${
          selected === text
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
    >
      <Link
        onClick={() => setSelected(text)}
        to={url}
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group 
        ${
          selected === text
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all capitalize ${
            expanded ? 'w-52 ml-3' : 'w-0'
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 capitalize
      `}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}

export default NavbarAdmin;
