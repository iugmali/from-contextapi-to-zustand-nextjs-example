'use client'

import styles from "@/components/CartItem.module.css";
import {formatCurrency} from "@/lib/util";
import {TCartItem} from "@/types/cart";
import {useContext} from "react";
import CartContext from "@/store/cartContext";

type Props = {
  product: TCartItem;
}

const CartItem = ({product}: Props) => {
  const {addProduct, subtractProduct, removeProduct} = useContext(CartContext);

  return (
    <div className={styles.cart__list__item__container}>
      <li className={styles.cart__list__item}>
        <span>{product.name}</span>
        <span>{formatCurrency(product.price)}</span>
        <span>
          <button className={styles.cart__list__item__button} onClick={() => subtractProduct(product)}>-</button>
          {product.quantity}
          <button className={styles.cart__list__item__button} onClick={() => addProduct(product)}>+</button>
        </span>
        <span>{formatCurrency(product.quantity * product.price)}</span>
      </li>
      <button className={styles.cart__list__item__button} onClick={() => removeProduct(product)}>X</button>
    </div>

  )
}

export default CartItem;
