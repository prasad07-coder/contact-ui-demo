import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import contactSaga from "./contactSaga";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with reducers and middleware
export const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the contact saga
sagaMiddleware.run(contactSaga);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
