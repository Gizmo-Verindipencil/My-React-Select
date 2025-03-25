import {
  render,
  renderHook,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import TableOverlayIncrementalSearchSelect from "./TableOverlayIncrementalSearchSelect";
import "@testing-library/jest-dom";

describe("TableOverlayIncrementalSearchSelect Component", () => {
  const options = [
    { value: "option1", labels: ["Option 1-1", "Option 1-2"] },
    { value: "option2", labels: ["Option 2-1", "Option 2-2"] },
    { value: "option3", labels: ["Option 3-1", "Option 3-2"] },
  ];

  it("renders the select component", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <TableOverlayIncrementalSearchSelect
          name="testSelect"
          options={options}
        />
      </FormProvider>,
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders with a label if provided", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <TableOverlayIncrementalSearchSelect
          name="testSelect"
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
          <TableOverlayIncrementalSearchSelect
            name="testSelect"
            options={options}
          />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Option 2-1" } });
    await waitFor(() => screen.getByText("Option 2-1"));
    fireEvent.click(screen.getByText("Option 2-1"));

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

  it("filters options based on search term", async () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <TableOverlayIncrementalSearchSelect
          name="testSelect"
          options={options}
        />
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Option 1-1" } });

    await waitFor(() => screen.getByText("Option 1-1"));
    expect(screen.getByText("Option 1-1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2-1")).not.toBeInTheDocument();
  });

  it("closes the dropdown on blur", async () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <TableOverlayIncrementalSearchSelect
          name="testSelect"
          options={options}
        />
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Option" } });
    await waitFor(() => screen.getByText("Option 1-1"));
    expect(screen.getByText("Option 1-1")).toBeInTheDocument();

    fireEvent.blur(inputElement);
    await waitFor(
      () => {
        expect(screen.queryByText("Option 1-1")).not.toBeInTheDocument();
      },
      { timeout: 300 },
    );
  });

  it("updates the search term when an option is selected", async () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <TableOverlayIncrementalSearchSelect
          name="testSelect"
          options={options}
        />
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Option 2-1" } });
    await waitFor(() => screen.getByText("Option 2-1"));
    fireEvent.click(screen.getByText("Option 2-1"));

    expect(inputElement).toHaveValue("Option 2-1");
  });
});
