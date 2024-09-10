import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CONTACT_MESSAGES } from "../constants";

interface DeleteConfirmDialogProps {
  open: boolean;
  handleDeleteClick: () => void;
  handleConfirmDelete: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  handleDeleteClick,
  handleConfirmDelete,
}) => {
  return (
    <Dialog open={open} onClose={handleDeleteClick}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>{CONTACT_MESSAGES.DELETE_CONFIRMATION}</DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClick} color="primary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
