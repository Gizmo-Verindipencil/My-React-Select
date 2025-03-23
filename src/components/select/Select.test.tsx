import {
  render,
  renderHook,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import Select from "./Select";
import "@testing-library/jest-dom";

describe("Select Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders the select component with options", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <Select name="testSelect" options={options} />
      </FormProvider>,
    );
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    options.forEach((option) => {
      const optionElement = screen.getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it("renders with a label if provided", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <Select name="testSelect" options={options} label="Test Label" />
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
          <Select name="testSelect" options={options} />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>,
    );

    const selectElement = screen.getByRole("combobox");
    await userEvent.selectOptions(selectElement, "option2");
    await waitFor(() =>
      expect(result.current.getValues("testSelect")).toBe("option2"),
    );

    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          testSelect: "option2",
        }),
        expect.anything(),
      ),
    );
  });

  it("renders without errors when no options are provided", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <Select name="testSelect" options={[]} />
      </FormProvider>,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });
});
