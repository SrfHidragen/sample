'use client';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import NoData from '../NoData';

type DataTableProps<TData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageSize?: number;
};

const DataTable = <TData,>({
  columns,
  data,
  pageSize = 10,
}: DataTableProps<TData>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize } },
  });
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-[1000px] text-white lg:w-full lg:min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    colSpan={header.colSpan}
                    key={header.id}
                    className="h-[81px] border border-[#FFCC01] p-[10.75px] text-center text-[18px] font-bold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-[#003186]">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="h-[50px] border border-[#FFCC01] p-[10.75px] text-center text-base font-normal"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.getRowModel().rows?.length === 0 && (
        <div className="border border-[#FFCC01]">
          <div className="flex w-full justify-center p-8">
            <NoData Error="No Data" className="text-white" />
          </div>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="h-4"></div>
      {/* <div className="flex flex-col justify-between sm:flex-row"> */}
      {/* <div className="mt-2 text-white">
          {table.getPrePaginationRowModel().rows.length} Rows
        </div> */}
      <div className="flex flex-wrap items-center justify-end gap-2 ">
        {/* <div className="flex items-center gap-2"> */}
        {/* <button
            className="w-5 rounded border border-[#FFCC01] p-1 text-white sm:w-10"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button> */}

        <button
          className="w-5 rounded border border-[#FFCC01] p-1 text-white sm:w-10"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="w-5 rounded border border-[#FFCC01] p-1 text-white sm:w-10"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>

        {/* <button
            className="w-5 rounded border border-[#FFCC01] p-1 text-white sm:w-10"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button> */}
        {/* <span className="flex items-center gap-1">
            <div className="hidden text-xs text-white sm:block sm:text-base">
              Page
            </div>
            <strong className="flex text-xs text-white sm:text-base">
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span> */}
        {/* <span className="flex items-center gap-1 text-xs text-white sm:text-base">
            | Go to page :
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="h-9 w-8 rounded-sm border p-1 text-black sm:w-10"
            />
          </span> */}
        {/* <div>
            <select
              className="h-9 w-12 rounded-sm py-1 text-xs sm:text-base"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 15, 20, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div> */}
        {/* </div> */}
      </div>
      {/* </div> */}
    </>
  );
};

export default DataTable;
