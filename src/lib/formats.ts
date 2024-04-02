import {
    type ExtendedProductsInSale,
    type ExtendedSales,
} from '@/interfaces/interfaces'
export const formatPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
})

export const calculateTotal = (productsInSale: ExtendedProductsInSale[]) => {
    const total = productsInSale?.reduce((acc, current) => {
        return acc + current.total
    }, 0)

    return formatPrice.format(total)
}
export const calculateTotalSales = (sales: ExtendedSales[]): number => {
    const total = sales
        .flatMap((sale) => sale.productsInSale.map((product) => product.total))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return total
}
