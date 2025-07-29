"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Spinner from "@/components/spinner"

interface Column {
  header: string;
  accessor: string;
  render?: (row: any, rowIndex?: number) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading: boolean;
  rowActions?: (row: any) => React.ReactNode;
  emptyMessage?: string;
  showIndexColumn?: boolean;
}

export default function DataTable({
  columns,
  data,
  isLoading,
  rowActions,
  emptyMessage = "No data found. Try adjusting your filters.",
  showIndexColumn = true
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get paginated data
  const displayedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr className="border-b">
              {showIndexColumn && (
                <th className="px-4 py-3 text-left font-bold text-sm">
                  #
                </th>
              )}
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-4 py-3 text-left font-bold text-sm"
                >
                  {column.header}
                </th>
              ))}
              {rowActions && (
                <th className="px-4 py-3 text-left font-bold text-sm">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (rowActions ? 1 : 0) + (showIndexColumn ? 1 : 0)} className="text-center">
                  <Spinner />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (rowActions ? 1 : 0) + (showIndexColumn ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b hover:bg-gray-50">
                  {showIndexColumn && (
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 text-sm text-gray-600">
                      {column.render ? column.render(row, rowIndex) : row[column.accessor] || 'N/A'}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        {rowActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-18">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Generate page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Calculate which pages to show
            let pageNum;
            if (totalPages <= 5) {
              // If we have 5 or fewer pages, show all
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              // If we're on pages 1-3, show 1-5
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              // If we're on the last 3 pages, show the last 5 pages
              pageNum = totalPages - 4 + i;
            } else {
              // Otherwise, show 2 before and 2 after current page
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                onClick={() => handlePageChange(pageNum)}
                style={{ backgroundColor: '#725cff', color: 'white' }} 
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}