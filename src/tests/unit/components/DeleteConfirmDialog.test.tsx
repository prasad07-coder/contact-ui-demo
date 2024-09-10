import { render, screen, fireEvent } from "@testing-library/react";
import DeleteConfirmDialog from "../../../components/DeleteConfirmDialog";
import { CONTACT_MESSAGES } from "../../../constants";

describe("DeleteConfirmDialog", () => {
  const handleDeleteClick = jest.fn();
  const handleConfirmDelete = jest.fn();

  beforeEach(() => {
    handleDeleteClick.mockClear();
    handleConfirmDelete.mockClear();
  });

  test("renders correctly when open", () => {
    render(
      <DeleteConfirmDialog
        open={true}
        handleDeleteClick={handleDeleteClick}
        handleConfirmDelete={handleConfirmDelete}
      />
    );

    expect(screen.getByText("Confirm Deletion")).toBeInTheDocument();
    expect(
      screen.getByText(CONTACT_MESSAGES.DELETE_CONFIRMATION)
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("calls handleDeleteClick when Cancel button is clicked", () => {
    render(
      <DeleteConfirmDialog
        open={true}
        handleDeleteClick={handleDeleteClick}
        handleConfirmDelete={handleConfirmDelete}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(handleDeleteClick).toHaveBeenCalledTimes(1);
  });

  test("calls handleConfirmDelete when Delete button is clicked", () => {
    render(
      <DeleteConfirmDialog
        open={true}
        handleDeleteClick={handleDeleteClick}
        handleConfirmDelete={handleConfirmDelete}
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(handleConfirmDelete).toHaveBeenCalledTimes(1);
  });

  test("does not render when open is false", () => {
    render(
      <DeleteConfirmDialog
        open={false}
        handleDeleteClick={handleDeleteClick}
        handleConfirmDelete={handleConfirmDelete}
      />
    );

    expect(screen.queryByText("Confirm Deletion")).not.toBeInTheDocument();
  });
});
