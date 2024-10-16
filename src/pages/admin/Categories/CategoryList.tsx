import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender, // Thêm flexRender ở đây
} from "@tanstack/react-table";
import Pagination from "../../../components/user/Pagination/Pagination";


const CategoryList: React.FC = () => {
  // Dữ liệu mẫu cho bảng
  const data = [
    {
      id: "FS16276",
      name: "Fashion Men, Women & Kid's",
      priceRange: "$80 to $400",
      createdBy: "Seller",
      stock: 46233,
      imageUrl: "assets/images/product/p-1.png",
    },
    {
      id: "HB73029",
      name: "Women Hand Bag",
      priceRange: "$120 to $500",
      createdBy: "Admin",
      stock: 2739,
      imageUrl: "assets/images/product/p-2.png",
    },
    // Thêm dữ liệu mẫu khác ở đây...
  ];

  // Định nghĩa các cột cho bảng
  const columns: ColumnDef<typeof data[0]>[] = [
    {
      accessorKey: "name",
      header: "Categories",
      cell: (info) => (
        <div className="d-flex align-items-center gap-2">
          <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
            <img src={info.row.original.imageUrl} className="avatar-md" alt="Category" />
          </div>
          <p className="text-dark fw-medium fs-15 mb-0">{info.getValue()}</p>
        </div>
      ),
    },
    {
      accessorKey: "priceRange",
      header: "Starting Price",
    },
    {
      accessorKey: "createdBy",
      header: "Created by",
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "stock",
      header: "Product Stock",
    },
    {
      accessorKey: "actions",
      header: "Action",
      cell: () => (
        <div className="d-flex gap-2">
          <a href="#!" className="btn btn-light btn-sm">
            <Icon icon="solar:eye-broken" className="align-middle fs-18" />
          </a>
          <a href="#!" className="btn btn-soft-primary btn-sm">
            <Icon icon="solar:pen-2-broken" className="align-middle fs-18" />
          </a>
          <a href="#!" className="btn btn-soft-danger btn-sm">
            <Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
          </a>
        </div>
      ),
    },
  ];

  // Sử dụng `useReactTable` từ "@tanstack/react-table"
  const [rowSelection, setRowSelection] = useState({});
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    pageCount: 3, // Số trang
    state: {
      pagination: {
        pageIndex,
        pageSize: 5,
      },
    },
    onPaginationChange: (updater) => {
      const { pageIndex: newIndex } = updater;
      setPageIndex(newIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="container-xxl">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Categories List</h4>
                <Link to="/product-add" className="btn btn-sm btn-primary">
                  Add Product
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      {table.getFlatHeaders().map((header) => (
                        <th key={header.id}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer border-top">
                <Pagination
                  pageIndex={pageIndex}
                  pageCount={table.getPageCount()}
                  gotoPage={table.setPageIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
