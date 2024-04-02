import { type neighborhood } from '@prisma/client'
import { useState } from 'react'
export const NeighborhoodInput = ({
    neighborhoods,
}: {
    neighborhoods: neighborhood[]
}) => {
    const [showNeighborhoodsOptions, setShowNeighborhoodsOptions] =
        useState<boolean>(false)
    const [neighborhoodsFiltered, setNeighborhoodsFiltered] =
        useState<neighborhood[]>(neighborhoods)

    const handleNeighborhoodChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const neighborhoodsFiltered = neighborhoods.filter((neighborhood) =>
            neighborhood.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        )

        setNeighborhoodsFiltered(neighborhoodsFiltered)
        if (e.target.value.length === 0) {
            setShowNeighborhoodsOptions(false)
        } else {
            setShowNeighborhoodsOptions(true)
        }
    }
    const handleNeighborhoodClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        const neighborhoodSelected = neighborhoods.find(
            (neighborhood) => neighborhood.name === e.currentTarget.innerText
        )
        if (!neighborhoodSelected) return

        const neighborhoodInput = document.getElementById(
            'neighborhood'
        ) as HTMLInputElement
        setShowNeighborhoodsOptions(false)
        neighborhoodInput.value = neighborhoodSelected.name
    }
    return (
        <label htmlFor="neighborhood" className="flex flex-col w-full relative">
            <span>Barrio</span>
            <input
                autoComplete="off"
                autoCorrect="off"
                required
                onChange={handleNeighborhoodChange}
                className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
                type="text"
                name="neighborhood"
                id="neighborhood"
            />

            {showNeighborhoodsOptions && (
                <div
                    className="bg-white max-h-60 overflow-y-auto absolute top-[60px]  w-full z-30 rounded-b-md font-medium shadow-md border border-t-0"
                    id="neighborhoodsOptions"
                >
                    {neighborhoodsFiltered.map((neighborhood) => (
                        <span
                            className="w-full flex justify-center cursor-pointer border-b hover:bg-[#eee] py-2"
                            onClick={handleNeighborhoodClick}
                            key={neighborhood.id}
                        >
                            {neighborhood.name}
                        </span>
                    ))}
                </div>
            )}
        </label>
    )
}
