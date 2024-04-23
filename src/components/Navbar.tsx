'use client';

import Link from "next/link";
import styles from "./Navbar.module.css";
import {useCartStore} from "@/store/useCartStore";

const Navbar = () => {
  const loading = false;
  const totalQuantity = useCartStore(state => state.totalQuantity);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        <li className={styles.navbar__item}>
          <Link href={'/'}>Products</Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href={'/cart'}>Cart ({loading ? '...' : totalQuantity})</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
