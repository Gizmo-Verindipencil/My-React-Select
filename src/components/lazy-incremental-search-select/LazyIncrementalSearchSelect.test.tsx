import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import LazyIncrementalSearchSelect from "./LazyIncrementalSearchSelect";

describe("LazyIncrementalSearchSelect Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const mockFetch = jest.fn(() => Promise.resolve(options));

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("renders the select component", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <LazyIncrementalSearchSelect name="testSelect" fetch={mockFetch} />
      </FormProvider>,
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders with a label if provided", () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <LazyIncrementalSearchSelect
          name="testSelect"
          fetch={mockFetch}
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
          <LazyIncrementalSearchSelect name="testSelect" fetch={mockFetch} />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    fireEvent.change(inputElement, { target: { value: "Option 2" } });
    await waitFor(() => screen.getByText("Option 2"));
    fireEvent.click(screen.getByText("Option 2"));

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
        <LazyIncrementalSearchSelect name="testSelect" fetch={mockFetch} />
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    fireEvent.change(inputElement, { target: { value: "Option 1" } });

    await waitFor(() => screen.getByText("Option 1"));
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("closes the dropdown on blur", async () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <LazyIncrementalSearchSelect name="testSelect" fetch={mockFetch} />
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    fireEvent.change(inputElement, { target: { value: "Option" } });
    await waitFor(() => screen.getByText("Option 1"));
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    fireEvent.blur(inputElement);
    await waitFor(
      () => {
        expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
      },
      { timeout: 300 },
    );
  });

  it("only fetches options once", async () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <LazyIncrementalSearchSelect name="testSelect" fetch={mockFetch} />
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    fireEvent.blur(inputElement);

    fireEvent.focus(inputElement);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  });

  it("displays loading state while fetching", async () => {
    const { result } = renderHook(() => useForm());
    const promise = new Promise(() => {});
    const loadingMockFetch = jest.fn(() => promise);

    render(
      <FormProvider {...result.current}>
        <LazyIncrementalSearchSelect
          name="testSelect"
          fetch={async () => {
            await loadingMockFetch();
            return [];
          }}
        />
      </FormProvider>,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
