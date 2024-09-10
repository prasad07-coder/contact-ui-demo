import { render, screen } from "@testing-library/react";
import EmptyDataListOverlay from "../../../components/EmptyDataListOverlay";

describe("EmptyDataListOverlay", () => {
  it("renders the message passed as a prop", () => {
    const testMessage = "No data available";
    render(<EmptyDataListOverlay message={testMessage} />);

    const messageElement = screen.getByText(testMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it("applies the correct styles to the Box component", () => {
    const testMessage = "No data available";
    const { container } = render(
      <EmptyDataListOverlay message={testMessage} />
    );

    const boxElement = container.firstChild;
    expect(boxElement).toHaveStyle("display: flex");
    expect(boxElement).toHaveStyle("align-items: center");
    expect(boxElement).toHaveStyle("justify-content: center");
    expect(boxElement).toHaveStyle("height: 100%");
  });

  it("applies the correct styles to the Typography component", () => {
    const testMessage = "No data available";
    render(<EmptyDataListOverlay message={testMessage} />);

    const typographyElement = screen.getByText(testMessage);
    expect(typographyElement).toHaveStyle("font-weight: 700");
  });
});
