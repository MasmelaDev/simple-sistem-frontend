'use client'
import { AgGridReact } from 'ag-grid-react'
import { type ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { type ExtendedSales } from '@/interfaces/interfaces'
export const PendingAgGrid = ({
    salesPending,
}: {
    salesPending: ExtendedSales[]
}) => {
    const gridPendingSalesColDef: ColDef[] = [
        {
            field: 'createdAt',
            headerName: 'Fecha',
        },
        {
            field: 'customers.phone',
            headerName: 'Telefono',
        },
        {
            field: 'customers.address.neighborhood.name',
            headerName: 'Barrio',
        },
        {
            field: 'type',
            headerName: 'Tipo',
        },
        {
            field: 'total',
            headerName: 'Total',
        },
        {
            field: 'status',
            headerName: 'Estado',
        },
    ]
    const defaultColDef: ColDef = {
        flex: 1,
        minWidth: 100,
        sortable: true,
        cellClass: 'text-center border-r-2 border-l-2 border-gray-200',
    }
    return (
        <div className="ag-theme-quartz" style={{ height: 500 }}>
            <AgGridReact
                defaultColDef={defaultColDef}
                rowData={salesPending}
                columnDefs={gridPendingSalesColDef}
            />
        </div>
    )
}
