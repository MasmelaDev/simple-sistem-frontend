import { SaleForm } from '@/components/sale-form'
import { db } from '@/lib/prisma'

const getData = async () => {
    const customers = await db.customers.findMany({
        include: {
            address: {
                include: {
                    neighborhood: true,
                },
            },
        },
    })
    const domiciliaries = await db.domiciliary.findMany()
    const neighborhoods = await db.neighborhood.findMany()

    return { customers, domiciliaries, neighborhoods }
}

export default async function Home({
    searchParams,
}: {
    searchParams: { category: string }
}) {
    const { customers, domiciliaries, neighborhoods } = await getData()
    return (
        <>
            <h1 className="text-center text-4xl font-semibold text-[#ffb400] py-10">
                Pedidos
            </h1>
            <main className="w-full">
                <SaleForm
                    searchParams={searchParams}
                    customers={customers}
                    neighborhoods={neighborhoods}
                    domiciliaries={domiciliaries}
                />
            </main>
        </>
    )
}
