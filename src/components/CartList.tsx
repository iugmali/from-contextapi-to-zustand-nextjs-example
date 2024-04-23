'use client'

import {formatCurrency} from "@/lib/util";
import styles from "./CartList.module.css";
import CartItem from "@/components/CartItem";
import {useCartStore} from "@/store/useCartStore";

const CartList = () => {
  const loading = false;
  const totalPrice = useCartStore(state => state.totalPrice);
  const products = useCartStore(state => state.products);
  const clearCart = useCartStore(state => state.clearCart);

  return loading ? (
    <div className={'loading'}>Loading...</div>
  ) : (totalPrice === 0) ? (
      <div className={styles.cart}>No items added yet.</div>
    ) : (
      <div className={styles.cart}>
        <h2 className={styles.cart__heading}>Cart</h2>
        <ul className={styles.cart__list}>
          {products.map((product) => (
            <CartItem product={product} key={product.id} />
          ))}
        </ul>
        <div className={styles.cart__list__total}>{formatCurrency(totalPrice)}</div>
        <button className={styles.clear__button} onClick={clearCart}>Clear Cart</button>
      </div>
    )
}

export default CartList;
