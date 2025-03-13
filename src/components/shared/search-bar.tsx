import { Button, Input, Space } from "antd";
import { ChangeEvent, memo } from "react";

interface SearchBarProps {
  searchTerm: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

/**
 * SearchBar Component
 *
 * This component provides a search input field and a reset button.
 * It allows users to enter a search term and reset the input field.
 *
 * Props:
 * - searchTerm: The current search term.
 * - onChange: Function to handle changes in the search input.
 * - onReset: Function to reset the search input.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onChange,
  onReset,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
    onChange({ ...e, target: { ...e.target, value: sanitizedValue } });
  };

  return (
    <Space>
      <label htmlFor="search-input" className="sr-only">
        Search advocates
      </label>
      <Input
        id="search-input"
        aria-label="Search advocates"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button aria-label="Reset search" onClick={onReset}>
        Reset
      </Button>
    </Space>
  );
};

export default memo(SearchBar);
