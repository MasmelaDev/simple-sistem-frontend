import { db } from '@/lib/prisma'
import React from 'react'
import { calculateTotal } from '@/lib/formats'
import { CashInBox } from '@/components/cash-in-box'
import {
    type ExtendedProductsInSale,
    type ExtendedSales,
} from '@/interfaces/interfaces'
import { UpdateSaleButton } from '@/components/update-sale-button'
import Link from 'next/link'
import { IconX } from '@tabler/icons-react'
const Ventas = async ({ searchParams }: { searchParams: { sale: string } }) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const sales = await db.sales.findMany({
        where: { createdAt: { gte: today } },
        include: {
            productsInSale: {
                include: {
                    product: true,
                },
            },
            domiciliary: true,
            customers: {
                include: {
                    address: {
                        include: {
                            neighborhood: true,
                        },
                    },
                },
            },
        },
    })
    const selectedSale = sales.find((venta) => venta.id === +searchParams.sale)
    const salesPending = sales.filter((venta) => venta.status === 'pending')
    const salesPaid = sales.filter((venta) => venta.status === 'paid')
    const options: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Habilita el formato de 12 horas (AM/PM)
    }
    return (
        <main className="lg:flex gap-10 min-h-screen items-center lg:px-10">
            <section className="lg:w-7/12">
                <h1 className="text-center text-4xl font-semisemibold text-[#ffb400] py-10">
                    Venta Del Dia
                </h1>
                <section className="p-1 pb-10">
                    <h2 className="text-blue-600 mb-2 font-medium text-lg text-center">
                        Pedidos Pendientes
                    </h2>
                    <table
                        className={`w-full shadow-md rounded-md overflow-hidden xs:text-sm text-xs sm:text-base`}
                    >
                        <thead>
                            <tr className=" h-8 bg-blue-600 text-white">
                                <th className="w-3/12">Fecha</th>
                                <th className="w-3/12">Telefono</th>
                                <th className="w-1/12">Barrio</th>
                                <th className="w-2/12">Tipo</th>
                                <th className="w-1/12">Total</th>
                                <th className="w-1/12"></th>
                            </tr>
                        </thead>
                        <tbody className="overflow-hidden relative">
                            {salesPending.length === 0 && (
                                <tr
                                    key={'sinPedidosPending'}
                                    className="text-center  h-10 "
                                >
                                    <td colSpan={6}>
                                        No hay pedidos pendientes
                                    </td>
                                </tr>
                            )}
                            {salesPending.map((sale) => {
                                return (
                                    <>
                                        <tr
                                            key={`clickerPending${sale.id}`}
                                            id={`clickerPending${sale.id}`}
                                            className="text-center h-10 absolute z-40 w-full "
                                        >
                                            <td colSpan={6}>
                                                <Link
                                                    className="w-full h-full flex absolute"
                                                    href={`?sale=${sale.id}`}
                                                ></Link>
                                            </td>
                                        </tr>
                                        <tr
                                            id={`${sale.id}`}
                                            className="text-center  h-10  border-b "
                                            key={sale.id}
                                        >
                                            <td>
                                                {sale.createdAt.toLocaleDateString(
                                                    'en-US',
                                                    options
                                                )}
                                            </td>
                                            <td>{sale.customers?.phone}</td>
                                            <td>
                                                {sale.type === 'delivery'
                                                    ? sale.customers?.address
                                                          ?.neighborhood.name
                                                    : 'N/A'}
                                            </td>
                                            <td>
                                                <span
                                                    className={`py-[2px] w-12 xs:w-14 lg:w-16 block mx-auto rounded-md text-white ${sale.type === 'delivery' && 'bg-indigo-500'} ${sale.type === 'pickUp' && 'bg-teal-500'} ${sale.type === 'eatHere' && 'bg-yellow-400'}`}
                                                >
                                                    {sale.type}
                                                </span>
                                            </td>
                                            <td>
                                                {calculateTotal(
                                                    sale.productsInSale
                                                )}
                                            </td>
                                            <td className="flex h-10 w-full justify-center items-center  ">
                                                <UpdateSaleButton
                                                    sale={sale as ExtendedSales}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </section>
                <section className="p-1 pb-10">
                    <h2 className="text-green-500 mb-2 font-medium text-lg text-center">
                        Pedidos Pagos
                    </h2>
                    <table
                        className={`w-full shadow-md rounded-md overflow-hidden xs:text-sm text-xs sm:text-base`}
                    >
                        <thead>
                            <tr className="h-8 bg-green-500 text-white ">
                                <th className="w-3/12">Fecha</th>
                                <th className="w-3/12">Telefono</th>
                                <th className="w-1/12">Barrio</th>
                                <th className="w-2/12">Tipo</th>
                                <th className="w-1/12">Total</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-hidden relative">
                            {salesPaid.length === 0 && (
                                <tr
                                    key={'sinPedidosPaid'}
                                    className="text-center  h-10 "
                                >
                                    <td colSpan={5}>No hay pedidos pagos</td>
                                </tr>
                            )}
                            {salesPaid.map((sale) => {
                                return (
                                    <>
                                        <tr
                                            key={`clickerPaid${sale.id}`}
                                            id={`clickerPaid${sale.id}`}
                                            className="text-center  h-10 absolute z-40 w-full "
                                        >
                                            <td colSpan={6}>
                                                <Link
                                                    className="w-full h-full flex absolute"
                                                    href={`?sale=${sale.id}`}
                                                ></Link>
                                            </td>
                                        </tr>
                                        <tr
                                            id={`${sale.id}`}
                                            className="text-center  h-10 border-b"
                                            key={sale.id}
                                        >
                                            <td>
                                                {sale.createdAt.toLocaleDateString(
                                                    'en-US',
                                                    options
                                                )}
                                            </td>
                                            <td>{sale.customers?.phone}</td>
                                            <td>
                                                {sale.type === 'delivery'
                                                    ? sale.customers?.address
                                                          ?.neighborhood.name
                                                    : 'N/A'}
                                            </td>
                                            <td>
                                                <span
                                                    className={`py-[2px] w-12 xs:w-14 lg:w-16 block mx-auto rounded-md text-white ${sale.type === 'delivery' && 'bg-indigo-500'} ${sale.type === 'pickUp' && 'bg-teal-500'} ${sale.type === 'eatHere' && 'bg-yellow-400'}`}
                                                >
                                                    {sale.type}
                                                </span>
                                            </td>
                                            <td>
                                                {calculateTotal(
                                                    sale.productsInSale
                                                )}
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </section>

                <CashInBox salesPaid={salesPaid as ExtendedSales[]} />
            </section>
            <section
                style={{ display: searchParams.sale ? 'flex' : '' }}
                className="w-screen h-screen bg-white fixed top-0 left-0 z-50 hidden lg:flex flex-col lg:w-5/12  lg:overflow-y-auto lg:overflow-x-hidden  lg:shadow-md shadow-black/30 lg:border  lg:h-[calc(100vh-10rem)] lg:rounded-lg lg:relative p-5
                pt-10 "
            >
                <Link
                    className="absolute top-2 right-2 lg:hidden block"
                    href={'/ventas'}
                >
                    <IconX size={28} />
                </Link>
                <h2 className="text-[#ffb400] font-semibold text-2xl text-center pb-8">
                    {searchParams.sale
                        ? `Detalles del pedido ${selectedSale?.id}`
                        : `Selecciona un pedido para ver detalles`}
                </h2>
                <p className="mb-2">
                    <span className="font-semibold mr-2">Nombre:</span>
                    <span>{selectedSale?.customers?.name}</span>
                </p>
                <p className="mb-2">
                    <span className="font-semibold mr-2">Telefono:</span>
                    <span>{selectedSale?.customers?.phone}</span>
                </p>
                <p className="mb-2">
                    <span className="font-semibold mr-2">Direccion:</span>
                    <span>
                        {selectedSale?.customers?.address?.street} #{' '}
                        {selectedSale?.customers?.address?.number}
                    </span>
                </p>
                <p className="mb-2">
                    <span className="font-semibold mr-2">Barrio:</span>
                    <span>
                        {selectedSale?.customers?.address?.neighborhood.name}
                    </span>
                </p>
                <p className="mb-2">
                    <span className="font-semibold mr-2">Observaciones:</span>
                    <span>{selectedSale?.observations}</span>
                </p>
                <p className="mb-2">
                    <span className="font-semibold mr-2">Domiciliario:</span>
                    <span>{selectedSale?.domiciliary?.name}</span>
                </p>
                <p className="mb-2">
                    <span className="font-semibold mr-2">
                        Estado del pedido:
                    </span>
                    <span>{selectedSale?.status}</span>
                </p>
                <p className="mb-2">
                    <span className="font-semibold mr-2">Tipo de pedido:</span>
                    <span>{selectedSale?.type}</span>
                </p>
                <p className="mb-10">
                    <span className="font-semibold mr-2">Fecha:</span>
                    <span>
                        {selectedSale?.createdAt.toLocaleDateString(
                            'en-US',
                            options
                        )}
                    </span>
                </p>

                <table className="rounded-md overflow-hidden shadow shadow-black/30">
                    <thead>
                        <tr className="bg-[#ffb400] text-white h-12 ">
                            <th className="w-1/4">Producto</th>
                            <th className="w-1/4">Cantidad</th>
                            <th className="w-1/4">Precio</th>
                            <th className="w-1/4">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedSale?.productsInSale.map((productInSale) => {
                            return (
                                <tr
                                    className="text-center border-b h-12  "
                                    key={productInSale.id}
                                >
                                    <td className=" ">
                                        {productInSale.product.name}
                                    </td>
                                    <td>{productInSale.amount}</td>
                                    <td>{productInSale.product.price}</td>
                                    <td>{productInSale.total}</td>
                                </tr>
                            )
                        })}
                        <tr className="h-12">
                            <td colSpan={3} className="text-right border">
                                <span className="mr-1">Total:</span>
                            </td>
                            <td colSpan={1} className="text-left border">
                                <span className="ml-1">
                                    {calculateTotal(
                                        selectedSale?.productsInSale as ExtendedProductsInSale[]
                                    )}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Ventas
