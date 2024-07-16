import { useEffect, useState } from 'react';
import { useEcommerceContext } from '../../context/Context';
import GridArticle from '../../components/clientComponents/GridArticle';
import CollectionsMain from '../../components/clientComponents/CollectionsMain';
import ImageMainSection from '../../components/clientComponents/ImageMainSection';
import DraggableCarrousel from '../../components/clientComponents/DraggableCarrousel';
import Navbar from '../../components/clientComponents/Navbar';
const HomePage = () => {
  const { getProducts, filterProduct } = useEcommerceContext();
  const [all, setAll] = useState([]);
  const [pantalones, setPantalones] = useState([]);
  const [chaquetas, setChaquetas] = useState([]);
  const [screenHeight, setScreenHeight] = useState(0);
  useEffect(() => {
    const objFunc = async () => {
      const pantsRes = await filterProduct('pantalones', 'all', 1);
      setPantalones(pantsRes);
      const chaquetasRes = await filterProduct('chaquetas', 'all', 1);
      setChaquetas(chaquetasRes);
      const all = await getProducts();
      setAll(all);
    };
    objFunc();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Inicializar el estado con la altura actual de la pantalla
    handleResize();

    // Limpiar el evento de resize al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Restar los valores deseados a la altura de la pantalla
  const adjustedHeight = screenHeight - 75;
  return (
    <div>
      <Navbar />

      {/* <header>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ height: `${adjustedHeight}px` }}
          src='https://cdn.shopify.com/videos/c/o/v/3e7fa3d1047f46f381e6d316f366df47.mp4'
          className='object-cover object-bottom sm:w-full'
        >
          <source
            className='object-cover object-bottom sm:w-full'
            style={{ height: `${adjustedHeight}px` }}
            src='https://cdn.shopify.com/videos/c/o/v/3e7fa3d1047f46f381e6d316f366df47.mp4'
            type='video/mp4'
            data-ly-processed='1712212206559'
          />
        </video>
      </header> */}
      <section className='px-2 sm:px-6'>
        <GridArticle products={all.slice(0, 8)} title='new in' />
        <CollectionsMain />
        <GridArticle products={pantalones} title='pantalones' />
        <ImageMainSection />
        <GridArticle products={chaquetas} title='chaquetas' />
        <DraggableCarrousel />
      </section>
    </div>
  );
};

export default HomePage;
