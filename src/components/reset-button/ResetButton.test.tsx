import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import ResetButton from "./ResetButton";

describe("ResetButton Component", () => {
  it("renders the button with the correct text", () => {
    const { getByText } = render(<ResetButton onClick={() => {}} />);
    const buttonElement = getByText("RESET");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<ResetButton onClick={onClickMock} />);
    const buttonElement = getByText("RESET");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
