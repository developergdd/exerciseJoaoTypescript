import React, { useRef } from 'react'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import 'react-virtualized/styles.css'
import { AutoSizer, Column, Table } from 'react-virtualized'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import EditIcon from '@material-ui/icons/Edit'
import { DashboardRow, DashboardCol, /*CellRendererType*/ } from '../../store/dashboard/types'
import TableTrashCan from './TableTrashCan'
import { DeleteLine } from '../../store/dashboard/actions'
import TableDeleteCheckbox from './TableDeleteCheckbox'
import fetch from 'unfetch'

interface Props {
  readonly rows:DashboardRow[]
  readonly columns:DashboardCol[]
  readonly showEditForm: (rowData:DashboardRow) => void;
}

const TableGrid = ({ rows, columns, showEditForm }: Props):JSX.Element => {
  const dispatch = useDispatch()
  const selectedLinesArr = useRef<string[]>([])
  const rowHeight = 50

  const onCheckBoxChange = (rowData:string) => {
    if (!_.includes(selectedLinesArr.current, rowData)) {
      selectedLinesArr.current.push(rowData)
    } else {
      selectedLinesArr.current = _.remove(selectedLinesArr.current, rowData)
    }
  }
  const deleteLineServer = async (id:string) => {
    const response = await fetch(`${'http://localhost:5000/deleteProject'}/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      if (response.ok) {
        dispatch(
          DeleteLine([id]),
        )
      }
  }
  const onDeleteLines = () => {
    for (let a = 0; a < selectedLinesArr.current.length; a++) {
      deleteLineServer(selectedLinesArr.current[a])
    }
    
    selectedLinesArr.current = []
  }

  const cellRenderer = (cellRenderData:any/*CellRendererType*/):JSX.Element => {
    const { dataKey, rowData } = cellRenderData
    let { cellData } = cellRenderData
    if (dataKey === 'id') {
      cellData = (
        <EditIcon
          onClick={() => showEditForm(rowData)}
        />
      )
    } else if (dataKey === 'delete') {
      cellData = (
        <TableDeleteCheckbox
          onCheckBoxChange={onCheckBoxChange}
          rowId={rowData._id}
        />
      )
    }

    return (
      <TableCell
        component="div"
        variant="body"
        style={{ height: rowHeight, flex: 1, textAlign: 'right' }}
      >
        {cellData}
      </TableCell>
    )
  }

  const headerRenderer = (headerRenderProps:any):JSX.Element => {
    const { dataKey } = headerRenderProps
    let { label } = headerRenderProps
    if (dataKey === 'id') {
      label = ''
    }
    return (
      <TableCell
        component="div"
        variant="head"
        style={{ height: rowHeight, flex: 1, textAlign: 'right' }}
      >
        {(dataKey === 'delete') ? <TableTrashCan deleteFunction={onDeleteLines} selectedLinesArr={selectedLinesArr.current} /> : label}
      </TableCell>
    )
  }
  return (
    <Paper style={{ height: 200, width: '100%' }}>
      <AutoSizer>
        {({ height, width }): JSX.Element => (
          <Table
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={rowHeight}
          >
            {columns.map(({
              dataKey, width: colWidth, label,
            }): any => (
              <Column
                key={dataKey}
                headerRenderer={headerRenderer}
                headerStyle={{ display: 'flex', alignItems: 'right', boxSizing: 'border-box' }}
                style={{ display: 'flex', alignItems: 'right', boxSizing: 'border-box' }}
                cellRenderer={cellRenderer}
                dataKey={dataKey}
                width={colWidth}
                label={label}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    </Paper>
  )
}

export default TableGrid
