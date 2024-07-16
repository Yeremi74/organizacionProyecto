import { useEffect, useState } from 'react';
import Aside from '../../components/adminComponents/Aside';
import { getTransaccionesRequest } from '../../api/transacciones';
import moment from 'moment';
import 'moment/locale/es';

const Transacciones = () => {
  moment.locale('es');
  const [transacciones, setTransacciones] = useState(null);
  useEffect(() => {
    const fn = async () => {
      const res = await getTransaccionesRequest();
      setTransacciones(res.data);
    };
    fn();
  }, []);

  return (
    <div>
      <div className='flex capitalize '>
        <Aside />
        <div className='flex w-full'>
          <div className='w-20 sm:w-16'></div>
          <div className='flex flex-wrap w-full h-screen gap-4 p-2 m-auto my-0 text-black rounded-md dark:text-white sm:p-6'>
            {transacciones &&
              transacciones.map((transaccion) => (
                <div
                  key={transaccion._id}
                  className='p-2 bg-gray-200 w-52 h-fit'
                >
                  <p>
                    <span className='font-bold'> Producto:</span>
                    {transaccion.product}
                  </p>
                  <p>
                    <span className='font-bold'> Descripcion:</span>
                    {transaccion.description}
                  </p>
                  <p>
                    <span className='font-bold'> Empresa:</span>
                    {transaccion.empresa}
                  </p>
                  <p>
                    <span className='font-bold'> Cantidad:</span>
                    {transaccion.quantity}
                  </p>
                  <p>
                    <span className='font-bold'> Tipo:</span>
                    {transaccion.type}
                  </p>
                  <p>
                    <span className='font-bold'> Precio:</span>
                    {transaccion.price}
                  </p>
                  <p>
                    <span className='font-bold'> Fecha:</span>
                    {moment(transaccion.createdAt)
                      .locale('es')
                      .format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transacciones;
