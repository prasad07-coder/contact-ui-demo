import React from "react";
import { Modal, Box, Typography, Button, Grid2 } from "@mui/material";
import { Contact } from "../../models";
import ContactForm from "./ContactForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ContactModalProps {
  open: boolean;
  handleClose: () => void;
  defaultValues?: Contact;
  onSubmit: (data: Contact) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  open,
  handleClose,
  defaultValues,
  onSubmit,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {defaultValues ? "Edit Contact" : "Add Contact"}
        </Typography>
        <ContactForm defaultValues={defaultValues} onSubmit={onSubmit} />
        <Grid2 container justifyContent="space-between" sx={{ mt: 2 }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Grid2>
      </Box>
    </Modal>
  );
};

export default ContactModal;
