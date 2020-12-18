import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import TableGrid from '../Table/TableGrid'
import { DashboardRow, DashboardState } from '../../store/dashboard/types'
import { AppState } from '../../store'
import TableAddForm from '../Table/TableAddForm'
import { SetDashboard } from '../../store/dashboard/actions'
import fetch from 'unfetch'

//

import useSWR from 'swr'

export default function Dashboard():JSX.Element|null {
  const dashboardData:DashboardState = useSelector((state: AppState) => state.dashboard)
  //const [rows, setRows] = useState<DashboardRow[]>(dashboardData.dashboard.rows)
  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const addFormData = useRef<DashboardRow>()
  const formType = useRef<'Add'|'Edit'>('Add')
  const dispatch = useDispatch()
  const API = 'http://localhost:5000/projects'
  
  //

  const getData = async () => {
    const response = await fetch(API)
    return response.json()
  }
  
  const { data, error, mutate } = useSWR(API, getData)
  const prevProj = useRef<DashboardRow[]>(data)

  useEffect(() => {
    mutate(dashboardData.dashboard.rows)
  }, [dashboardData.dashboard.rows, mutate])
  
  useEffect(() => {
    if (data && data.length !== 0 && data !== prevProj.current) {
      prevProj.current = data
      dispatch(SetDashboard(data))
    }
  }, [data, dispatch])
  const onCloseFunction = (() => {
    setAddFormVisibility(false)
  })

  const showEditForm = ((rowData:DashboardRow) => {
    addFormData.current = rowData
    formType.current = 'Edit'
    setAddFormVisibility(true)
  })
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div style={{ marginTop: '20px' }}>
      {data.length !== 0 && (
      <TableGrid
              rows={data}
              columns={dashboardData.dashboard.columns}
              showEditForm={showEditForm}
      />
      )}
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
