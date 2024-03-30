"use client"
import { AppContext } from '@/context/appContext'
import { ProductModels } from '@/models/ProductModel'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

type Props = {}

const InitialState = (props: Props) => {
    const {cart, setCart, cartOpen, setCartOpen, total, setTotal, quantity, setQuantity} = useContext(AppContext)

    useEffect(() => {
        let catItem = localStorage.getItem('cart')
        if (catItem) {
            let parseItem = JSON.parse(catItem)
            
            setCart(parseItem)
            setCartOpen(true)
        } else {
            localStorage.setItem('cart', JSON.stringify([]))
            setCart([])
            setCartOpen(false)
        }
    }, [])

    const calculateCartSummary = (
        cart: { data: ProductModels, quantity: number }[]
    ) => {
        if (cart.length > 0) {          
            let { total, totalQuantity } = cart.reduce((acc, item) => {
                const itemSubTotal = item?.data?.price * item?.quantity;
                acc.total += itemSubTotal;
                acc.totalQuantity += item?.quantity
                //acc.discountPrice += (item?.data?.discountPrice ?? 0.00 * item?.quantity);
                return acc;
            }, { total: 0, totalQuantity : 0 });
            setQuantity(totalQuantity)
            setTotal(total)
        } else {
            setTotal(0)
        }
    };
    useEffect(() => {
        calculateCartSummary(cart);
    }, [cart]);    
  return (
    <Link href={'/cart'} className='w-full'>
        {
            <div className={`w-full bg-transparent fixed left-0 flex justify-center items-center ${cart?.length > 0 ? "cart-active" : "cart-inactive"}`}>
            <div className='w-[95vw] md:w-[690px] h-14 p-3 flex justify-between items-center  bg-[#4C52C4] rounded-lg'>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-[#00E5C9] rounded-full text-xl text-white flex justify-center items-center'>{quantity}</div>
                    <p className='text-white font-medium text-sm'>In your cart</p>
                </div>
                <div className='flex items-center'><span className='text-lg font-medium text-white'>&#8377;</span> <span className='text-lg font-medium text-white flex items-center gap-2'>{total.toFixed(2)} <IoIosArrowForward /></span></div>
            </div>
            </div>
        }
    </Link>
  )
}

export default InitialState