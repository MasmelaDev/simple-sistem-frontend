'use server'

import { db } from '@/lib/prisma'

export const addSale = async (formData: FormData) => {
    const productsInSale = JSON.parse(formData.get('productsInSale') as string)
    console.log(formData)
}

export const getCategories = async () => {
    const categories = await db.categories.findMany()
    return categories
}

export const getProducts = async (categoryId: number) => {
    const products = await db.products.findMany({
        where: {
            categoryId,
        },
    })
    return products
}
