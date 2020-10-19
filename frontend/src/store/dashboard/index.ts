import {
	DashboardState,
	DashboardData,
	SET_DASHBOARD,
	UPDATE_LINE,
	ADD_LINE,
	DELETE_LINE,
	DashboardCol,
	DashboardRow

} from './types'
import { DashBoardActions } from './actions'

const columns:DashboardCol[] = [
	{ dataKey: 'id',field: 'id', label: 'ID', width: 40, hide: true },
	{ dataKey: 'firstName',field: 'firstName', label: 'First name', width: 200 },
	{ dataKey: 'lastName',field: 'lastName', label: 'Last name', width: 200 },
	{dataKey: 'age',field: 'age',label: 'Age', width: 100},
	{dataKey: 'delete',field: 'delete',label: 'delete',width: 100}
  ];
  
const rows:DashboardRow[] = [
	{ id: "1", lastName: 'Snow', firstName: 'Jon', age: 35},
	{ id: "2", lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: "3", lastName: 'Lannister', firstName: 'Jaime', age: 45},
	{ id: "4", lastName: 'Stark', firstName: 'Arya', age: 16},
	{ id: "5", lastName: 'Targaryen', firstName: 'Daenerys', age: 25},
	{ id: "6", lastName: 'Melisandre', firstName: 'Teste', age: 150 },
	{ id: "7", lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: "8", lastName: 'Frances', firstName: 'Rossini', age: 36},
	{ id: "9", lastName: 'Roxie', firstName: 'Harvey', age: 65}
];

const Dashboard:DashboardData ={
	id: "1", 
    rows:rows,
    columns:columns
}

const defaultState: DashboardState = {
	dashboard:Dashboard
}

function dashboardReducer(state = defaultState, action: DashBoardActions): DashboardState {
	switch (action.type) {
		case SET_DASHBOARD:
			return { ...state, dashboard: action.dashboard }
		case UPDATE_LINE:
			const index = state.dashboard.rows.findIndex(e => e.id === action.id)
			if (index === -1) {
				return state
			}
			let changeRow:DashboardRow ={...state.dashboard.rows[index],[action.property]:action.value}

			return {
				...state,
				dashboard: {
					...state.dashboard,
					rows: [...rows,changeRow],
				},
			}

		case ADD_LINE:
			const newAddRows = [...state.dashboard.rows]
			const exists = newAddRows.some(e => e.id === action.line.id)
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
		case DELETE_LINE:
			const newRows = [...state.dashboard.rows]
			console.error(action.idsArray);
			console.error(action.idsArray.length);
			for (const id of action.idsArray) {
				const index = newRows.findIndex(e => e.id === id)
				if (index !== -1) {
					newRows.splice(index, 1)
				}
			}

			return {
				...state,
				dashboard: {
					...state.dashboard,
					rows: newRows,
				},
			}
		default:
			return state
	}
}

export default dashboardReducer
