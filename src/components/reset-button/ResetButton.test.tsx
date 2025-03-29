import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import ResetButton from "./ResetButton";

describe("ResetButton Component", () => {
  it("renders the button with the correct text", () => {
    const label = "test";
    const { getByText } = render(
      <ResetButton label="test" onClick={() => {}} />,
    );
    const buttonElement = getByText(label);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", () => {
    const label = "test";
    const onClickMock = jest.fn();
    const { getByText } = render(
      <ResetButton label={label} onClick={onClickMock} />,
    );
    const buttonElement = getByText(label);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
