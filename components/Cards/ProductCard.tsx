import { AppContext } from '@/context/appContext'
import { useHandleCart } from '@/hooks/useCart'
import { ProductModels } from '@/models/ProductModel'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { BsFileMinus, BsPlusLg } from 'react-icons/bs'
import { HiOutlineMinus } from 'react-icons/hi'
import { IoMdCart } from 'react-icons/io'

type Props = {
    data: ProductModels
}

const ProductCard = ({data}: Props) => {
    const [showQuantity, setShowQuantity] = useState(false)
    const { handleAddToCart, increaseProductQuantity, decreseProductQuantity } = useHandleCart(data);
    const [prodQuantity, setProdQuantity] = useState(0)
    const {cart} = useContext(AppContext)

    const handleCart = (data:ProductModels) => {
        handleAddToCart(data)
        setShowQuantity(true)
    }

    useEffect(() => {
        if (cart?.length) {
           const matchedCartItem =  cart.find((item:any, index:any) => item?.data?.id == data?.id)           
           if (matchedCartItem) {
            setShowQuantity(true)
            setProdQuantity(matchedCartItem?.quantity)
           }
        }else{
            setShowQuantity(false)
            setProdQuantity(1)
        }
    }, [cart])
    return (
        <div className='shadow-md overflow-hidden rounded-md'>
            <div>
                <Image className='w-full h-[154px] md:h-[350px] object-cover' width={10} height={10} sizes='100vw' alt='prod_alt' src={data?.image ?? "/placeholder.avif"} />
            </div>
            <div className='py-7 px-3'>
                <h3 className='text-sm font-medium text-primaryBlack py-2'>{data?.title}</h3>
                <div className='flex items-center gap-x-2 pb-3'>
                    {
                        data?.discount_price && <p className='text-xs text-bodyText font-normal'>$500</p>
                    }
                    <p className='text-xs text-primaryBlack font-medium'>${data?.price}</p>
                </div>
                <div className=''>
                    {
                        showQuantity ?  <div className='flex gap-3 items-center'>
                        <button onClick={() => decreseProductQuantity(data?.id)} className='text-4xl font-light'><HiOutlineMinus /></button>
                        <input readOnly className='w-8' type="number" min={1} value={prodQuantity}/>
                        <button onClick={() => increaseProductQuantity(data?.id)} className='text-4xl font-light text-primaryBlue'><BsPlusLg /></button>
                    </div> :  <button onClick={() => handleCart(data)}  className='flex justify-center items-center text-[28px] text-primaryBlue'><span><IoMdCart /></span></button>
                    }
                   
                </div>
            </div>

        </div>
    )
}

export default ProductCard