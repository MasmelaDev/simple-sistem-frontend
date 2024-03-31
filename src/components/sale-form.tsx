'use client'
import { useState } from 'react'
import { addSale } from '@/actions/actions'
import { ProductsInSale } from './products-in-sale'
import { NeighborhoodInput } from './neighborhood-input'
import {
    type pendingProductInSale,
    type ExtendedCustomers,
} from '@/interfaces/interfaces'
import { PhoneInput } from './phone-input'
import { type neighborhood, type domiciliary } from '@prisma/client'

export const SaleForm = ({
    searchParams,
    customers,
    domiciliaries,
    neighborhoods,
}: {
    searchParams: { category: string }
    customers: ExtendedCustomers[]
    domiciliaries: domiciliary[]
    neighborhoods: neighborhood[]
}) => {
    const [saleType, setSaleType] = useState('delivery')
    const [productsInSale, setProductsInSale] = useState<
        pendingProductInSale[]
    >([])

    const updateProductsInSale = (
        pendingProductInSale: pendingProductInSale[]
    ) => {
        setProductsInSale(pendingProductInSale)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!productsInSale.length) return
        const formData = new FormData(e.currentTarget)
        const jsonProductsInSale = JSON.stringify(productsInSale)
        formData.append('productsInSale', jsonProductsInSale)

        const neighborhoodFormData = formData.get('neighborhood')
        const neighborhoodId = neighborhoods.find(
            (neighborhood) => neighborhood.name === neighborhoodFormData
        )?.id
        if (!neighborhoodId) return
        formData.set('neighborhood', neighborhoodId.toString())
        e.currentTarget.reset()
        await addSale(formData)
        setProductsInSale([])
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-5 justify-center md:flex-row "
        >
            <div className="w-full  flex flex-col items-center gap-5 justify-center md:justify-start  md:w-8/12 height-120px">
                <div className="flex gap-2 items-center w-full justify-center px-5 xs:px-10 flex-col xs:flex-row md:flex-col">
                    {saleType === 'delivery' && (
                        <PhoneInput customers={customers} />
                    )}
                    <label htmlFor="name" className="flex flex-col w-full">
                        <span>Nombre</span>
                        <input
                            autoComplete="off"
                            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
                            type="text"
                            required
                            name="name"
                            id="name"
                        />
                    </label>
                </div>
                <div className="flex gap-5 self-start px-5 xs:px-10  flex-col xs:flex-row md:flex-col">
                    <label htmlFor="" className="flex gap-2 items-center">
                        <span>Pedido a domicilio</span>
                        <input
                            type="radio"
                            required
                            checked={saleType === 'delivery'}
                            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
                            name="saleType"
                            onChange={() => {
                                setSaleType('delivery')
                            }}
                            value={'delivery'}
                        />
                    </label>
                    <label htmlFor="" className="flex gap-2 items-center">
                        <span>Para llevar</span>
                        <input
                            required
                            type="radio"
                            checked={saleType === 'pickUp'}
                            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
                            name="saleType"
                            onChange={() => setSaleType('pickUp')}
                            value={'pickUp'}
                        />
                    </label>
                    <label htmlFor="" className="flex gap-2 items-center">
                        <span>Para comer aqui</span>
                        <input
                            required
                            type="radio"
                            checked={saleType === 'eatHere'}
                            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
                            name="saleType"
                            onChange={() => setSaleType('eatHere')}
                            value={'eatHere'}
                        />
                    </label>
                </div>
                {saleType === 'delivery' && (
                    <div className="flex gap-2 items-center w-full justify-center px-10 flex-col sm:flex-row md:flex-col">
                        <label className="flex flex-col w-full">
                            <span>Direccion</span>
                            <div className="flex gap-1 items-center">
                                <input
                                    type="text"
                                    placeholder="calle"
                                    autoComplete="off"
                                    required
                                    className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none w-1/2"
                                    name="street"
                                    id="street"
                                />
                                #
                                <input
                                    autoComplete="off"
                                    placeholder="numero"
                                    className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none w-1/2"
                                    type="text"
                                    required
                                    name="number"
                                    id="number"
                                />
                            </div>
                        </label>
                        <NeighborhoodInput neighborhoods={neighborhoods} />
                        <label className="w-full flex flex-col">
                            <span>Domiciliario</span>
                            <select
                                className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
                                name="delivery"
                                id="delivery"
                            >
                                <option value="1">NS</option>
                                {domiciliaries.map(
                                    (domiciliary) =>
                                        domiciliary.id !== 1 && (
                                            <option
                                                key={domiciliary.id}
                                                value={domiciliary.id}
                                            >
                                                {domiciliary.name}
                                            </option>
                                        )
                                )}
                            </select>
                        </label>
                        <label
                            htmlFor="deliveryPrice"
                            className="flex flex-col self-start"
                        >
                            <span>Domicilio</span>
                            <input
                                autoComplete="off"
                                placeholder="Domicilio"
                                className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none w-24 flex justify-center items-center "
                                type="text"
                                name="deliveryPrice"
                                id="deliveryPrice"
                                required
                            />
                        </label>
                    </div>
                )}

                <label
                    htmlFor="observations"
                    className="self-start px-10 w-full "
                >
                    <span>Observaciones</span>
                    <textarea
                        className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none w-full resize-none"
                        name="observations"
                        id="observations"
                    ></textarea>
                </label>
                <button
                    type="submit"
                    className="self-start ml-10 py-2 px-5 rounded-md  font-medium bg-[#ffb400] hover:bg-[#ff9d00] transition-all text-white shadow-sm shadow-black/20"
                >
                    Enviar venta
                </button>
            </div>

            <div className="flex flex-col w-full height-120px">
                <ProductsInSale
                    pendingProductsInSale={productsInSale}
                    updateProductsInSale={updateProductsInSale}
                    searchParams={searchParams}
                />
            </div>
        </form>
    )
}
