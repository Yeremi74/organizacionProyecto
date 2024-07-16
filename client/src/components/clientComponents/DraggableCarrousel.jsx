import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import DraggableCard from './DraggableCard';

const DraggableCarrousel = () => {
  const [width, setWidth] = useState(0);

  const slider_wrapper = useRef();

  useEffect(() => {
    setWidth(
      slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth
    );
  }, []);

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full'>
        <motion.div
          className='flex w-full overflow-hidden '
          ref={slider_wrapper}
          whileTap={{ cursor: 'grabbing' }}
        >
          <motion.div
            className='inline-flex gap-3'
            drag='x'
            dragConstraints={{ right: 0, left: -width }}
          >
            <DraggableCard img='https://nude-project.com/cdn/shop/files/Sin_titulo-4_9b05e8c5-4de5-4e00-a279-20e74381db1e_400x.jpg?v=1712850536' />
            <DraggableCard img='https://nude-project.com/cdn/shop/files/Sin_titulo-9_0977f3ff-f26c-47bc-bfcb-38bee7560019_400x.jpg?v=1712859933' />
            <DraggableCard img='https://nude-project.com/cdn/shop/files/Sin_titulo-2_d6c189bc-ff3f-4b88-9e66-865db390e76e_400x.jpg?v=1712860021' />
            <DraggableCard img='https://nude-project.com/cdn/shop/files/Sintitulo-16_920c1e47-ed2e-4209-85e1-56d53191d53c_400x.jpg?v=1712851792' />
            <DraggableCard img='https://nude-project.com/cdn/shop/files/Sintitulo-1copia16_400x.jpg?v=1712853184' />
            <DraggableCard img='https://nude-project.com/cdn/shop/files/Sin_titulo-5_400x.jpg?v=1712860299' />
            <DraggableCard img='https://nude-project.com/cdn/shop/files/Sintitulo-8_18928791-f400-4789-813c-19760e836e85_400x.jpg?v=1712845437' />
            <DraggableCard img='https://nude-project.com/cdn/shop/files/Sintitulo-2_6f188028-6eb3-427e-81f8-ccfccdc8b859_400x.jpg?v=1712839633' />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DraggableCarrousel;
