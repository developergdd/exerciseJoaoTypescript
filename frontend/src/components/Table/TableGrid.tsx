import React, { useRef } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import 'react-virtualized/styles.css';
import { AutoSizer, Column, Table } from 'react-virtualized';
import {DashboardRow,DashboardCol,CellRendererType } from '../../store/dashboard/types'
import TableTrashCan from './TableTrashCan'
import { useDispatch } from 'react-redux'
import _ from 'lodash';
import { DeleteLine } from '../../store/dashboard/actions'
import TableDeleteCheckbox from './TableDeleteCheckbox'
import EditIcon from '@material-ui/icons/Edit';


interface Props {
  readonly rows:DashboardRow[]
  readonly columns:DashboardCol[]
  readonly showEditForm: Function
}

export const TableGrid = React.memo((props: Props)=>{
  const dispatch = useDispatch()
  const selectedLinesArr = useRef<string[]>([]);
  const rowHeight= 50;

  const onCheckBoxChange=(rowData:string)=>{
    if (!_.includes(selectedLinesArr.current, rowData)) {
      selectedLinesArr.current.push(rowData);
    } else {
      selectedLinesArr.current=_.remove(selectedLinesArr.current, rowData);
    }
  }

  const onDeleteLines=()=>{
    dispatch(
      DeleteLine(selectedLinesArr.current)
    )
    selectedLinesArr.current=[];
  }

  const cellRenderer = (cellRenderData:CellRendererType) => {
    let {dataKey,rowData,cellData } = cellRenderData
    if(dataKey==='id'){
      cellData=<EditIcon 
        onClick={()=>props.showEditForm(rowData)}
      />
    }
    else if(dataKey==='delete'){
      cellData=<TableDeleteCheckbox 
          selectedLinesArr={selectedLinesArr.current} 
          onCheckBoxChange={onCheckBoxChange} 
          rowId={rowData.id}/>
    }

    return (
      <TableCell
        component="div"
        variant="body"
        style={{ height: rowHeight,flex:1,textAlign:'right'}}
      >
        {cellData}
      </TableCell>
    );
  };

  const headerRenderer = ({ label,dataKey }) => {
    if(dataKey==='id'){
      label=""
    }
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
