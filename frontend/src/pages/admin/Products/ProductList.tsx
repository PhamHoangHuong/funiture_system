import React, { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react/dist/iconify.js"
import DataTable from "react-data-table-component"
import { Input, Button } from "reactstrap"
import { useProductContext } from "../../../core/contexts/ProductContext"
import { Product } from "../../../core/hooks/dataTypes"
import { useTranslation } from "react-i18next"
import { formatCurrency } from "../../../core/hooks/format"

const ProductList: React.FC = () => {
    const { t } = useTranslation()
    const { products: productList, loading, error, fetchProducts } = useProductContext()
    const [products, setProducts] = useState<Product[]>([])
    const [originalProducts, setOriginalProducts] = useState<Product[]>([])
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [filters, setFilters] = useState<Record<string, string>>({})

    const headers = [
        { key: "id", label: t("product.id"), sortable: true },
        { key: "imageUrl", label: t("product.image"), sortable: false },
        { key: "name", label: t("product.name"), sortable: true },
        { key: "price", label: t("product.price"), sortable: true },
        { key: "status", label: t("product.status"), sortable: true },
        { key: "stock", label: t("product.stock"), sortable: true },
        { key: "actions", label: t("product.actions"), sortable: false },
    ]

    // Lọc sản phẩm dựa trên các bộ lọc và phân trang
    const filterProducts = useCallback(
        (page: number) => {
            // Lọc sản phẩm dựa trên các bộ lọc
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
            // Tính toán phân trang
            const start = (page - 1) * perPage
            const end = start + perPage
            console.log(filteredData.slice(start, end))
            setProducts(filteredData.slice(start, end))
            setTotalRows(filteredData.length)
        },
        [filters, perPage, originalProducts]
    )

    // Gọi filterProducts khi filters thay đổi
    useEffect(() => {
        filterProducts(1)
    }, [filters, filterProducts])

    // Cập nhật state khi danh sách sản phẩm thay đổi
    useEffect(() => {
        if (productList.length > 0) {
            setOriginalProducts(productList)
            setProducts(productList)
            setTotalRows(productList.length)
        }
    }, [productList])

    // Xử lý khi thay đổi trang
    const handlePageChange = (page: number) => {
        filterProducts(page)
    }

    // Xử lý khi thay đổi số lượng sản phẩm trên mỗi trang
    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage)
    }

    // Xử lý khi thay đổi giá trị tìm kiếm
    const handleSearch = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    // Định nghĩa cấu trúc cột cho DataTable
    const columns = headers.map((header) => ({
        name: header.label,
        selector: (row: Product) => {
            const value = row[header.key as keyof Product]
            return value !== null && value !== undefined ? value.toString() : ""
        },
        sortable: header.sortable,
        cell: (row: Product) => {
            // Xử lý hiển thị cho từng loại cột
            if (header.key === "imageUrl") {
                // Hiển thị hình ảnh sản phẩm
                return (
                    <img
                        src={row.image ?? "placeholder-image-url.jpg"}
                        alt={row.name ?? "No Name"}
                        width="50"
                        height="50"
                        className="rounded-circle"
                    />
                )
            }
            if (header.key === "price") {
                // Định dạng giá tiền
                return formatCurrency(row.price)
            }
            if (header.key === "status") {
                // Hiển thị trạng thái sản phẩm
                return row.status === 1 ? t("product.inStock") : t("product.outOfStock")
            }
            if (header.key === "stock") {
                // Hiển thị số lượng tồn kho
                return row.stock_quantity
            }
            if (header.key === "actions") {
                // Hiển thị các nút hành động
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
            // Trả về giá trị mặc định cho các cột khác
            return row[header.key as keyof Product] ?? null
        },
    }))

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{t("product.management")}</h2>
            {loading && <p>{t("common.loading")}</p>}
            {error && <p>{t("common.error", { message: error })}</p>}
            {!loading && !error && (
                <>
                    <p>{t("product.totalCount", { count: productList.length })}</p>

                    <div className="mb-3">
                        <Link to="/admin/products/create" className="btn btn-primary">
                            <Icon icon="mdi:plus" className="me-1" /> {t("product.add")}
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
                                            placeholder={t("product.searchPlaceholder", { field: header.label.toLowerCase() })}
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
                </>
            )}
        </div>
    )
}

export default ProductList
