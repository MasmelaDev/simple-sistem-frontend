import { IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getCategories, getProducts } from '@/actions/actions'
import { type categories, type products } from '@prisma/client'
import { useEffect, useState } from 'react'
import { type pendingProductInSale } from '@/interfaces/interfaces'

export const ProductsInSale = ({
    searchParams,
    pendingProductsInSale,
    updateProductsInSale,
}: {
    searchParams: { category: string }
    pendingProductsInSale: pendingProductInSale[]
    updateProductsInSale: (pendingProductInSale: pendingProductInSale[]) => void
}) => {
    const router = useRouter()
    const [categories, setCategories] = useState<categories[]>([])
    const [products, setProducts] = useState<products[]>([])

    useEffect(() => {
        const getCategoriesAndProducts = async () => {
            const categories = await getCategories()

            if (searchParams.category === undefined) {
                router.push(`?category=${categories[0].id}`)

                return null
            }

            const products = await getProducts(Number(searchParams.category))
            setProducts(products)
            setCategories(categories)
        }
        getCategoriesAndProducts().catch((error) => console.error(error))
    }, [searchParams, router])

    const createProductInSale = (product: products) => {
        const existsProductInSale = pendingProductsInSale.find(
            (productInSale) => productInSale.product.id === product.id
        )
        if (existsProductInSale) {
            const updatedProductsInSale = pendingProductsInSale.map(
                (productInSale) => {
                    if (productInSale.product.id === product.id) {
                        return {
                            ...productInSale,
                            amount: productInSale.amount + 1,
                            total: product.price * (productInSale.amount + 1),
                        }
                    }
                    return productInSale
                }
            )
            updateProductsInSale(updatedProductsInSale)
        } else {
            updateProductsInSale([
                ...pendingProductsInSale,
                {
                    product,
                    amount: 1,
                    total: product.price,
                },
            ])
        }
    }
    const deleteProductInSale = (product: products) => {
        const updatedProductsInSale = pendingProductsInSale.filter(
            (productInSale) => productInSale.product.id !== product.id
        )
        updateProductsInSale(updatedProductsInSale)
    }
    return (
        <aside className="flex flex-col w-full p-10 ">
            <div className="min-h-60 shadow-sm shadow-black/20 rounded-md overflow-hidden">
                <table className="w-full text-[#333] font-medium   ">
                    <thead>
                        <tr className="bg-[#ffb400] h-10 font-bold text-white">
                            <th className="w-3/12">Cant</th>
                            <th className="w-5/12">Producto</th>
                            <th className="w-3/12">Total</th>
                            <th className="w-1/12"></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <AnimatePresence>
                            {pendingProductsInSale.map((productInSale) => (
                                <motion.tr
                                    layoutId={`${productInSale.product.id}`}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        type: 'tween',
                                    }}
                                    key={productInSale.product.id}
                                    className=" h-12 bg-white text-center"
                                >
                                    <td>{productInSale.amount}</td>
                                    <td>{productInSale.product.name}</td>
                                    <td>{productInSale.total}</td>
                                    <td className="flex h-12 w-full justify-center items-center">
                                        <button
                                            onClick={() => {
                                                deleteProductInSale(
                                                    productInSale.product
                                                )
                                            }}
                                            type="button"
                                            className="p-1 rounded-lg bg-red-500 scale-90 hover:scale-100 transition-all"
                                        >
                                            <IconTrash className="text-white " />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <section className="w-full mt-10">
                <nav>
                    <ul className="flex gap-2">
                        {categories.map((category) => (
                            <li
                                className={`border border-b-0 p-1  rounded-t-md relative  transition-all  ${+searchParams.category === category.id ? 'font-medium top-0 py-2' : 'top-3 pb-3'}`}
                                key={category.id}
                            >
                                <Link
                                    scroll={false}
                                    href={`?category=${category.id}`}
                                    className={`px-2 py-1 ]`}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <article className=" flex flex-wrap gap-5 border p-5 justify-center relative z-20 bg-white rounded-b-md rounded-tr-md min-h-40 items-center shadow-sm shadow-black/20">
                    {products.map((product) => (
                        <button
                            type="button"
                            onClick={() => createProductInSale(product)}
                            key={product.id}
                            className="border-2 px-2 py-1 rounded "
                        >
                            {product.name}
                        </button>
                    ))}
                </article>
            </section>
        </aside>
    )
}
