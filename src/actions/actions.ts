'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const addSale = async (formData: FormData) => {
    try {
        const productsInSale = formData.get('productsInSale') as string
        const phone = formData.get('phone') as string
        const name = formData.get('name') as string
        const saleType = formData.get('saleType') as
            | 'delivery'
            | 'eatHere'
            | 'pickUp'
        const street = formData.get('street') as string
        const number = formData.get('number') as string
        const neighborhoodId = formData.get('neighborhood') as string
        const domiciliary = formData.get('domiciliary') as string
        const deliveryPrice = formData.get('deliveryPrice') as string
        const observations = formData.get('observations') as string

        const neighborhood = await db.neighborhood.findUnique({
            where: {
                id: +neighborhoodId,
            },
        })
        const neighborhoodName = neighborhood?.name
        const productInSaleToPrisma = JSON.parse(productsInSale).map(
            (productInSale: any) => {
                return {
                    productId: productInSale.product.id,
                    amount: productInSale.amount,
                    total: productInSale.total,
                }
            }
        )
        let customer
        if (saleType !== 'eatHere') {
            const customerExists = await db.customers.findFirst({
                where: {
                    phone,
                },
            })
            if (customerExists) {
                customer = await db.customers.update({
                    where: {
                        id: customerExists.id,
                    },
                    data: {
                        name,
                        phone,
                        address:
                            saleType === 'delivery'
                                ? {
                                      update: {
                                          number,
                                          street,
                                          neighborhoodId: +neighborhoodId,
                                      },
                                  }
                                : undefined,
                    },
                })
            } else {
                if (saleType === 'delivery') {
                    customer = await db.customers.create({
                        data: {
                            name,
                            phone,
                            address: {
                                create: {
                                    number,
                                    street,
                                    neighborhoodId: +neighborhoodId,
                                },
                            },
                        },
                    })
                } else {
                    customer = await db.customers.create({
                        data: {
                            name,
                            phone,
                        },
                    })
                }
            }
        }

       const sale =  await db.sales.create({
            data: {
                status: 'pending',
                deliveryPrice: +deliveryPrice,
                observations,
                type: saleType,

                domiciliary: domiciliary
                    ? {
                          connect: {
                              id: +domiciliary,
                          },
                      }
                    : { connect: { id: 1 } },

                customers: {
                    connect: {
                        id: saleType === 'eatHere' ? 1 : customer?.id,
                    },
                },
                productsInSale: {
                    createMany: {
                        data: productInSaleToPrisma,
                    },
                },
            },
        })

        // const res = await fetch('http://localhost:8000/printTicket', {
        //     method: 'POST',

        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         phone,
        //         name,
        //         saleType,
        //         street,
        //         number,
        //         neighborhoodName,
        //         domiciliary,
        //         deliveryPrice,
        //         observations,
        //         productsInSale,
        //     }),
        // })

        // const data = await res.json()
        // console.log(data)
        revalidatePath('/')
        return {sale, message:"good"}
    } catch (e) {
        console.log(e)
    }
}


export const deleteSale = async (saleId: number) => {
    try {
        await db.productsInSale.deleteMany({
            where: {
                saleId}
        })

        await db.sales.delete({
            where: {
                id: saleId,
            },
        })
        revalidatePath('/')
        return {status:200, message:"Pedido eliminado con éxito"}

    } catch (e) {
        console.log(e)
        return {status:500,message:"Error al eliminar el pedido"}
    }

}


export const createNeighborhood = async (formData: FormData) => {
    const neighborhoodName = formData.get('neighborhood') as string
    await db.neighborhood.create({
        data: {
            name: neighborhoodName,
        },
    })
}

export const createDomiciliary = async (formData: FormData) => {
    const domiciliaryName = formData.get('domiciliary') as string
    await db.domiciliary.create({
        data: {
            name: domiciliaryName,
        },
    })
}

export const updateSaleStatus = async (
    saleId: number,
    status: 'pending' | 'paid'
) => {
    try {
        await db.sales.update({
            where: {
                id: saleId,
            },
            data: {
                status,
            },
        })
        revalidatePath('/')
    } catch (e) {
        console.log(e)
    }
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
