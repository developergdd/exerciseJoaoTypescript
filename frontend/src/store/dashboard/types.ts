export const UPDATE_LINE = 'UPDATE_LINE'
export const ADD_LINE = 'ADD_LINE'
export const DELETE_LINE = 'DELETE_LINE'
export const SET_DASHBOARD = 'SET_DASHBOARD'

export interface DashboardRow {
    id: string,
    lastName: string,
    firstName: string,
    age: number
}

export interface DashboardCol {
    dataKey: string,
    field: string,
    label: string,
    width: number,
    hide?:boolean
}

export interface CellRendererType{
    // eslint-disable-next-line no-undef
    cellData: string|number|boolean|JSX.Element
    columnIndex: number
    dataKey: string
    isScrolling: boolean,
    rowData: DashboardRow
    rowIndex: number
}

export interface DashboardData{
    id: string,
    rows:DashboardRow[],
    columns:DashboardCol[]
}

export interface DashboardState{
    dashboard:DashboardData
}
