import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export interface IAlertProps {
  open: boolean;
  title: string;
  message: string;
  cancelBtnText?: string;
  successBtnText?: string;
  onCancel(): void;
  onSuccess(): void;
}
export const Alert: FunctionComponent<IAlertProps> = ({
  open,
  onCancel,
  onSuccess,
  title,
  message,
  cancelBtnText = 'Cancel',
  successBtnText = 'OK',
}) => {
  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={open}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onCancel}>
          {cancelBtnText}
        </Button>
        <Button autoFocus color="primary" onClick={onSuccess}={true}>
          {successBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
