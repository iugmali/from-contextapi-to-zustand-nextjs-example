import {getProducts} from "@/data/products";
import ProductList from "@/components/ProductList";

const HomePage = async () => {
  const products = await getProducts();
  return (
    <main>
      <ProductList products={products}/>
    </main>
  );
}

export default HomePage;
