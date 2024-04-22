import {TProduct} from "@/types/product";
import ProductItem from "@/components/ProductItem";
import styles from "@/components/ProductList.module.css";

type Props = {
  products: TProduct[]
}

const ProductList = ({products}: Props) => {
  return (
    <ul className={styles.product__list}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductList;
