'use server'

import { db } from '@/lib/prisma'

export const addSale = async (formData: FormData) => {
    const productsInSale = formData.get('productsInSale') as string

    const phone = formData.get('phone') as string
    const name = formData.get('name') as string
    const saleType = formData.get('saleType') as string
    const street = formData.get('street') as string
    const number = formData.get('number') as string
    const neighborhoodId = formData.get('neighborhood') as string
    const neighborhood = await db.neighborhood.findUnique({
        where: {
            id: +neighborhoodId,
        },
    })
    const neighborhoodName = neighborhood?.name
    const delivery = formData.get('delivery') as string
    const deliveryPrice = formData.get('deliveryPrice') as string
    const observations = formData.get('observations') as string

    const res = await fetch('http://localhost:8000/printTicket', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone,
            name,
            saleType,
            street,
            number,
            neighborhoodName,
            delivery,
            deliveryPrice,
            observations,
            productsInSale
        }),
    })
    console.log(
        JSON.stringify({
            phone,
            name,
            saleType,
            street,
            number,
            neighborhoodName,
            delivery,
            deliveryPrice,
            observations,
            productsInSale

        })
    )
    const data = await res.json()
    console.log(data)
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
