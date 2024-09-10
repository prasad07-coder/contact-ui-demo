import { render, screen } from "@testing-library/react";
import ContactModal from "../../../features/contactForm/ContactFormModal";

describe("ContactModal", () => {
  const handleClose = jest.fn();
  const onSubmit = jest.fn();
  it("should display 'Add Contact' when defaultValues is not provided", () => {
    render(
      <ContactModal open={true} handleClose={handleClose} onSubmit={onSubmit} />
    );

    expect(screen.getByText("Add Contact")).toBeInTheDocument();
  });

  it("should display 'Edit Contact' when defaultValues is provided", () => {
    const defaultValues = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      firstName: "",
      lastName: "",
      phone: "",
    };
    render(
      <ContactModal
        open={true}
        handleClose={handleClose}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByText("Edit Contact")).toBeInTheDocument();
  });

  it("should call handleClose when the Cancel button is clicked", () => {
    render(
      <ContactModal open={true} handleClose={handleClose} onSubmit={onSubmit} />
    );

    const cancelButton = screen.getByText("Cancel");
    cancelButton.click();

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
