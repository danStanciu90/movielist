import React, { FunctionComponent } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';

export interface IAlertProps {
  open: boolean;
  title: string;
  message: string;
  cancelBtnText?: string;
  successBtnText?: string;
  onCancel(): void;
  onSuccess(): void;
}
export const Alert: FunctionComponent<IAlertProps> = ({ open, onCancel, onSuccess, title, message, cancelBtnText = "Cancel", successBtnText = 'OK' }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          {cancelBtnText}
        </Button>
        <Button onClick={onSuccess} color="primary" autoFocus>
          {successBtnText}
        </Button>
      </DialogActions>
    </Dialog>

  )
}
