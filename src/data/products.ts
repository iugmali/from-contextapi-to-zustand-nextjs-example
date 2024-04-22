import {TProduct} from "@/types/product";

const products: TProduct[] = [
  {
    id: "1",
    name: "A window",
    price: 300_99,
  },
  {
    id: "2",
    name: "A door",
    price: 1043_99
  },
  {
    id: "3",
    name: "A table",
    price: 530_99
  },
  {
    id: "4",
    name: "A chair",
    price: 200_67
  },
  {
    id: "5",
    name: "A bed",
    price: 1500_99
  },
  {
    id: "6",
    name: "A wardrobe",
    price: 2000_00
  },
  {
    id: "7",
    name: "A desk",
    price: 700_67
  },
  {
    id: "8",
    name: "A bookshelf",
    price: 800_00
  },
  {
    id: "9",
    name: "A sofa",
    price: 2500_00
  },
  {
    id: "10",
    name: "A TV stand",
    price: 600_00
  },
  {
    id: "11",
    name: "A lamp",
    price: 100_00
  },
  {
    id: "12",
    name: "A carpet",
    price: 400_00
  },
];

export const getProducts: () => Promise<TProduct[]> = () => {
  return new Promise((res, _) => {
    setTimeout(() => {
      res(products)
    }, 2000)
  });
}
