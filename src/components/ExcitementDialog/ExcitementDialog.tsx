import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withStyles,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Rating } from '@material-ui/lab';
import React, { FunctionComponent } from 'react';

export interface IExcitementDialogProps {
  show: boolean;
  onClose(): void;
  excitementLevel: number;
  onExcitementChange(event: React.ChangeEvent<{}>, value: number): void;
  onAddMovie(): void;
}

const StyledRating = withStyles({
  iconFilled: {
    color: '#f50057',
  },
  iconHover: {
    color: '#c51162',
  },
})(Rating);

export const ExcitementDialog: FunctionComponent<IExcitementDialogProps> = ({
  show,
  onClose,
  excitementLevel,
  onExcitementChange,
  onAddMovie,
}) => {
  return (
    <Dialog aria-labelledby="form-dialog-title" onClose={onClose} open={show}>
      <DialogTitle id="form-dialog-title">Excitement level</DialogTitle>
      <DialogContent
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <StyledRating
          icon={<FavoriteIcon fontSize="inherit" />}
          onChange={onExcitementChange}
          value={excitementLevel}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onAddMovie}>
          Add Movie
        </Button>
      </DialogActions>
    </Dialog>
  );
};
