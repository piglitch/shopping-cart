import { Link, useLocation } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
}

export default function ActiveLastBreadcrumb() {
  const location = useLocation();
  const currentPathname = location.pathname;

  return (
    <div 
      role="presentation" 
      onClick={handleClick} 
      className='
          mt-20
          bg-slate-700 p-1 
          flex sm:justify-around md:justify-center 
          gap-5 text-white font-thin
          text-sm lg:text-lg'>
        <Link className={currentPathname === '/category/electronics' ? 'underline' : 'hover:underline'} to="/category/electronics">
          Electronics
        </Link>            
        <Link className={currentPathname === '/category/mensclothing' ? 'underline' : 'hover:underline'} to="/category/mensclothing">
          Men's Clothing
        </Link>
        <Link className={currentPathname === '/category/womensclothing' ? 'underline' : 'hover:underline'} to="/category/womensclothing">
          Women's Clothing
        </Link>
        <Link className={currentPathname === '/category/jewelery' ? 'underline' : 'hover:underline'} to="/category/jewelery">
          Jeweleries
        </Link>
    </div>
  );
}
