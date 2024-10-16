import { Icon } from "@iconify/react/dist/iconify.js"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    RowSelectionState,
    useReactTable,
} from "@tanstack/react-table"
import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Pagination from "../../../components/user/Pagination/Pagination"

interface ProductItem {
    id: number
    name: string
    image: string
    price: number
    stock: number
    parent_id: number
    sku: string
}

const data: ProductItem[] = [
    {
        id: 1, // Thêm id cho sản phẩm
        name: "Product 1",
        image: "/assets/admin/images/product/p-1.png",
        price: 19.99,
        stock: 50,
        parent_id: 1,
        sku: "SKU-001",
    },
    {
        id: 2, // Thêm id cho sản phẩm
        name: "Product 2",
        image: "/assets/admin/images/product/p-1.png",
        price: 29.99,
        stock: 30,
        parent_id: 1,
        sku: "SKU-002",
    },
    {
        id: 3, // Thêm id cho sản phẩm
        name: "Product 3",
        image: "/assets/admin/images/product/p-1.png",
        price: 39.99,
        stock: 20,
        parent_id: 2,
        sku: "SKU-003",
    },
    {
        id: 4, // Thêm id cho sản phẩm
        name: "Product 4",
        image: "/assets/admin/images/product/p-1.png",
        price: 49.99,
        stock: 15,
        parent_id: 2,
        sku: "SKU-004",
    },
    {
        id: 5, // Thêm id cho sản phẩm
        name: "Product 5",
        image: "/assets/admin/images/product/p-1.png",
        price: 59.99,
        stock: 10,
        parent_id: 3,
        sku: "SKU-005",
    },
]

const columns: ColumnDef<ProductItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const { id } = row.original
            return <span>{id}</span>
        },
    },
    {
        accessorKey: "name",
        header: "Product Name & SKU",
        cell: ({ row }) => {
            const { name, sku } = row.original
            return (
                <div className="d-flex flex-column">
                    <a href="#!" className="text-dark fw-medium fs-15">
                        {name}
                    </a>
                    <p className="text-muted mb-0 mt-1 fs-13">
                        <span>{sku}</span>
                    </p>
                </div>
            )
        },
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const { image } = row.original
            return (
                <img
                    src={image}
                    alt={row.getValue("name")}
                    className="img-thumbnail "
                    style={{ width: "200px", height: "150px" }}
                />
            )
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const { price } = row.original
            return <span>${price.toFixed(2)}</span>
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const { stock } = row.original
            return <span>{stock}</span>
        },
    },
    {
        accessorKey: "parent_id",
        header: "Parent ID",
        cell: ({ row }) => {
            const { parent_id } = row.original
            return <span>{parent_id}</span>
        },
    },
    {
        header: "Actions",
        cell: ({ row }) => (
            <div className="d-flex gap-2">
                <a href="#!" className="btn btn-light btn-sm">
                    <Icon
                        icon="solar:eye-broken"
                        className="align-middle fs-18"
                    />
                </a>
                <Link
                    to={`/admin/products/edit/${row.original.id}`}
                    className="btn btn-soft-primary btn-sm"
                >
                    <Icon
                        icon="solar:pen-2-broken"
                        className="align-middle fs-18"
                    />
                </Link>
                <a href="#!" className="btn btn-soft-danger btn-sm">
                    <Icon
                        icon="solar:trash-bin-minimalistic-2-broken"
                        className="align-middle fs-18"
                    />
                </a>
            </div>
        ),
    },
]
// Số lượng item trên 1 trang
const PAGE_SIZE = 4
const ProductList: React.FC = () => {
    const [searchParam] = useSearchParams()
    const pageParam = searchParam.get("page")
    const page = pageParam ? Number(pageParam) : 1
    const pageIndex = page - 1
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [pagination, setPagination] = useState({
        pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
        pageSize: PAGE_SIZE, //default page size
    })
    const table = useReactTable({
        data,
        columns,
        state: { rowSelection, pagination },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
    })

    useEffect(() => {
        table.setPagination({
            pageIndex,
            pageSize: PAGE_SIZE,
        })
    }, [table, pageIndex])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        {/* <div className="card-header d-flex justify-content-between align-items-center gap-1">
                            <h4 className="card-title flex-grow-1">
                                All Product List
                            </h4>
                            <a
                                href="product-add.html"
                                className="btn btn-sm btn-primary"
                            >
                                Add Product
                            </a>
                            <div className="dropdown">
                                <a
                                    href="#"
                                    className="dropdown-toggle btn btn-sm btn-outline-light"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    This Month
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <a href="#!" className="dropdown-item">
                                        Download
                                    </a>
                                    <a href="#!" className="dropdown-item">
                                        Export
                                    </a>
                                    <a href="#!" className="dropdown-item">
                                        Import
                                    </a>
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <div className="table-responsive">
                                <table className="table align-middle mb-0 table-hover table-centered">
                                    <thead className="bg-light-subtle">
                                        {table
                                            .getHeaderGroups()
                                            .map((headerGroup) => (
                                                <tr key={headerGroup.id}>
                                                    {headerGroup.headers.map(
                                                        (column) => (
                                                            <th key={column.id}>
                                                                {flexRender(
                                                                    column
                                                                        .column
                                                                        .columnDef
                                                                        .header,
                                                                    column.getContext()
                                                                )}
                                                            </th>
                                                        )
                                                    )}
                                                </tr>
                                            ))}
                                    </thead>
                                    <tbody>
                                        {table.getRowModel().rows.map((row) => (
                                            <tr key={row.id}>
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <td key={cell.id}>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination
                            page={table.getState().pagination.pageIndex + 1}
                            pageSize={table.getPageCount()}
                            pathname="/admin/products"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
