'use client'
import {
    IconMenu2,
    IconReportAnalytics,
    IconUsers,
    IconSettings,
    IconX,
    IconBuildingStore,
} from '@tabler/icons-react'
import { SandwichIcon } from './sandwich-icon'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
export const NavMenu = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <>
            <button
                onClick={() => setShowMenu(true)}
                className="absolute top-2 left-2 text-white bg-[#ffb400] rounded-full p-1"
            >
                <IconMenu2 />
            </button>
            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ y: -500 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ y: -500 }}
                        className="fixed top-0 w-full flex flex-col  bg-white rounded-md shadow-md z-[60] "
                    >
                        <button
                            className="absolute top-3 right-4"
                            onClick={() => setShowMenu(false)}
                        >
                            <IconX />
                        </button>
                        <ul className="flex flex-col w-full items-center gap-8 py-10 md:flex-row md:justify-center">
                            <li>
                                <Link
                                    onClick={() => setShowMenu(false)}
                                    href="/"
                                    className="flex items-center gap-2 text-xl"
                                >
                                    <IconBuildingStore /> Pedidos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setShowMenu(false)}
                                    href="/ventas"
                                    className="flex items-center gap-2 text-xl"
                                >
                                    <IconReportAnalytics /> Ventas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setShowMenu(false)}
                                    href="/productos"
                                    className="flex items-center gap-2 text-xl"
                                >
                                    <SandwichIcon /> Productos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setShowMenu(false)}
                                    href="/clientes"
                                    className="flex items-center gap-2 text-xl"
                                >
                                    <IconUsers /> Clientes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setShowMenu(false)}
                                    href="/configuracion"
                                    className="flex items-center gap-2 text-xl"
                                >
                                    <IconSettings /> Configuracion
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
