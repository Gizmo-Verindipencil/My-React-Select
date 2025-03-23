import {
  render,
  renderHook,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import LazySelect from "./LazySelect";
import "@testing-library/jest-dom";

describe("LazySelect Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders the select component", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <LazySelect
          name="testSelect"
          fetch={async () => {
            return new Promise((resolve) => {
              setTimeout(() => resolve(options), 0);
            });
          }}
        />
      </FormProvider>,
    );
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  it("renders with a label if provided", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <LazySelect
          name="testSelect"
          label="Test Label"
          fetch={async () => {
            return new Promise((resolve) => {
              setTimeout(() => resolve(options), 0);
            });
          }}
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
          <LazySelect
            name="testSelect"
            fetch={async () => {
              return new Promise((resolve) => {
                setTimeout(() => resolve(options), 0);
              });
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>,
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.focus(selectElement);
    await waitFor(() => screen.getByText("Option 2"));
    await userEvent.selectOptions(selectElement, "option2");

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

  it("does not load items until focused", async () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <LazySelect
          name="testSelect"
          fetch={async () => {
            return new Promise((resolve) => {
              setTimeout(() => resolve(options), 0);
            });
          }}
        />
      </FormProvider>,
    );

    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    const selectElement = screen.getByRole("combobox");
    fireEvent.focus(selectElement);
    await waitFor(() => screen.getByText("Option 1"));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });
});
