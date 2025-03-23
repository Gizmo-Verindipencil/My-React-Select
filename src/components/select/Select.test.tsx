import { render, screen, fireEvent } from "@testing-library/react";
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
    const methods = useForm();
    render(
      <FormProvider {...methods}>
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
    const methods = useForm();
    render(
      <FormProvider {...methods}>
        <Select name="testSelect" options={options} label="Test Label" />
      </FormProvider>,
    );

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("updates the form value when an option is selected", async () => {
    const methods = useForm();
    const onSubmit = jest.fn();

    render(
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
    const methods = useForm();
    render(
      <FormProvider {...methods}>
        <Select name="testSelect" options={[]} />
      </FormProvider>,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });
});
