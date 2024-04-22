'use client'

import {TCart, TCartItem} from "@/types/cart";
import React, {createContext, useEffect, useReducer, useState} from "react";
import {TProduct} from "@/types/product";

type CartContextType = {
  products: TCartItem[];
  totalPrice: number;
  totalQuantity: number;
  loading: boolean;
  addProduct: (product: TProduct) => void;
  subtractProduct: (product: TProduct) => void;
  removeProduct: (product: TProduct) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
  loading: true,
  addProduct: () => {},
  subtractProduct: () => {},
  removeProduct: () => {},
  clearCart: () => {}
});

type CartReducerAction = {
  type: 'ADD_PRODUCT' | 'SUBTRACT_PRODUCT' | 'REMOVE_PRODUCT' | 'RETRIEVE_CART' | 'CLEAR_CART';
  payload?: TProduct;
}

const cartReducer = (state: TCart, action: CartReducerAction) => {
  let cartState: TCart = state;
  let products: TCartItem[] = state.products;
  switch (action.type) {
    case 'ADD_PRODUCT':
      const existingProductIndex = state.products.findIndex(product => product.id === action.payload?.id);
      if (existingProductIndex !== -1) {
        const updatedItem = {
          ...state.products[existingProductIndex],
          quantity: state.products[existingProductIndex].quantity + 1
        }
        products = [...state.products];
        products[existingProductIndex] = updatedItem;
        const totalPrice = state.totalPrice + updatedItem.price;
        const totalQuantity = state.totalQuantity + 1;
        cartState = {
          products,
          totalPrice,
          totalQuantity
        };
      } else {
        const newProduct: TCartItem = {
          ...action.payload as TProduct,
          quantity: 1
        }
        cartState = {
          products: [...state.products, newProduct],
          totalPrice: state.totalPrice + newProduct.price,
          totalQuantity: state.totalQuantity + 1,
        }
      }
      localStorage.setItem('cart_storage', JSON.stringify(cartState));
      return cartState;
    case 'SUBTRACT_PRODUCT':
      const existingProductIndexSubtract = state.products.findIndex(product => product.id === action.payload?.id);
      products = [...state.products];
      if (existingProductIndexSubtract !== -1) {
        const existingProduct = state.products[existingProductIndexSubtract];
        if (existingProduct.quantity === 1) {
          products.splice(existingProductIndexSubtract, 1);
        } else {
          products[existingProductIndexSubtract] = {
            ...existingProduct,
            quantity: existingProduct.quantity - 1
          };
        }
        const totalPrice = state.totalPrice - existingProduct.price;
        const totalQuantity = state.totalQuantity - 1;
        cartState = {
          products,
          totalPrice,
          totalQuantity
        };
        localStorage.setItem('cart_storage', JSON.stringify(cartState));
      }
      return cartState;
    case 'REMOVE_PRODUCT':
      const existingProductIndexRemove = state.products.findIndex(product => product.id === action.payload?.id);
      if (existingProductIndexRemove === -1) {
        return state;
      }
      products = [...state.products];
      const existingProduct = state.products[existingProductIndexRemove];
      const totalPrice = state.totalPrice - (existingProduct.price * existingProduct.quantity);
      const totalQuantity = state.totalQuantity - existingProduct.quantity;
      products.splice(existingProductIndexRemove, 1);
      cartState = {
        products,
        totalPrice,
        totalQuantity
      };
      localStorage.setItem('cart_storage', JSON.stringify(cartState));
      return cartState;
    case 'RETRIEVE_CART':
      const cart = localStorage.getItem('cart_storage');
      if (cart) {
        return JSON.parse(cart);
      }
      return state;
    case 'CLEAR_CART':
      localStorage.removeItem('cart_storage');
      return initialState;
    default:
      return state;
  }
}

const initialState: TCart = {
  products: [],
  totalPrice: 0,
  totalQuantity: 0
}

export const CartContextProvider = ({children}: {children: React.ReactNode}) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({type: 'RETRIEVE_CART'});
    setLoading(false);
  }, [loading]);

  const addProductHandler = (product: TProduct) => {
    dispatch({type: 'ADD_PRODUCT', payload: product});
  }

  const subtractProductHandler = (product: TProduct) => {
    dispatch({type: 'SUBTRACT_PRODUCT', payload: product});
  }

  const removeProductHandler = (product: TProduct) => {
    dispatch({type: 'REMOVE_PRODUCT', payload: product});
  }

  const clearCartHandler = () => {
    dispatch({type: 'CLEAR_CART'});
  }

  return (
    <CartContext.Provider value={{
      products: cartState.products,
      totalPrice: cartState.totalPrice,
      totalQuantity: cartState.totalQuantity,
      loading,
      addProduct: addProductHandler,
      subtractProduct: subtractProductHandler,
      removeProduct: removeProductHandler,
      clearCart: clearCartHandler
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;
