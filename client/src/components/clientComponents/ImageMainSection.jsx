import { Link } from 'react-router-dom';
const ImageMainSection = () => {
  return (
    <Link className='h-96 w-full sm:h-full sm:w-full bg-green-400' to='/'>
      <img
        src='https://nude-project.com/cdn/shop/files/DESKTOP_4958ffd1-d5fd-42c1-b99c-b7c941cbbc1b.jpg?v=1709121536'
        alt=''
        className='h-96 w-full sm:h-full sm:w-full bg-green-400 object-cover'
      />
    </Link>
  );
};

export default ImageMainSection;
