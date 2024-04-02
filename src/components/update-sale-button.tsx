'use client'
import { type ExtendedSales } from '@/interfaces/interfaces'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import { updateSaleStatus } from '@/actions/actions'
export const UpdateSaleButton = ({ sale }: { sale: ExtendedSales }) => {
    const updateSale = async () => {
        await updateSaleStatus(sale.id, 'paid')
    }
    return (
        <button
            onClick={updateSale}
            type="button"
            className="p-[1px] xs:p-[3px] sm:p-1 rounded-lg bg-green-500 scale-90 hover:scale-100 transition-all z-50 "
        >
            <IconArrowNarrowRight size={20} className="text-white " />
        </button>
    )
}
