'use client'
import { createNeighborhood, createDomiciliary } from '@/actions/actions'
import { type FormEvent } from 'react'
const Configuracion = () => {
    const neighborhoodSubmit = async (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)
        await createNeighborhood(formData)
        e.currentTarget.reset()
    }
    const domiciliarySubmit = async (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)
        await createDomiciliary(formData)
        e.currentTarget.reset()
    }
    return (
        <main className="pt-16 flex flex-col items-center justify-center min-h-screen ">
            <aside className="flex flex-col xs:flex-row gap-5 p-3 absolute top-16 w-full justify-center">
                <form onSubmit={neighborhoodSubmit} className="sm:w-64">
                    <label
                        htmlFor="neighborhood"
                        className="flex flex-col w-full"
                    >
                        <span>Crear un nuevo barrio</span>
                        <input
                            autoComplete="off"
                            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
                            type="text"
                            required
                            name="neighborhood"
                            id="neighborhood"
                        />
                    </label>
                    <button className="bg-green-400 text-white mt-2 py-1 px-2 rounded-md font-medium">
                        Crear
                    </button>
                </form>
                <form className="sm:w-64" onSubmit={domiciliarySubmit}>
                    <label
                        htmlFor="domiciliary"
                        className="flex flex-col w-full"
                    >
                        <span>Crear un nuevo domiciliario</span>
                        <input
                            autoComplete="off"
                            className="border rounded-md pl-2 py-1 focus:outline-none focus:boder-none"
                            type="text"
                            required
                            name="domiciliary"
                            id="domiciliary"
                        />
                    </label>
                    <button className="bg-green-400 text-white mt-2 py-1 px-2 rounded-md font-medium">
                        Crear
                    </button>
                </form>
            </aside>
            <h1 className="text-2xl font-medium text-[#ffb400]">
                Pagina en construccion
            </h1>
        </main>
    )
}

export default Configuracion
