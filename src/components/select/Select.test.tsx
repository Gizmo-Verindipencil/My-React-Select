import { render, renderHook, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import Select from "./Select";
import "@testing-library/jest-dom";

const { result } = renderHook(() => useForm());

describe("Select Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders the select component with options", () => {
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
    render(
      <FormProvider {...result.current}>
        <Select name="testSelect" options={options} label="Test Label" />
      </FormProvider>,
    );

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("updates the form value when an option is selected", async () => {
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
    fireEvent.change(selectElement, { target: { value: "option2" } });
    fireEvent.click(screen.getByText("Submit"));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        testSelect: "option2",
      }),
    );
  });

  it("renders without errors when no options are provided", () => {
    render(
      <FormProvider {...result.current}>
        <Select name="testSelect" options={[]} />
      </FormProvider>,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });
});
