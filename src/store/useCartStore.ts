import {create} from "zustand";
import {TCartContext} from "@/types/cart";
import {persist} from "zustand/middleware";
import {TProduct} from "@/types/product";
import {produce} from "immer";

export const useCartStore = create<TCartContext>()(
  persist(
    (set, get) => ({
      products: [],
      totalPrice: 0,
      totalQuantity: 0,
      addProduct: (product: TProduct) => {
        if (get().isInCart(product)) {
          const index = get().products.findIndex(item => item.id === product.id);
          set(
            produce(
              state => {
                state.totalQuantity++;
                state.totalPrice += product.price;
                state.products[index].quantity++;
              }
            )
          )
        } else {
          set(
            produce(
              state => {
                state.totalQuantity++;
                state.totalPrice += product.price;
                state.products.push({...product, quantity: 1})
              }
            )
          )
        }
      },
      subtractProduct: (product: TProduct) => {
        if (get().isInCart(product)) {
          const index = get().products.findIndex(item => item.id === product.id);
          if (get().products[index].quantity === 1) {
            set(
              produce(
                state => {
                  state.totalQuantity--;
                  state.totalPrice -= product.price;
                  state.products.splice(index, 1)
                }
              )
            )
          } else {
            set (
              produce(
                state => {
                  state.totalQuantity--;
                  state.totalPrice -= product.price;
                  state.products[index].quantity--;
                }
              )
            )
          }
        }
      },
      removeProduct: (product: TProduct) => {
        if (get().isInCart(product)) {
          const index = get().products.findIndex(item => item.id === product.id);
          set(
            produce(
              (state) => {
                state.totalQuantity = state.totalQuantity - get().products[index].quantity;
                state.totalPrice = state.totalPrice - (get().products[index].price * get().products[index].quantity);
                state.products.splice(index, 1);
              }
            )
          )
        }
      },
      clearCart: () => set((state) => ({products: [], totalPrice: 0, totalQuantity: 0})),
      isInCart: (product: TProduct) => {
        return (get().products.findIndex(item => product.id === item.id) !== -1)
      }
    }),
    {
      name: 'cart-storage',
      // skipHydration: true
    }
  )
)
