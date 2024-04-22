import {TProduct} from "@/types/product";

export type TCart = {
  products: TCartItem[];
  totalPrice: number;
  totalQuantity: number;
}

export type TCartItem = TProduct &{
  quantity: number;
}
