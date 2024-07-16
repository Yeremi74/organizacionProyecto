import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GridArticle from '../../components/clientComponents/GridArticle';
import { useEcommerceContext } from '../../context/Context';
import Navbar from '../../components/clientComponents/Navbar';
import { LuSettings2 } from 'react-icons/lu';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

const Catalog = () => {
  const params = useParams();

  const {
    filterProduct,
    getCategory,
    category,
    getCollections,
    collections,
    isScrollDisabled,
    setIsScrollDisabled,
    setSearchState,
    showMenu,
    setShowMenu,
  } = useEcommerceContext();
  const [product, setProduct] = useState([]);
  const [catFilter, setCatFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState(1);
  const [collectFilter, setCollectionFilter] = useState('all');

  useEffect(() => {
    const objFunc = async () => {
      console.log(params);
      await setCollectionFilter(
        params.collections === '*' ? 'all' : params.collections
      );
      const res = await filterProduct(catFilter, collectFilter, sortFilter);
      setProduct(res);
      await getCategory();
      await getCollections();
    };
    objFunc();
  }, [
    catFilter,
    params.collections,
    params,
    setCollectionFilter,
    collectFilter,
    sortFilter,
  ]);
  getCollections;
  //! : setCatFilter(cat.title);
  return (
    <div>
      <div className='relative'>
        <Navbar />
        <div className='fixed w-full bg-white flex justify-end p-2 z-10'>
          <p
            className='flex items-center capitalize text-sm font-bold z-20'
            onClick={() => {
              setShowMenu(!showMenu);
              setIsScrollDisabled(!isScrollDisabled);
              setSearchState(false);
            }}
          >
            <LuSettings2 className='h-7 w-7' /> filtros y ordenar
          </p>
        </div>
      </div>
      <div className='flex min-h-96'>
        <div
          className={`w-1/4 sm:relative sm:block absolute z-10 bg-white ${
            showMenu ? '' : ''
          }`}
        >
          <div
            className={`${
              showMenu ? '-left-0' : ' -left-96'
            } fixed top-28 sm:sticky sm:top-32  sm:block sm:w-11/12 my-0 mx-auto overflow-y-scroll sm:h-custom_navBar transition-all bg-white w-1/2 z-30 h-screen pb-52`}
          >
            <p className='px-4'>{product.length} Items</p>
            <ChakraProvider>
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem className='py-3'>
                  <h2>
                    <AccordionButton>
                      <Box
                        as='span'
                        flex='1'
                        textAlign='left'
                        className='capitalize text-black font-bold'
                      >
                        category
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <div className='flex flex-col'>
                    <label
                      className='h-fit hover:font-bold cursor-pointer'
                      onClick={() => setCatFilter('all')}
                    >
                      <AccordionPanel pb={4} className='text-gray-500 '>
                        <label className='capitalize gap-2 flex h-full cursor-pointer'>
                          <input
                            type='radio'
                            name='cat'
                            checked={catFilter === 'all'}
                          />
                          todos los productos
                        </label>
                      </AccordionPanel>
                    </label>
                    {category.map((cat) => (
                      <label
                        key={cat._id}
                        className='h-fit hover:font-bold cursor-pointer'
                        onClick={() => setCatFilter(cat.title)}
                      >
                        <AccordionPanel pb={4} className='text-gray-500 '>
                          <label className='capitalize gap-2 flex h-full cursor-pointer'>
                            <input type='radio' name='cat' />
                            {cat.title}
                          </label>
                        </AccordionPanel>
                      </label>
                    ))}
                  </div>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as='span'
                        flex='1'
                        textAlign='left'
                        className='capitalize font-bold'
                      >
                        precio
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <div className='flex flex-col capitalize gap-4 text-gray-500 p-0'>
                      <label
                        onClick={() => setSortFilter(1)}
                        className='gap-2 flex hover:font-bold cursor-pointer'
                      >
                        <input
                          type='radio'
                          name='price'
                          checked={sortFilter === 1}
                        />
                        menor a mayor
                      </label>

                      <label
                        onClick={() => setSortFilter(-1)}
                        className='gap-2 flex hover:font-bold cursor-pointer'
                      >
                        <input type='radio' name='price' />
                        mayor a menor
                      </label>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        as='span'
                        flex='1'
                        textAlign='left'
                        className='capitalize font-bold'
                      >
                        coleccion
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <div className='flex flex-col'>
                    <AccordionPanel
                      pb={4}
                      className='text-gray-500 p-0'
                      onClick={() => setCollectionFilter('all')}
                    >
                      <label className='capitalize gap-2 flex hover:font-bold cursor-pointer'>
                        <input
                          type='radio'
                          name='coll'
                          checked={collectFilter === 'all'}
                        />
                        todos los productos
                      </label>
                    </AccordionPanel>
                  </div>
                  <div>
                    {collections.map((cat) => (
                      <div key={cat._id}>
                        <AccordionPanel
                          pb={4}
                          className='text-gray-500 p-0'
                          onClick={() => setCollectionFilter(cat.title)}
                        >
                          <label className='capitalize gap-2 flex hover:font-bold cursor-pointer'>
                            <input type='radio' name='coll' />
                            {cat.title == 'all'
                              ? 'todos los productos'
                              : cat.title}
                          </label>
                        </AccordionPanel>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
            </ChakraProvider>
          </div>
        </div>
        {showMenu && (
          <div
            className='bg-custom_transparent fixed w-screen h-screen'
            onClick={() => {
              setShowMenu(!showMenu);
              setIsScrollDisabled(!isScrollDisabled);
            }}
          ></div>
        )}

        <section
          className={
            product.length == 0
              ? 'flex justify-center items-center h-72 w-full'
              : 'w-full'
          }
        >
          {product.length == 0 ? (
            <div className='uppercase font-bold flex flex-col items-center my-0 mx-auto'>
              <p className='my-0 mx-auto'>
                no hay productos <span>:(</span>
              </p>
            </div>
          ) : (
            <GridArticle products={product} title='' />
          )}
        </section>
      </div>
    </div>
  );
};

export default Catalog;
