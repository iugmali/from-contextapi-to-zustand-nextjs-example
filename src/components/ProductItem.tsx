'use client'

import {TProduct} from "@/types/product";
import styles from "./ProductItem.module.css";
import {useContext} from "react";
import CartContext from "@/store/cartContext";
import {formatCurrency} from "@/lib/util";

type Props = {
  product: TProduct;
}

const ProductItem = ({product}: Props) => {
  const {addProduct} = useContext(CartContext);
  return (
    <div className={styles.product}>
      <h2 className={`${styles.field} ${styles.name}`}>{product.name}</h2>
      <p className={`${styles.field} ${styles.price}`}>{formatCurrency(product.price)}</p>
      <div className={styles.actions}>
        <button className={styles.actions__cart} onClick={() => addProduct(product)}>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductItem;
