"use client";

import AdvocatesTable from "@/components/advocates/advocates-table";
import {
  SEARCH_DEBOUNCE_TIME,
  TABLE_DEFAULT_PAGE,
  TABLE_DEFAULT_SIZE,
} from "@/config";
import useDebounce from "@/hooks/use-debounce";
import { useFetchAdvocates } from "@/hooks/use-fetch-advocates";
import { TablePaginationConfig } from "antd/es/table";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

interface TableParams {
  pagination: TablePaginationConfig;
}

const AdvocatesTableContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME);
  const [isPending, startTransition] = useTransition();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: TABLE_DEFAULT_PAGE,
      pageSize: TABLE_DEFAULT_SIZE,
    },
  });

  const { advocates, isFetching, total } = useFetchAdvocates({
    page: tableParams.pagination.current || TABLE_DEFAULT_PAGE,
    pageSize: tableParams.pagination.pageSize || TABLE_DEFAULT_SIZE,
    search: debouncedSearchTerm,
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams((prev) => ({
      pagination: {
        ...prev.pagination,
        ...pagination,
      },
    }));
  };

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    startTransition(() => {
      setSearchTerm(newSearchTerm);
    });
  }, []);

  const handleClear = useCallback(() => {
    startTransition(() => {
      setSearchTerm("");
    });
  }, []);

  useEffect(() => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  }, [debouncedSearchTerm, tableParams.pagination?.pageSize]);

  return (
    <AdvocatesTable
      advocates={advocates}
      total={total}
      isLoading={isPending || isFetching}
      tableParams={tableParams}
      searchTerm={searchTerm}
      onTableChange={handleTableChange}
      onSearchChange={handleSearchChange}
      onClear={handleClear}
    />
  );
};

export default AdvocatesTableContainer;
