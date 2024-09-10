/**
 * This file contains the contactSaga module.
 * The contactSaga module is responsible for handling the asynchronous actions related to contacts in the Redux store.
 * It uses Redux Saga to manage the side effects of these actions.
 *
 * @module contactSaga
 */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createContactSuccess,
  fetchContactsSuccess,
  updateContactSuccess,
  deleteContactSuccess,
  createContactFailed,
  fetchContactsFailed,
  updateContactFailed,
  deleteContactFailed,
} from "./contactSlice";
import {
  createContact,
  fetchContacts,
  updateContact,
  deleteContact,
} from "../api/contactServiceApi";
import {
  CREATE_CONTACT_ACTION,
  DELETE_CONTACT_ACTION,
  FETCH_CONTACTS_ACTION,
  UPDATE_CONTACT_ACTION,
} from "./contactActions";

// The fetchContactsSaga function is a generator function that fetches the contacts from the server.
function* fetchContactsSaga(): any {
  try {
    const response = yield call(fetchContacts);
    yield put(fetchContactsSuccess(response));
  } catch (error) {
    yield put(fetchContactsFailed());
  }
}

// The createContactSaga function is a generator function that creates a new contact on the server.
function* createContactSaga(action: any): any {
  try {
    const response = yield call(createContact, action.payload);
    yield put(createContactSuccess(response));
  } catch (error) {
    // ...logging and error handling
    yield put(createContactFailed());
  }
}

// The updateContactSaga function is a generator function that updates an existing contact on the server.
function* updateContactSaga(action: any): any {
  try {
    const contactData = action.payload;
    const response = yield call(updateContact, contactData);
    yield put(updateContactSuccess(response));
  } catch (error) {
    yield put(updateContactFailed());
  }
}

// The deleteContactSaga function is a generator function that deletes a contact from the server.
function* deleteContactSaga(action: any): any {
  try {
    yield call(deleteContact, action.payload);
    yield put(deleteContactSuccess(action.payload));
  } catch (error) {
    yield put(deleteContactFailed());
  }
}

// The contactSaga function is a generator function that listens for the following actions:
function* contactSaga() {
  yield takeLatest(CREATE_CONTACT_ACTION, createContactSaga);
  yield takeLatest(FETCH_CONTACTS_ACTION, fetchContactsSaga);
  yield takeLatest(UPDATE_CONTACT_ACTION, updateContactSaga);
  yield takeLatest(DELETE_CONTACT_ACTION, deleteContactSaga);
}

export default contactSaga;
