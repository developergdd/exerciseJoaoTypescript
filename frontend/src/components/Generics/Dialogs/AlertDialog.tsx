import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DialogType} from './dialogType'


interface Props {
    readonly dialogType:DialogType,
    readonly visibility:boolean
    readonly message:string,
    readonly confirmButtonText?:string,
    readonly cancelButtonText?:string
    readonly confirmFunction?: () => void,
    readonly cancelFunction?: () => void
}

export default function AlertDialog(props: Props){

  return (
    <div>
      <Dialog
        open={props.visibility}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.message}</DialogTitle>
        {props.dialogType==="question" && <DialogActions>
          <Button onClick={props.confirmFunction} color="primary" autoFocus>
            {props.confirmButtonText}
          </Button>
          <Button onClick={props.cancelFunction} color="primary">
            {props.cancelButtonText}
          </Button>
        </DialogActions>}
      </Dialog>
    </div>
  );
}