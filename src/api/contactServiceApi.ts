import axios from "axios";
import { USER_CONTACTS_API_BASE_URL } from "../constants";

// Api calls to the server to create, fetch, update, and delete contacts
export const createContact = async (contactData: any) => {
  const response = await axios.post(
    `${USER_CONTACTS_API_BASE_URL}/contacts`,
    contactData
  );
  return response.data;
};

export const fetchContacts = async () => {
  const response = await axios.get(`${USER_CONTACTS_API_BASE_URL}/contacts`);
  return response.data;
};

export const updateContact = async (contactData: any) => {
  const response = await axios.put(
    `${USER_CONTACTS_API_BASE_URL}/contacts`,
    contactData
  );
  return response.data;
};

export const deleteContact = async (contactId: string) => {
  await axios.delete(`${USER_CONTACTS_API_BASE_URL}/contacts/${contactId}`);
};
