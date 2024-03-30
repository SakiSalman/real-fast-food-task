"use client"
import { usePathname } from 'next/navigation'
import GlobalNav from './GlobalNav'
import CartNav from './CartNav'

type Props = {}

const Navbar = (props: Props) => {
  const patName = usePathname()

  return (
    <div className='w-full py-4 px-2 shadow-md '>
      { 
        patName == '/cart' ? <CartNav/> : <GlobalNav/>
      } 
    </div>
  )
}

export default Navbar