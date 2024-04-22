'use client';

import Link from "next/link";
import styles from "./Navbar.module.css";
import {useContext} from "react";
import CartContext from "@/store/cartContext";

const Navbar = () => {
  const {totalQuantity, loading} = useContext(CartContext);

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
