"use client"
import { AppContext } from '@/context/appContext'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineShare } from 'react-icons/hi'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { TfiSearch } from 'react-icons/tfi'

type Props = {}

const CartNav = (props: Props) => {
  const { products, setProducts } = useContext(AppContext)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const hadnleGetProduct = async () => {
    try {
      await fetch('https://fakestoreapi.com/products/')
        .then(res => res.json())
        .then(json => setProducts(json))
    } catch (error) {
    }
  }
  const handleCloseSearch = () => {
    setShowSearch(false)
    hadnleGetProduct()
  }
  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts)
  }, [searchTerm])

  return (
    <div className='w-full'>
      <div className="_container grid grid-cols-12 items-center">
        <div className='col-span-8'>
          {
            showSearch ? <div className='flex items-center gap-3'>
            <span onClick={handleCloseSearch}><RxCross2 /></span>
            <input type="search" value={searchTerm} placeholder='Search Product...' onChange={handleSearch} className='w-full border rounded-md p-2' />
            </div> : <div className='flex  items-center gap-3'><Link href={'/'} className='text-[22px]'><IoIosArrowRoundBack /></Link><h2 className='text-lg font-medium text-primaryBlack'>Real Food Store</h2></div>

          }
          
        </div>
        <div className='col-span-4 flex justify-end items-center gap-4'>
          {
            !showSearch && <span onClick={() => setShowSearch(true)} className='text-[22px] hover:text-primaryBlue'><TfiSearch /></span>
          }
          <span className='text-[22px] hover:text-primaryBlue'><HiOutlineShare /></span>
        </div>
      </div>

    </div>
  )
}

export default CartNav
