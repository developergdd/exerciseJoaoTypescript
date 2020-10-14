import React, { useState } from 'react';
import {TableGrid} from './TableGrid'
import {DashboardRow,DashboardCol } from './dashboardType'

const columns:DashboardCol[] = [
  { dataKey: 'id',field: 'id', label: 'ID', width: 20, hide: true },
  { dataKey: 'firstName',field: 'firstName', label: 'First name', width: 200 },
  { dataKey: 'lastName',field: 'lastName', label: 'Last name', width: 200 },
  {dataKey: 'age',field: 'age',label: 'Age', width: 100},
  {dataKey: 'delete',field: 'delete',label: 'delete',width: 100}
];

const data:DashboardRow[] = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, delete:false },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, delete:false },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, delete:false },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 , delete:false},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 25, delete:false },
  { id: 6, lastName: 'Melisandre', firstName: 'Teste', age: 150, delete:false },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, delete:false },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, delete:false },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, delete:false },
];

export default function Dashboard() {
    const [rows, setRows] = useState(data);
    return (
        <div style={{marginTop:'20px'}}>
          <TableGrid
            rows={rows}
            columns={columns}
        />
        </div>
        
    );
}
