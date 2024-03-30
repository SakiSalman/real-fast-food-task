import { AppContext } from "@/context/appContext";
import { ProductModels } from "@/models/ProductModel";
import { useContext } from "react";
import useToast from "./useToast";

export const useHandleCart = (product: any) => {
    const {cart, setCart} = useContext(AppContext)
    const {success, warn} = useToast()

    const handleAddToCart = (data: ProductModels, quantity: number = 1) => {        
        let duplicate = "false";
        if (cart?.length > 0) {
            cart?.forEach((el: any, index: number) => {
    
                if (data?.id == el?.id) {
                    cart[index].quantity = cart[index].quantity + 1;
                    duplicate = "true"
                }
            })
        } else {
            setCart([]);
        }
        if (duplicate == "true") {
            setCart(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            success("Product added to Cart!");
        } else {            
            success("Product added to Cart!")
            localStorage.setItem("cart", JSON.stringify([...cart, { data: data, quantity: quantity }]));
            setCart([...cart, { data: data, quantity: quantity }]);
        }
        
    };
    
    const increaseProductQuantity = (id:number) => {
        
       if (cart?.length > 0) {
        const _cart = [...cart]
        
        if (_cart?.length > 0) {
          const cartItem :any = _cart.find((item:any, index) => item?.data?.id == id)          
          
          if (cartItem) {
            cartItem.quantity++
            localStorage.setItem("cart", JSON.stringify(_cart));
            setCart(_cart)
            success("Product quantity Increased!")
          }
        }
     
       }
      };
    const decreseProductQuantity = (id:number) => {
        if (cart?.length > 0) {
            const _cart = [...cart]
            if (_cart?.length > 0) {
              const cartItem :any = _cart.find((item:any, index) => item?.data?.id == id)          
              if (cartItem?.quantity == 1) {
                const removedItem = _cart.filter((item:any, index) => item?.data?.id != id)
                localStorage.setItem("cart", JSON.stringify(removedItem));
                setCart(removedItem)
                warn("Product Removed From Cart!")
              }
              if (cartItem && cartItem?.quantity > 1) {
                cartItem.quantity--
                localStorage.setItem("cart", JSON.stringify(_cart));
                setCart(_cart)
                success("Product quantity decreased!")
              }
            }
           }
      };

      return {
        increaseProductQuantity,
        decreseProductQuantity,
        handleAddToCart
      }
}
