import PropTypes from 'prop-types';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DraggableCard = ({ img }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div
      className={`relative w-60`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      draggable='true'
      onDragStart={(e) => e.preventDefault()}
    >
      <div className='pointer-events-auto'>
        <div
          className={`w-full h-full block overflow-hidden relative content-center  bg-red-500 ${
            isHovered && 'brightness-75'
          }`}
        >
          <img
            src={img}
            className='block object-cover w-full h-full pointer-events-none'
          />
        </div>
      </div>
      <div className='absolute top-0 z-10 w-full h-full cursor-move'>
        {isHovered && (
          <button
            className='absolute w-16 h-8 font-bold text-white uppercase transform -translate-x-1/2 -translate-y-1/2 border border-white cursor-pointer pointer-events-auto top-1/2 left-1/2 hover:bg-slate-600 hover:bg-opacity-50'
            onClick={handleClick}
          >
            shop
          </button>
        )}
      </div>
    </div>
  );
};

DraggableCard.propTypes = {
  img: PropTypes.string.isRequired,
};

export default DraggableCard;
