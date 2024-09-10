import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, Reducer, UnknownAction } from "@reduxjs/toolkit";
import ContactList from "../../../features/contactList/ContactList"; // Adjust the import path as necessary
import contactReducer from "../../../redux/contactSlice"; // Adjust the import path as necessary
import { ContactState } from "../../../redux/types";

describe("ContactList Component", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        contacts: contactReducer as Reducer<
          ContactState,
          UnknownAction,
          { contacts: never[]; status: string; message: string }
        >,
      },
      preloadedState: {
        contacts: {
          contacts: [],
          status: "idle",
          message: "",
        },
      },
    });
    store.dispatch = jest.fn();
  });

  test("should render ContactList component", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    // Add your assertions here
    expect(
      getByText(
        /Your contact list is empty. Click 'Add Contact' to create one./i
      )
    ).toBeInTheDocument();
  });
});
