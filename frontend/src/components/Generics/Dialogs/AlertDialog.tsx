import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogType } from './dialogType';

interface Props {
    readonly dialogType:DialogType,
    readonly visibility:boolean
    readonly message:string,
    readonly confirmButtonText?:string,
    readonly cancelButtonText?:string
    readonly confirmFunction?: () => void,
    readonly cancelFunction?: () => void
}

export const AlertDialog = ({
  dialogType,
  visibility,
  message,
  confirmButtonText,
  cancelButtonText,
  confirmFunction,
  cancelFunction,
}: Props) => (

  <div>
    <Dialog
      open={visibility}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      {dialogType === 'question' && (
        <DialogActions>
          <Button onClick={confirmFunction} color="primary" autoFocus>
            {confirmButtonText}
          </Button>
          <Button onClick={cancelFunction} color="primary">
            {cancelButtonText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  </div>
);

AlertDialog.defaultProps = {
  confirmButtonText: '',
  cancelButtonText: '',
  confirmFunction: null,
  cancelFunction: null,

};

export default AlertDialog;
