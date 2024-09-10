import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../../../features/contactForm/ContactForm"; // Adjust the import path as necessary

const mockOnSubmit = jest.fn();

const defaultValues = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
};

beforeEach(() => {
  mockOnSubmit.mockClear();
});

test("renders form fields with default values", () => {
  render(<ContactForm onSubmit={mockOnSubmit} defaultValues={defaultValues} />);

  expect(screen.getByLabelText(/First Name/i)).toHaveValue(
    defaultValues.firstName
  );
  expect(screen.getByLabelText(/Last Name/i)).toHaveValue(
    defaultValues.lastName
  );
  expect(screen.getByLabelText(/Email/i)).toHaveValue(defaultValues.email);
  expect(screen.getByLabelText(/Phone/i)).toHaveValue(defaultValues.phone);
});

test("displays validation errors", async () => {
  render(<ContactForm onSubmit={mockOnSubmit} />);

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  const findByTextContent =
    (text: string) => (content: any, element: HTMLElement) => {
      const hasText = (node: HTMLElement) => node.textContent === text;
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child as HTMLElement)
      );
      return nodeHasText && childrenDontHaveText;
    };

  expect(await screen.findByText(/First Name is required/)).toBeInTheDocument();
  expect(await screen.findByText(/Last Name is required/)).toBeInTheDocument();
  expect(await screen.findByText(/Email is required/)).toBeInTheDocument();
  expect(
    await screen.findByText(/Phone number is required/)
  ).toBeInTheDocument();
});
