import SearchBar from "@/components/shared/search-bar";
import { IAdvocate } from "@/types/advocates";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { ChangeEvent } from "react";
import SpecialtyTag from "./specialty-tag";

const columns: ColumnsType<IAdvocate> = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    width: 150,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    width: 150,
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    width: 150,
  },
  {
    title: "Degree",
    dataIndex: "degree",
    key: "degree",
    width: 150,
  },
  {
    title: "Specialties",
    dataIndex: "specialties",
    key: "specialties",
    width: 300,
    render: (specialties: string[]) => (
      <div className="flex flex-wrap gap-2 max-w-[600px]">
        {specialties.map((specialty, index) => (
          <SpecialtyTag key={index} specialty={specialty} />
        ))}
      </div>
    ),
  },
  {
    title: "YoE.",
    dataIndex: "yearsOfExperience",
    key: "yearsOfExperience",
    width: 100,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 150,
    render: (phoneNumber: string) => (
      <a
        href={`tel:${phoneNumber}`}
        className="text-blue-500 no-underline hover:underline"
      >
        {phoneNumber}
      </a>
    ),
  },
];

interface AdvocatesTableProps {
  advocates: IAdvocate[];
  total: number;
  isLoading: boolean;
  tableParams: {
    pagination: TablePaginationConfig;
  };
  searchTerm: string;
  // eslint-disable-next-line no-unused-vars
  onTableChange: (pagination: TablePaginationConfig) => void;
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export default function AdvocatesTable({
  advocates,
  total,
  isLoading,
  tableParams,
  searchTerm,
  onTableChange,
  onSearchChange,
  onClear,
}: AdvocatesTableProps) {
  return (
    <Table
      columns={columns}
      dataSource={advocates}
      rowKey={(record) => record.id}
      loading={isLoading}
      bordered
      pagination={{ ...tableParams.pagination, total }}
      onChange={onTableChange}
      title={() => (
        <div className="flex justify-end">
          <SearchBar
            searchTerm={searchTerm}
            onChange={onSearchChange}
            onReset={onClear}
          />
        </div>
      )}
      scroll={{ x: "max-content", y: "calc(100vh - 330px)" }}
      aria-label="Advocates Table"
    />
  );
}
