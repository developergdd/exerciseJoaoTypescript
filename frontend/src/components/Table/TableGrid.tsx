import React, { useRef } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import 'react-virtualized/styles.css';
import { Checkbox } from '@material-ui/core';
import { AutoSizer, Column, Table } from 'react-virtualized';
import {DashboardRow,DashboardCol,CellRendererType } from '../Dashboard/dashboardType'
import TableTrashCan from './TableTrashCan'
import _ from 'lodash';


interface Props {
  readonly rows:DashboardRow[]
  readonly columns:DashboardCol[]
}

export const TableGrid = React.memo((props: Props)=>{
  const selectedLinesArr = useRef<number[]>([]);
  const rowHeight= 50;

  const onCheckBoxChange=(rowData:DashboardRow)=>{
    if (!_.includes(selectedLinesArr.current, rowData.id)) {
      selectedLinesArr.current.push(rowData.id);
    } else {
      selectedLinesArr.current=_.remove(selectedLinesArr.current, rowData.id);
    }
  }

  const onDeleteLines=()=>{
    console.log(`deleting ${selectedLinesArr.current}`)
  }

  const cellRenderer = (cellRenderData:CellRendererType) => {
    const {dataKey,rowData,cellData } = cellRenderData
    return (
      <TableCell
        component="div"
        variant="body"
        style={{ height: rowHeight,flex:1,textAlign:'right'}}
      >
        {(dataKey==='delete')?<Checkbox style={{padding:'0px', float:'right'}} onChange={()=>onCheckBoxChange(rowData)}/>:cellData}
      </TableCell>
    );
  };

  const headerRenderer = ({ label,dataKey }) => {
    return (
      <TableCell
        component="div"
        variant="head"
        style={{ height: rowHeight,flex:1,textAlign:'right'}}
      >
        {(dataKey==='delete')?<TableTrashCan deleteFunction={onDeleteLines} selectedLinesArr={selectedLinesArr.current}/>:label}
      </TableCell>
    );
  };
    return (
        <Paper style={{ height: 200, width: '100%' }}>
        <AutoSizer>
            {({ height, width }) => (
            <Table
                rowCount={props.rows.length}
                rowGetter={({ index }) => props.rows[index]}
                height={height}
                width={width}
                rowHeight={rowHeight}
                gridStyle={{
                direction: 'inherit',
                }}
                headerHeight={rowHeight}
            >
                {props.columns.map(({ dataKey, ...other }) => {
                return (
                    <Column
                    key={dataKey}
                    headerRenderer={headerRenderer}
                    headerStyle={{display: 'flex',alignItems: 'right',boxSizing: 'border-box'}}
                    style={{display: 'flex',alignItems: 'right',boxSizing: 'border-box'}}
                    cellRenderer={cellRenderer}
                    dataKey={dataKey}
                    {...other}
                    />
                );
                })}
            </Table>
            )}
        </AutoSizer>
        </Paper>
    );
})
