import { IconTrash } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCategories, getProducts } from "@/actions/actions";

import {
  type categories,
  type products,
  type productsInSale,
} from "@prisma/client";
import { useEffect, useState } from "react";
export const ProductsInSale = ({
  searchParams,
  updateProductsInSale,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  updateProductsInSale: (product: productsInSale) => void;
}) => {
  const [categories, setCategories] = useState<categories[]>([]);
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    const getCategoriesAndProducts = async () => {
      const categories = await getCategories();
      if (categories && searchParams.category === undefined) {
        redirect(`?category=${categories[0].id}`);
      }
      if (searchParams.category === undefined) return null;

      const products = await getProducts(Number(searchParams.category));
      setProducts(products);
      setCategories(categories);
    };
    getCategoriesAndProducts();
  }, [searchParams]);

  return (
    <aside className="flex flex-col w-full p-5">
      <table className="w-full text-[#333] font-semibold rounded-md overflow-hidden shadow-sm shadow-black/20">
        <thead>
          <tr className="bg-[#ffb400] h-10 font-bold text-white">
            <th>Cant</th>
            <th>Producto</th>
            <th>Total</th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          <tr className=" h-12 bg-white text-center">
            <td>1</td>
            <td>Brisket</td>
            <td>17000</td>
            <td className="flex h-12 w-full justify-center items-center">
              <button type="button" className="p-1 rounded-lg bg-red-500">
                <IconTrash className="text-white" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <section className="w-full">
        <nav>
          <ul className="flex gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`?category=${category.id}`}
                  className={`px-2 py-1 `}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className=" flex flex-wrap gap-5">
          {products.map((product) => (
            <button key={product.id} className="border-2 px-2 py-1 rounded ">
              {product.name}
            </button>
          ))}
        </article>
      </section>
    </aside>
  );
};
