import React, { useRef } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import 'react-virtualized/styles.css';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import { DashboardRow, DashboardCol, CellRendererType } from '../../store/dashboard/types';
import TableTrashCan from './TableTrashCan';
import { DeleteLine } from '../../store/dashboard/actions';
import TableDeleteCheckbox from './TableDeleteCheckbox';

interface Props {
  readonly rows:DashboardRow[]
  readonly columns:DashboardCol[]
  readonly showEditForm: Function
}

export const TableGrid = ({ rows, columns, showEditForm }: Props) => {
  const dispatch = useDispatch();
  const selectedLinesArr = useRef<string[]>([]);
  const rowHeight = 50;

  const onCheckBoxChange = (rowData:string) => {
    if (!_.includes(selectedLinesArr.current, rowData)) {
      selectedLinesArr.current.push(rowData);
    } else {
      selectedLinesArr.current = _.remove(selectedLinesArr.current, rowData);
    }
  };

  const onDeleteLines = () => {
    dispatch(
      DeleteLine(selectedLinesArr.current),
    );
    selectedLinesArr.current = [];
  };

  const cellRenderer = (cellRenderData:CellRendererType) => {
    const { dataKey, rowData } = cellRenderData;
    let { cellData } = cellRenderData;
    if (dataKey === 'id') {
      cellData = (
        <EditIcon
          onClick={() => showEditForm(rowData)}
        />
      );
    } else if (dataKey === 'delete') {
      cellData = (
        <TableDeleteCheckbox
          onCheckBoxChange={onCheckBoxChange}
          rowId={rowData.id}
        />
      );
    }

    return (
      <TableCell
        component="div"
        variant="body"
        style={{ height: rowHeight, flex: 1, textAlign: 'right' }}
      >
        {cellData}
      </TableCell>
    );
  };

  const headerRenderer = (headerRenderProps:{label:string, dataKey:string}) => {
    const { dataKey } = headerRenderProps;
    let { label } = headerRenderProps;
    if (dataKey === 'id') {
      label = '';
    }
    return (
      <TableCell
        component="div"
        variant="head"
        style={{ height: rowHeight, flex: 1, textAlign: 'right' }}
      >
        {(dataKey === 'delete') ? <TableTrashCan deleteFunction={onDeleteLines} selectedLinesArr={selectedLinesArr.current} /> : label}
      </TableCell>
    );
  };
  return (
    <Paper style={{ height: 200, width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
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
            }) => (
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
  );
};

export default TableGrid;
