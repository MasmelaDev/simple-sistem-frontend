import {
    type address,
    type customers,
    type neighborhood,
    type products,
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
