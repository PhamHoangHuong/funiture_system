import React, { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react/dist/iconify.js"
import DataTable from "react-data-table-component"
import { Input, Button } from "reactstrap"
import { useQuery } from "@tanstack/react-query"
import productApi from "../../../services/productService"
import { Product } from "../../../types/product.type"

const headers = [
    { key: "id", label: "ID", sortable: true },
    { key: "imageUrl", label: "Hình ảnh", sortable: false },
    { key: "name", label: "Tên sản phẩm", sortable: true },
    { key: "price", label: "Giá", sortable: true },
    { key: "status", label: "Trạng thái", sortable: true },
    { key: "stock", label: "Số lượng", sortable: true },
    { key: "actions", label: "Thao tác", sortable: false },
]

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [originalProducts, setOriginalProducts] = useState<Product[]>([])
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [filters, setFilters] = useState<Record<string, string>>({})
    const { data } = useQuery({
        queryKey: ["products"],
        queryFn: () => productApi.getProduct(),
    })
    const productList = data?.data.data ?? []

    const fetchProducts = useCallback(
        (page: number) => {
            const filteredData = originalProducts.filter((product) =>
                Object.entries(filters).every(([key, value]) => {
                    const field = product[key as keyof Product]
                    if (field !== null && field !== undefined) {
                        return field
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase())
                    }
                    return false
                })
            )
            const start = (page - 1) * perPage
            const end = start + perPage
            console.log(filteredData.slice(start, end))
            setProducts(filteredData.slice(start, end))
            setTotalRows(filteredData.length)
        },
        [filters, perPage, originalProducts]
    )

    useEffect(() => {
        fetchProducts(1)
    }, [filters, fetchProducts])

    useEffect(() => {
        if (data?.data.data) {
            setOriginalProducts(data.data.data)
            setProducts(data.data.data)
            setTotalRows(data.data.data.length)
        }
    }, [data])
    const handlePageChange = (page: number) => {
        fetchProducts(page)
    }

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage)
    }

    const handleSearch = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const columns = headers.map((header) => ({
        name: header.label,
        selector: (row: Product) => {
            const value = row[header.key as keyof Product]
            return value !== null && value !== undefined ? value.toString() : ""
        },
        sortable: header.sortable,
        cell: (row: Product) => {
            if (header.key === "imageUrl") {
                return (
                    <img
                        src={row.image ?? "placeholder-image-url.jpg"} // Đảm bảo xử lý khi image là null
                        alt={row.name ?? "No Name"}
                        width="50"
                        height="50"
                        className="rounded-circle"
                    />
                )
            }
            if (header.key === "price") {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(row.price)
            }
            if (header.key === "status") {
                return row.status === 1 ? "Còn hàng" : "Hết hàng" // Hiển thị trạng thái
            }
            if (header.key === "stock") {
                return row.stock_quantity
            }
            if (header.key === "actions") {
                return (
                    <>
                        <Button color="primary" size="sm" className="me-1">
                            <Icon icon="mdi:eye" />
                        </Button>
                        <Button color="warning" size="sm" className="me-1">
                            <Icon icon="mdi:pencil" />
                        </Button>
                        <Button color="danger" size="sm">
                            <Icon icon="mdi:delete" />
                        </Button>
                    </>
                )
            }
            return row[header.key as keyof Product] ?? null
        },
    }))

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Quản Lý Sản Phẩm</h2>
            <p>Tổng số sản phẩm: {productList.length}</p>

            <div className="mb-3">
                <Link to="/admin/products/create" className="btn btn-primary">
                    <Icon icon="mdi:plus" className="me-1" /> Thêm Sản Phẩm
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={products}
                fixedHeader
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                subHeader
                subHeaderComponent={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        {headers
                            .filter((h) => h.sortable)
                            .map((header) => (
                                <Input
                                    key={header.key}
                                    type="text"
                                    placeholder={`Tìm ${header.label.toLowerCase()}...`}
                                    onChange={(e) =>
                                        handleSearch(header.key, e.target.value)
                                    }
                                    style={{
                                        width: "200px",
                                        marginRight: "10px",
                                    }}
                                />
                            ))}
                    </div>
                }
            />
        </div>
    )
}

export default ProductList
