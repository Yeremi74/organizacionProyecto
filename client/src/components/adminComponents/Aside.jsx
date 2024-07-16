import { useEffect, useState } from 'react';
import NavbarAdmin, { SideBarItem } from './NavbarAdmin';
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  //   LifeBuoy,
  Package,
  Receipt,
  //   Settings,
  UserCircle,
  Moon,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
const Aside = () => {
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  const [selected, setSelected] = useState('');
  return (
    <NavbarAdmin>
      <SideBarItem
        icon={<Boxes size={20} />}
        text='products'
        url='/admin/products'
        setSelected={setSelected}
        selected={selected}
      />
      <SideBarItem
        icon={<LayoutDashboard size={20} />}
        text='categorias'
        url='/admin/Category'
        setSelected={setSelected}
        selected={selected}
      />
      <SideBarItem
        icon={<Receipt size={20} />}
        text='colecciones'
        url='/admin/transacciones'
        setSelected={setSelected}
        selected={selected}
      />
      {/* <SideBarItem
        icon={<BarChart3 size={20} />}
        url='/admin/graficos'
        text='Estadisticas'
        setSelected={setSelected}
        selected={selected}
      />
      <hr className='my-3' />
      <SideBarItem
        icon={<Package size={20} />}
        text='orders'
        setSelected={setSelected}
        selected={selected}
      />
      <hr className='my-3' />
      <SideBarItem
        icon={<UserCircle size={20} />}
        text='users'
        url='/admin/Users'
        setSelected={setSelected}
        selected={selected}
      />
      <SideBarItem
        icon={<Moon size={20} />}
        text='darkMode'
        setSelected={setSelected}
        selected={selected}
      /> */}
    </NavbarAdmin>
  );
};

export default Aside;
