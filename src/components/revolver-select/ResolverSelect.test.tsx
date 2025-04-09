import "@testing-library/jest-dom";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import RevolverSelect from "./RevolverSelect";

describe("RevolverSelect Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders the revolver select component with options", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <RevolverSelect name="testRevolverSelect" options={options} />
      </FormProvider>,
    );
    const selectElement = screen.getByDisplayValue("Option 1"); // 初期値
    expect(selectElement).toBeInTheDocument();
  });

  it("renders with a label if provided", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <RevolverSelect
          name="testRevolverSelect"
          options={options}
          label="Test Label"
        />
      </FormProvider>,
    );

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("updates the form value when an option is selected", async () => {
    const { result } = renderHook(() => useForm());
    const onSubmit = jest.fn();

    render(
      <FormProvider {...result.current}>
        <form onSubmit={result.current.handleSubmit(onSubmit)}>
          <RevolverSelect name="testRevolverSelect" options={options} />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>,
    );

    // Focus to show options
    const selectElement = screen.getByDisplayValue("Option 1");
    fireEvent.focus(selectElement);

    // Select an option
    const option2Element = screen.getByText("Option 2");
    fireEvent.click(option2Element);

    fireEvent.click(screen.getByText("Submit"));
    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for state update

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        testRevolverSelect: "option2",
      }),
      expect.anything(),
    );
  });

  it("renders without errors when no options are provided", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <RevolverSelect name="testRevolverSelect" options={[]} />
      </FormProvider>,
    );

    const selectElement = screen.queryByRole("button");
    expect(selectElement).toBeNull(); // or adjust expectation based on actual behavior
  });
});
