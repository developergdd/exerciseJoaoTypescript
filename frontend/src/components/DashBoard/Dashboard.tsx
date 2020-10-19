import React, { useState,useEffect } from 'react';
import {TableGrid} from '../Table/TableGrid'
import { DashboardState } from '../../store/dashboard/types'
import { useSelector } from 'react-redux'


export default function Dashboard() {
    const dashboardData = useSelector((state: DashboardState) => state.dashboard)
    const [rows, setRows] = useState(dashboardData.dashboard.rows);
    useEffect(() => {
       setRows(dashboardData.dashboard.rows)
    }, [dashboardData.dashboard.rows])
    if(rows.length===0){
      return null
    }
    return (
        <div style={{marginTop:'20px'}}>
          <TableGrid
            rows={rows}
            columns={dashboardData.dashboard.columns}
        />
        </div>
        
    );
}
