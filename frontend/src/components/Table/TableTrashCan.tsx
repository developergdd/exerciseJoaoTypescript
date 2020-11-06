import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../Generics/Dialogs/AlertDialog';

interface Props {
    readonly selectedLinesArr:string[]
    readonly deleteFunction:Function
}
const TableTrashCan = (props: Props) => {
  const [deleteWindowState, setDeleteWindowState] = useState<boolean>(false);

  const onTrashCanClick = () => {
    if (props.selectedLinesArr.length > 0) {
      setDeleteWindowState(true);
    }
  };

  const onDeleteConfirm = () => {
    props.deleteFunction();
    setDeleteWindowState(false);
  };

  const onDeleteCancel = () => {
    setDeleteWindowState(false);
  };

  return (
    <div>
      <DeleteIcon onClick={() => { onTrashCanClick(); }} />
      <AlertDialog
        visibility={deleteWindowState}
        dialogType="question"
        message="Are you sure you want to delete?"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmFunction={onDeleteConfirm}
        cancelFunction={onDeleteCancel}
      />
    </div>

  );
};

export default TableTrashCan;
