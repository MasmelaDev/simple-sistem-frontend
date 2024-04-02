'use client'
import { type ExtendedSales } from '@/interfaces/interfaces'
import { calculateTotalSales, formatPrice } from '@/lib/formats'
import { IconCheck } from '@tabler/icons-react'
import { useRef, useState } from 'react'
export const CashInBox = ({ salesPaid }: { salesPaid: ExtendedSales[] }) => {
    const [initialCash, setInitialCash] = useState('0')
    const [editInitialCash, setEditInitialCash] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <section className="flex flex-col gap-2 px-3 pb-10">
            <p className="flex gap-3 items-center justify-between">
                <span className="w-24">Base:</span>
                {editInitialCash ? (
                    <span className="flex gap-2 items-center">
                        <input
                            ref={inputRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') setEditInitialCash(false)
                            }}
                            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none w-20"
                            type="text"
                            value={initialCash}
                            onChange={(e) => setInitialCash(e.target.value)}
                        />
                        <button
                            className="bg-green-500 text-white p-[3px] rounded-full"
                            title="Confirmar"
                        >
                            <IconCheck
                                className=""
                                size={20}
                                onClick={() => setEditInitialCash(false)}
                            />
                        </button>
                    </span>
                ) : (
                    <span
                        onClick={() => {
                            setEditInitialCash(true)
                            setTimeout(() => {
                                inputRef.current?.focus()
                            }, 0)
                        }}
                    >
                        {formatPrice.format(Number(initialCash))}
                    </span>
                )}
            </p>
            <p className="flex gap-3 items-center justify-between">
                <span className="w-24">Total Ventas:</span>
                <span>
                    {formatPrice.format(calculateTotalSales(salesPaid))}
                </span>
            </p>
            <p className="flex gap-3 items-center justify-between">
                <span className="w-24">Total Caja:</span>
                <span>
                    {formatPrice.format(
                        Number(initialCash) + calculateTotalSales(salesPaid)
                    )}
                </span>
            </p>
        </section>
    )
}
