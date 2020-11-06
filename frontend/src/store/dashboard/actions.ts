import {
  SET_DASHBOARD,
  DashboardData,
  UPDATE_LINE,
  ADD_LINE,
  DashboardRow,
  DELETE_LINE,
} from './types';

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

export function SetDashboard(dashboard: DashboardData) {
  return {
    type: SET_DASHBOARD,
    dashboard,
  };
}

export function UpdateLine(
  line: DashboardRow,
) {
  return {
    type: UPDATE_LINE,
    line,
  };
}

export function AddNewLine(line: DashboardRow) {
  return {
    type: ADD_LINE,
    line,
  };
}

/**
 * Deletes multiple tasks at once
 * @param lineIds
 */
export function DeleteLine(lineIds: string[]) {
  return {
    type: DELETE_LINE,
    idsArray: lineIds,
  };
}

export type DashBoardActions =
  | DeleteLineAction
  | AddLineAction
  | UpdateLineAction
  | SetDashboardAction
