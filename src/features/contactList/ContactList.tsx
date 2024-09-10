import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Grid2,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { RootState } from "../../redux/store";
import {
  fetchContacts,
  deleteContact,
  updateContact,
  createContact,
} from "../../redux/contactSlice";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import { CONTACT_MESSAGES } from "../../constants/messages";
import FadeOutAlert from "../../components/FadeOutAlert";
import { Contact } from "../../models";
import ContactModal from "../contactForm/ContactFormModal";
import EmptyDataListOverlay from "../../components/EmptyDataListOverlay";
import { StyledDataGrid } from "./ContactList.styles";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";

const ContactList: React.FC = () => {
  const dispatch = useDispatch();
  const { contacts, status, message } = useSelector(
    (state: RootState) => state.contacts
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = (data: Contact) => {
    if (editingContact) {
      dispatch(updateContact(data));
    } else {
      dispatch(createContact(data));
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    handleOpenConfirmDialog(id);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params: { row: Contact }) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleEditContact(params.row)}
            startIcon={<EditIcon />}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id || 0)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleOpenConfirmDialog = (id: number) => {
    setSelectedContactId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedContactId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedContactId !== null) {
      dispatch(deleteContact(selectedContactId));
    }
    handleCloseConfirmDialog();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Contact List
          </Typography>
        </Toolbar>
      </AppBar>
      <Box m={5}>
        <Grid2 container alignItems="left" mb={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddContact}
          >
            Add Contact
          </Button>
        </Grid2>
        <StyledDataGrid
          rows={contacts}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          slots={{
            noRowsOverlay: () => (
              <EmptyDataListOverlay
                message={CONTACT_MESSAGES.EMPTY_CONTACT_LIST}
              />
            ),
          }}
        />
        <ContactModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          defaultValues={editingContact || undefined}
          onSubmit={handleSubmit}
        />
      </Box>
      <DeleteConfirmDialog
        open={openConfirmDialog}
        handleDeleteClick={handleCloseConfirmDialog}
        handleConfirmDelete={handleConfirmDelete}
      />
      <div>
        {status === "success" && message && (
          <FadeOutAlert message={message} status={status} />
        )}
      </div>
      <div>
        {status === "failed" && message && (
          <FadeOutAlert message={message} status={status} />
        )}
      </div>
    </>
  );
};
export default ContactList;
