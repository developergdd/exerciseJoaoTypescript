import { TableCellRenderer } from 'react-virtualized';

export interface DashboardRow {
    id: number, 
    lastName: string, 
    firstName: string, 
    age: number, 
    delete:boolean 
}

export interface DashboardCol {
    dataKey: string,
    field: string,
    label: string,
    width: number,
    hide?:boolean
}

export interface CellRendererType{
    cellData: string|number|boolean
    columnIndex: number
    dataKey: string
    isScrolling: boolean,
    rowData: DashboardRow
    rowIndex: number
}