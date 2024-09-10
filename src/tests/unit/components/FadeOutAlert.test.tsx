import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import FadeOutAlert from "../../../components/FadeOutAlert";

describe("FadeOutAlert", () => {
  jest.useFakeTimers();

  it("renders the alert initially", () => {
    render(<FadeOutAlert message="Test message" status="success" />);

    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("disappears after 3 seconds", async () => {
    render(<FadeOutAlert message="Test message" status="error" />);

    // Move forward the timers by 3 seconds
    jest.advanceTimersByTime(3000);

    // Wait for the alert to disappear
    await waitFor(() => {
      expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });
  });

  it("calls setOpen with false when close button is clicked", () => {
    render(<FadeOutAlert message="Test message" status="success" />);

    // Click the close button
    fireEvent.click(screen.getByRole("button"));

    // Check if the alert is no longer in the document
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });
});
