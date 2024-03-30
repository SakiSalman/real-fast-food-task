"use client"
import ProductCard from '@/components/Cards/ProductCard'
import { AppContext } from '@/context/appContext'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { GoPlusCircle } from 'react-icons/go'
import { ScaleLoader } from 'react-spinners'

type Props = {}

const ShopPageUI = (props: Props) => {
    const { cart,products, setProducts} = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const hadnleGetProduct = async () => {
        setLoading(true)
        try {
            await fetch('https://fakestoreapi.com/products/')
                .then(res => res.json())
                .then(json => setProducts(json))
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }    
    return (
        <>
            {
                loading && <div className='h-screen w-full flex justify-center items-center'>
                    <ScaleLoader color="#4C52C4" />
                </div>  
            }
            {
               !loading && products?.length ? <div className='h-screen w-full'>
                <div className='_container'>
                <div className='grid grid-cols-2 md:grid-cols-4 p-3 gap-3 md:gap-5  py-5 '>
                       {
                        products?.length > 0 && products?.map((data, index) => {
                            return  <ProductCard data={data} key={index}></ProductCard>
                        })
                       }
                    </div>
                </div>
                   
               </div> : <div className='h-screen w-full'>
                    <div className='h-full w-full flex justify-center items-center'>
                        <div>
                            <div className='flex justify-center mb-3'>
                                <Image width={80} height={90} src="/catalog.svg" alt="" />
                            </div>
                            <div>
                                <h6 className='text-base font-medium text-bodyText text-center'>No product added yet</h6>
                                <p className='text-sm font-normal text-center text-bodyText'>Please tap “+” button below to add new product</p>
                                <div className='flex justify-center my-3'>
                                    <button onClick={hadnleGetProduct} className='text-4xl text-bodyText text-center'><GoPlusCircle /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default ShopPageUI