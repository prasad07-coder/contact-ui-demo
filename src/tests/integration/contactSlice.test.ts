import { CONTACT_MESSAGES } from "../../constants/messages";
import { Contact } from "../../models";
import contactReducer from "../../redux/contactSlice";
import {
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
} from "../../redux/contactSlice";
import { ContactState } from "../../redux/types";
import { StatusType } from "../../types";

describe("contactSlice", () => {
  const initialState = {
    contacts: [],
    status: "idle" as StatusType,
    message: null,
  };

  it("should handle initial state", () => {
    expect(contactReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
});

it("should handle fetchContacts", () => {
  const initialState = {
    contacts: [],
    status: "idle" as StatusType,
    message: null,
  };
  const actual = contactReducer(initialState, fetchContacts());
  expect(actual.status).toEqual("loading");
});

const initialState = {
  contacts: [],
  status: "idle" as StatusType,
  message: null,
};

it("should handle fetchContactsSuccess", () => {
  const contacts: Contact[] = [
    {
      id: 1,
      firstName: "John Doe",
      email: "john@example.com",
      lastName: "",
      phone: "",
    },
  ];
  const actual = contactReducer(initialState, fetchContactsSuccess(contacts));
  expect(actual.status).toEqual("success");
  expect(actual.contacts).toEqual(contacts);
});

it("should handle fetchContactsFailed", () => {
  const actual = contactReducer(initialState, fetchContactsFailed());
  expect(actual.status).toEqual("failed");
  expect(actual.message).toEqual(CONTACT_MESSAGES.LOADING_FAILURE);
});

it("should handle deleteContact", () => {
  const actual = contactReducer(initialState, deleteContact(1));
  expect(actual.status).toEqual("loading");
});

it("should handle deleteContactSuccess", () => {
  const stateWithContacts: ContactState = {
    ...initialState,
    contacts: [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "",
      },
    ] as Contact[],
  };
  const actual = contactReducer(stateWithContacts, deleteContactSuccess(1));
  expect(actual.status).toEqual("success");
  expect(actual.contacts).toEqual([]);
  expect(actual.message).toEqual(CONTACT_MESSAGES.DELETE_SUCCESS);
});

it("should handle deleteContactFailed", () => {
  const actual = contactReducer(initialState, deleteContactFailed());
  expect(actual.status).toEqual("failed");
  expect(actual.message).toEqual(CONTACT_MESSAGES.DELETE_FAILURE);
});

it("should handle createContact", () => {
  const formData: Contact = {
    firstName: "Jane Doe",
    email: "jane@example.com",
    lastName: "",
    phone: "",
  };
  const actual = contactReducer(initialState, createContact(formData));
  expect(actual.status).toEqual("loading");
});

it("should handle createContactSuccess", () => {
  const newContact: Contact = {
    id: 2,
    firstName: "Jane Doe",
    lastName: "",
    phone: "",
    email: "jane@example.com",
  };
  const actual = contactReducer(initialState, createContactSuccess(newContact));
  expect(actual.status).toEqual("success");
  expect(actual.contacts).toEqual([newContact]);
  expect(actual.message).toEqual(CONTACT_MESSAGES.CREATE_SUCCESS);
});

it("should handle createContactFailed", () => {
  const actual = contactReducer(initialState, createContactFailed());
  expect(actual.status).toEqual("failed");
  expect(actual.message).toEqual(CONTACT_MESSAGES.CREATE_FAILURE);
});

it("should handle updateContact", () => {
  const formData: Contact = {
    id: 1,
    firstName: "John Smith",
    lastName: "Doe",
    phone: "1234567890",
    email: "johnsmith@example.com",
  };
  const actual = contactReducer(initialState, updateContact(formData));
  expect(actual.status).toEqual("loading");
});

it("should handle updateContactSuccess", () => {
  const stateWithContacts = {
    ...initialState,
    contacts: [
      {
        id: 1,
        firstName: "John Smith",
        lastName: "Doe",
        phone: "1234567890",
        email: "johnsmith@example.com",
      },
    ],
  };
  const updatedContact: Contact = {
    id: 1,
    firstName: "John Smith",
    email: "johnsmith@example.com",
    lastName: "",
    phone: "",
  };
  const actual = contactReducer(
    stateWithContacts,
    updateContactSuccess(updatedContact)
  );
  expect(actual.status).toEqual("success");
  expect(actual.contacts[0]).toEqual(updatedContact);
  expect(actual.message).toEqual(CONTACT_MESSAGES.UPDATE_SUCCESS);
});

it("should handle updateContactFailed", () => {
  const actual = contactReducer(initialState, updateContactFailed());
  expect(actual.status).toEqual("failed");
  expect(actual.message).toEqual(CONTACT_MESSAGES.UPDATE_FAILURE);
});
