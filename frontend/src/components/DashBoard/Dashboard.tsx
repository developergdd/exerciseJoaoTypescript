import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import TableGrid from '../Table/TableGrid'
import { DashboardRow, DashboardState } from '../../store/dashboard/types'
import { AppState } from '../../store'
import TableAddForm from '../Table/TableAddForm'

export default function Dashboard():JSX.Element|null {
  const dashboardData:DashboardState = useSelector((state: AppState) => state.dashboard)
  const [rows, setRows] = useState<DashboardRow[]>(dashboardData.dashboard.rows)
  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const addFormData = useRef<DashboardRow>()
  const formType = useRef<'Add'|'Edit'>('Add')

  useEffect(() => {
    setRows(dashboardData.dashboard.rows)
  }, [dashboardData.dashboard.rows])

  const onCloseFunction = (() => {
    setAddFormVisibility(false)
  })

  const showEditForm = ((rowData:DashboardRow) => {
    addFormData.current = rowData
    formType.current = 'Edit'
    setAddFormVisibility(true)
  })

  if (rows.length === 0) {
    return null
  }
  return (
    <div style={{ marginTop: '20px' }}>
      <TableGrid
        rows={rows}
        columns={dashboardData.dashboard.columns}
        showEditForm={showEditForm}
      />
      <AddCircleRoundedIcon fontSize="large" htmlColor="green" onClick={() => { formType.current = 'Add'; setAddFormVisibility(true) }} />
      {addFormVisibility
        && (
        <TableAddForm
          onCloseForm={onCloseFunction}
          receivedFormData={addFormData.current}
          formType={formType.current}
        />
        )}
    </div>

  )
}
