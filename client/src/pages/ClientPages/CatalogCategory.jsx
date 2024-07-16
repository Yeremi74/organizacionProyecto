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

const CatalogCategory = () => {
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
  const [catFilter, setCatFilter] = useState(params.cat || 'all');
  const [sortFilter, setSortFilter] = useState(1);
  const [collectFilter, setCollectionFilter] = useState('all');

  useEffect(() => {
    const objFunc = async () => {
      console.log(params);
      //   setCatFilter(params.cat === '*' ? 'all' : params.cat);
      const res = await filterProduct(catFilter, collectFilter, sortFilter);
      setProduct(res);
      await getCategory();
      await getCollections();
    };
    objFunc();
  }, [
    params.cat,
    catFilter,
    // params.collections,
    // params,
    // setCollectionFilter,
    collectFilter,
    sortFilter,
  ]);
  getCollections;
  //! : setCatFilter(cat.title);
  return (
    <div>
      <div className='relative'>
        <Navbar />
        <div className='fixed z-10 flex justify-end w-full p-2 bg-white'>
          <p
            className='z-20 flex items-center text-sm font-bold capitalize'
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
                        className='font-bold text-black capitalize'
                      >
                        category
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <div className='flex flex-col'>
                    <label
                      className='cursor-pointer h-fit hover:font-bold'
                      onClick={() => setCatFilter('all')}
                    >
                      <AccordionPanel pb={4} className='text-gray-500'>
                        <label className='flex h-full gap-2 capitalize cursor-pointer'>
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
                        className='cursor-pointer h-fit hover:font-bold'
                        onClick={() => setCatFilter(cat.title)}
                      >
                        <AccordionPanel pb={4} className='text-gray-500'>
                          <label className='flex h-full gap-2 capitalize cursor-pointer'>
                            <input
                              type='radio'
                              name='cat'
                              checked={catFilter === cat.title}
                            />
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
                        className='font-bold capitalize'
                      >
                        precio
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <div className='flex flex-col gap-4 p-0 text-gray-500 capitalize'>
                      <label
                        onClick={() => setSortFilter(1)}
                        className='flex gap-2 cursor-pointer hover:font-bold'
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
                        className='flex gap-2 cursor-pointer hover:font-bold'
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
                        className='font-bold capitalize'
                      >
                        coleccion
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <div className='flex flex-col'>
                    <AccordionPanel
                      pb={4}
                      className='p-0 text-gray-500 cursor-pointer'
                      onClick={() => setCollectionFilter('all')}
                    >
                      <label className='flex gap-2 capitalize cursor-pointer hover:font-bold'>
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
                          className='p-0 text-gray-500'
                          onClick={() => setCollectionFilter(cat.title)}
                        >
                          <label className='flex gap-2 capitalize cursor-pointer hover:font-bold'>
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
            className='fixed w-screen h-screen bg-custom_transparent'
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
            <div className='flex flex-col items-center mx-auto my-0 font-bold uppercase'>
              <p className='mx-auto my-0'>
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

export default CatalogCategory;
