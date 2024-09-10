import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CONTACT_MESSAGES } from "../constants";
import { Contact } from "../models";
import { ContactState } from "./types";

const initialState: ContactState = {
  contacts: [],
  status: "idle",
  message: null,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    fetchContacts: (state) => {
      state.status = "loading";
    },
    fetchContactsSuccess: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
      state.status = "success";
    },
    fetchContactsFailed: (state) => {
      state.status = "failed";
      state.message = CONTACT_MESSAGES.LOADING_FAILURE;
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.status = "loading";
    },
    deleteContactSuccess: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      state.status = "success";
      state.message = CONTACT_MESSAGES.DELETE_SUCCESS;
    },
    deleteContactFailed: (state) => {
      state.status = "failed";
      state.message = CONTACT_MESSAGES.DELETE_FAILURE;
    },
    createContact: (state, action: PayloadAction<Contact>) => {
      state.status = "loading";
    },
    createContactSuccess: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      state.status = "success";
      state.message = CONTACT_MESSAGES.CREATE_SUCCESS;
    },
    createContactFailed: (state) => {
      state.status = "failed";
      state.message = CONTACT_MESSAGES.CREATE_FAILURE;
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      state.status = "loading";
    },
    updateContactSuccess: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
      state.status = "success";
      state.message = CONTACT_MESSAGES.UPDATE_SUCCESS;
    },
    updateContactFailed: (state) => {
      state.status = "failed";
      state.message = CONTACT_MESSAGES.UPDATE_FAILURE;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  createContact,
  createContactSuccess,
  createContactFailed,
  updateContact,
  updateContactSuccess,
  updateContactFailed,
  fetchContacts,
  fetchContactsSuccess,
  fetchContactsFailed,
  deleteContact,
  deleteContactSuccess,
  deleteContactFailed,
  clearMessage,
} = contactSlice.actions;

export default contactSlice.reducer;
