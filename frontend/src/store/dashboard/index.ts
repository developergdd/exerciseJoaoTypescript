import {
  DashboardState,
  DashboardData,
  SET_DASHBOARD,
  UPDATE_LINE,
  ADD_LINE,
  DELETE_LINE,
  DashboardCol,
  DashboardRow } from './types'
import { DashBoardActions } from './actions'

const columns:DashboardCol[] = [
  {
    dataKey: 'id', field: 'id', label: 'ID', width: 40, hide: true,
  },
  {
    dataKey: 'firstName', field: 'firstName', label: 'First name', width: 200,
  },
  {
    dataKey: 'lastName', field: 'lastName', label: 'Last name', width: 200,
  },
  {
    dataKey: 'age', field: 'age', label: 'Age', width: 100,
  },
  {
    dataKey: 'delete', field: 'delete', label: 'delete', width: 100,
  },
]

const rows:DashboardRow[] = []

const Dashboard:DashboardData = {
  id: '1',
  rows,
  columns,
}

const defaultState: DashboardState = {
  dashboard: Dashboard,
}

function dashboardReducer(state = defaultState, action: DashBoardActions): DashboardState {
  switch (action.type) {
    case SET_DASHBOARD:
    {
      const dashboardData:DashboardData = Dashboard
      console.log('set dashboard')
      if (dashboardData.rows !== action.dashboard) {
        dashboardData.rows = action.dashboard
        return { ...state, dashboard: dashboardData }
      } 
      return state
    }
    case UPDATE_LINE:
    {
      console.log('updateline')
      const updateAddRows = [...state.dashboard.rows]
      const index = updateAddRows.findIndex((e) => e._id === action.line._id)
      if (index === -1) {
        return state
      }
      updateAddRows[index] = action.line
      console.log(updateAddRows)
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          rows: updateAddRows,
        },
      }
    }
    case ADD_LINE:
    {
      const newAddRows = [...state.dashboard.rows]
      const exists = newAddRows.some((e) => e._id === action.line._id)
      if (exists) {
        return state
      }
      newAddRows.push(action.line)

      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          rows: newAddRows,
        },
      }
    }
    case DELETE_LINE:
    {
      const newRows = [...state.dashboard.rows]
      action.idsArray.forEach((id) => {
        const index = newRows.findIndex((e) => e._id === id)
        if (index !== -1) {
          newRows.splice(index, 1)
        }
      })
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          rows: newRows,
        },
      }
    }
    default:
      return state
  }
}

export default dashboardReducer
