import {
    type productsInSale,
    type address,
    type customers,
    type neighborhood,
    type products,
    type domiciliary,
    type sales,
} from '@prisma/client'

export interface pendingProductInSale {
    product: products
    amount: number
    total: number
}

export type ExtendedCustomers = customers & {
    address: ExtendedAddress
}
export type ExtendedAddress = address & {
    neighborhood: neighborhood
}
export type ExtendedProductsInSale = productsInSale & {
    product: products
}
export type ExtendedSales = sales & {
    productsInSale: ExtendedProductsInSale[]
    customers: ExtendedCustomers
    domiciliary: domiciliary
}
