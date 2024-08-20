
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Aqar from '../assets/Aqar.png'
import Search from '../assets/Search.svg'
export default function Header() {
    const serachRef = useRef();
  return (
<header className='bg-slate-200 shadow-md'>
    <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
    <form className='flex items-center justify-center  max-w-sm gap-2 bg-slate-50 rounded-lg px-4'>
            <input type="text" ref={serachRef} placeholder='Search...' className='text-slate-500 bg-transparent focus:outline-none w-24 sm:w-44 md:w-54'/>
            <img src={Search} onClick={() => serachRef.current.focus()} className='cursor-pointer'></img>
        </form>
        <h1 className='font-bold text-sm sm:text-xl flex  justify-center items-center'>
            <img src={Aqar} className='h-15 w-20'></img>
            <span className='text-slate-500 first-letter:text-red-700 hidden sm:inline '>AQAR</span>
            <span className='text-slate-600 hidden sm:inline'>PAL</span>
        </h1>
      <ul className='list-none flex justify-between items-center w-40 gap-4 '>
        <li className='hover:underline active:text-red-400'>
            <Link to='/Home'>Home</Link>
        </li>
        <li className='hover:underline active:text-red-400'>
            <Link to='/Profile'>Profile</Link>
        </li>
        <li className='hover:underline active:text-red-400'>
            <Link to='/About'>About</Link>
        </li>
      </ul>
    </div>
</header>  )
}
