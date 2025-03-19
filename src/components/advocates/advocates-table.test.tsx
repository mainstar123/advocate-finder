import { fireEvent, render, screen } from "@testing-library/react";
import AdvocatesTable from "./advocates-table";
import { advocateData } from "@/db/mock/advocates";
import { IAdvocate } from "@/types/advocates";

// Mock the SearchBar component
jest.mock("@/components/shared/search-bar", () => {
  return function MockSearchBar({ searchTerm, onChange, onReset }: any) {
    return (
      <div data-testid="mock-search-bar">
        <input
          data-testid="search-input"
          value={searchTerm}
          onChange={onChange}
        />
        <button data-testid="clear-button" onClick={onReset}>
          Clear
        </button>
      </div>
    );
  };
});

// Mock Ant Design's Table component
jest.mock("antd", () => {
  const ActualAntd = jest.requireActual("antd");
  return {
    ...ActualAntd,
    Table: jest.fn(
      ({
        columns,
        dataSource,
        loading,
        pagination,
        onChange,
        title,
        "aria-label": ariaLabel,
      }) => (
        <div data-testid="mock-table" aria-label={ariaLabel}>
          {title && title()}
          <div>Columns: {columns.length}</div>
          <div>Data length: {dataSource.length}</div>
          <div>Loading: {loading.toString()}</div>
          <div>Pagination: {JSON.stringify(pagination)}</div>
          <button
            data-testid="change-page-button"
            onClick={() => onChange({ current: 2, pageSize: 10 })}
          >
            Change Page
          </button>
        </div>
      ),
    ),
  };
});

describe("AdvocatesTable", () => {
  const mockAdvocates: IAdvocate[] = advocateData.map((advocate, index) => ({
    ...advocate,
    id: `index-${index}`,
    createdAt: new Date(),
  }));

  const defaultProps = {
    advocates: mockAdvocates,
    total: 1,
    isLoading: false,
    tableParams: {
      pagination: {
        current: 1,
        pageSize: 10,
      },
    },
    searchTerm: "",
    onTableChange: jest.fn(),
    onSearchChange: jest.fn(),
    onClear: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Table with correct props", () => {
    render(<AdvocatesTable {...defaultProps} />);

    const table = screen.getByTestId("mock-table");
    expect(table).toBeInTheDocument();
    expect(screen.getByText("Columns: 7")).toBeInTheDocument();
    expect(
      screen.getByText(`Data length: ${mockAdvocates.length}`),
    ).toBeInTheDocument();
    expect(screen.getByText("Loading: false")).toBeInTheDocument();
    expect(
      screen.getByText(/Pagination:.*"current":1,"pageSize":10,"total":1/),
    ).toBeInTheDocument();
  });

  it("renders the SearchBar in the table title with correct props", () => {
    render(<AdvocatesTable {...defaultProps} />);

    const searchBar = screen.getByTestId("mock-search-bar");
    expect(searchBar).toBeInTheDocument();
    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toHaveValue("");
  });

  it("shows loading state when isLoading is true", () => {
    render(<AdvocatesTable {...defaultProps} isLoading={true} />);

    expect(screen.getByText("Loading: true")).toBeInTheDocument();
  });

  it("calls onTableChange when pagination changes", () => {
    render(<AdvocatesTable {...defaultProps} />);

    const changePageButton = screen.getByTestId("change-page-button");
    fireEvent.click(changePageButton);

    expect(defaultProps.onTableChange).toHaveBeenCalledWith({
      current: 2,
      pageSize: 10,
    });
  });

  it("calls onClear when clear button is clicked", () => {
    render(<AdvocatesTable {...defaultProps} />);

    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);

    expect(defaultProps.onClear).toHaveBeenCalledTimes(1);
  });

  it("renders with empty advocates array", () => {
    render(<AdvocatesTable {...defaultProps} advocates={[]} />);

    expect(screen.getByText("Data length: 0")).toBeInTheDocument();
  });

  it("sets correct aria-label on the table", () => {
    render(<AdvocatesTable {...defaultProps} />);

    const table = screen.getByTestId("mock-table");
    expect(table).toHaveAttribute("aria-label", "Advocates Table");
  });
});
