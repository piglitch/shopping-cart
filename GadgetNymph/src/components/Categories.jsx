import { Link } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
}

export default function ActiveLastBreadcrumb() {
  return (
    <div 
      role="presentation" 
      onClick={handleClick} 
      className='
          mt-20
          bg-slate-700 p-1 
          flex justify-center 
          gap-5 text-white 
          text-sm'>
        <Link className='hover:underline' to="/category">
          Electronics
        </Link>            
        <Link className='hover:underline' to="path">Backpack</Link>
        <Link className='hover:underline' to="path">Backpack</Link>
        <Link className='hover:underline' to="path">Backpack</Link>
        <Link className='hover:underline' to="path">Backpack</Link>
        <Link className='hover:underline' to="path">Backpack</Link>
    </div>
  );
}
