import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

export interface Props {
  open: boolean;
  close: () => void;
  yes: () => void;
}

export const DeleteConfirm = ({ open, close, yes }: Props) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>DELETE ITEM?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          No
        </Button>
        <Button onClick={yes} color="primary" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
