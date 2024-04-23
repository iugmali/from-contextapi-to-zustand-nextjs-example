import {TProduct} from "@/types/product";

export type TCart = {
  products: TCartItem[];
  totalPrice: number;
  totalQuantity: number;
}

export type TCartItem = TProduct &{
  quantity: number;
}

export type TCartContext = {
   products: TCartItem[];
   totalPrice: number;
   totalQuantity: number;
   loading?: boolean;
   addProduct: (product: TProduct) => void;
   subtractProduct: (product: TProduct) => void;
   removeProduct: (product: TProduct) => void;
   clearCart: () => void;
   isInCart: (product: TProduct) => boolean;
}
