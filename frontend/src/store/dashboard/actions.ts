import {
  SET_DASHBOARD,
  DashboardData,
  UPDATE_LINE,
  ADD_LINE,
  DashboardRow,
  DELETE_LINE,
} from './types'

export interface SetDashboardAction {
  type: typeof SET_DASHBOARD
  dashboard: DashboardData
}

export interface UpdateLineAction {
  type: typeof UPDATE_LINE
  line: DashboardRow
}

export interface AddLineAction {
   type: typeof ADD_LINE
  line: DashboardRow
}

export interface DeleteLineAction {
  type: typeof DELETE_LINE
  idsArray: string[]
}

export const SetDashboard = (dashboard: DashboardData):SetDashboardAction => {
  return {
    type: SET_DASHBOARD,
    dashboard,
  }
}

export const UpdateLine = (line: DashboardRow):UpdateLineAction => {
  return {
    type: UPDATE_LINE,
    line,
  }
}

export const AddNewLine = (line: DashboardRow):AddLineAction => {
  return {
    type: ADD_LINE,
    line,
  }
}

/**
 * Deletes multiple tasks at once
 * @param lineIds
 */
export const DeleteLine = (lineIds: string[]):DeleteLineAction => {
  return {
    type: DELETE_LINE,
    idsArray: lineIds,
  }
}

export type DashBoardActions =
  | DeleteLineAction
  | AddLineAction
  | UpdateLineAction
  | SetDashboardAction
