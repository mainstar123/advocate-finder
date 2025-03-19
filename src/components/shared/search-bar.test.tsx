import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./search-bar";

describe("SearchBar", () => {
  const mockOnChange = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnReset.mockClear();
    jest.useFakeTimers(); // Use fake timers to control timer behavior
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run any pending timers
    jest.useRealTimers(); // Restore real timers
  });

  it("renders the search input and reset button", () => {
    render(
      <SearchBar searchTerm="" onChange={mockOnChange} onReset={mockOnReset} />,
    );

    const input = screen.getByPlaceholderText("Search");
    const button = screen.getByRole("button", { name: /reset/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("calls onChange when the input value changes", () => {
    render(
      <SearchBar searchTerm="" onChange={mockOnChange} onReset={mockOnReset} />,
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("calls onReset when the reset button is clicked", () => {
    render(
      <SearchBar searchTerm="" onChange={mockOnChange} onReset={mockOnReset} />,
    );

    const button = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(button);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
