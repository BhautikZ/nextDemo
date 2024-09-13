import { useRouter } from "next/navigation";
import React from "react";
import { FaEdit, FaEye, FaSortDown, FaSortUp, FaTrash } from "react-icons/fa";

type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => JSX.Element | string;
  className?: string;
};

type TableProps<T> = {
  columns: any;
  tableData: any;
  loading: any;
  onDelete?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageClassNames?: string;
  actionButtons?: (row: T) => JSX.Element;
  defaultImage?: any;
  onSort: any;
  sortorder: any;
  sortcoloum: any;
  searchQuery: any;
  error?: any;
  setSearchQuery: any;
  label: string;
  onView?: any;
  viewHandler?: any;
  onEdit?: any;
  addButton?: any;
  addButtonRoute?: any;
  editButtonRoute?: any;
};

export const CommonTable = <T extends { id: string }>({
  columns,
  tableData,
  loading,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  pageClassNames = "",
  actionButtons,
  defaultImage,
  sortcoloum,
  sortorder,
  onSort,
  searchQuery,
  error,
  setSearchQuery,
  onView,
  label,
  viewHandler,
  onEdit,
  addButton,
  addButtonRoute,
  editButtonRoute,
}: TableProps<T>) => {
  console.log(tableData, "data", columns, onView, onDelete);
  const renderSortIcon = (columnKey: string) => {
    if (sortcoloum === columnKey) {
      return sortorder === "asc" ? (
        <FaSortUp className="inline ml-2" />
      ) : (
        <FaSortDown className="inline ml-1" />
      );
    }
    return null;
  };

  const router = useRouter();

  return (
    <div>
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg mt-[14px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">{label}</h1>
          <div className="flex space-x-4 items-center">
            {addButton && (
              <button
                onClick={addButtonRoute}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
              >
                + {addButton}
              </button>
            )}

            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column: any) => (
                <th
                  key={column.label}
                  onClick={() => onSort(column.key)} // Trigger sort on click
                  className={`py-4 px-6 text-left font-semibold text-gray-600 ${
                    column.className || ""
                  }`}
                >
                  {column.label}
                  {renderSortIcon(column.key)}
                </th>
              ))}
              {onDelete && (
                <th className="py-4 px-6 text-left font-semibold text-gray-600">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row: any, index: number) => {
              console.log(row, "rowww");
              return (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column: any) => (
                    <td
                      key={column.key}
                      className="py-4 px-6 border-gray-200 text-gray-800"
                    >
                      {column.render ? (
                        column.render(row) // Use the render function if provided
                      ) : column.type === "image" ? (
                        <img
                          src={
                            row[column.key]?.length > 0
                              ? row.provider
                                ? row[column.key][0]
                                : `${process.env.NEXT_PUBLIC_BASE_URL}${
                                    row[column.key][0]
                                  }`
                              : defaultImage.src
                          }
                          alt={row?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : column.key === "isActive" ? (
                        row[column.key] ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-red-600">Inactive</span>
                        )
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                  <td className="py-4 px-6 border-gray-200 flex space-x-4">
                    {onView && (
                      <button
                        className="text-blue-500 hover:text-red-700"
                        onClick={() => viewHandler(row?._id)}
                      >
                        <FaEye size={20} />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() =>
                          router.push(`${editButtonRoute}/${row?._id}`)
                        }
                      >
                        <FaEdit size={20} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="text-red-500 hover:text-blue-700"
                        onClick={() => onDelete(row?._id)}
                      >
                        <FaTrash size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {onPageChange && (
          <div
            className={`mt-6 flex justify-between items-center ${pageClassNames}`}
          >
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
