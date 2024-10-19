import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from 'react-data-table-component';
import { Input, Button } from 'reactstrap';

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    status: string;
    stock: number;
}

const mockProducts: Product[] = [
    { id: 1, name: 'Bàn Sofa', imageUrl: '/assets/admin/images/products/sofa-table.png', price: 500000, status: 'Còn hàng', stock: 20 },
    { id: 2, name: 'Ghế Đơn', imageUrl: '/assets/admin/images/products/single-chair.png', price: 300000, status: 'Hết hàng', stock: 0 },
    { id: 3, name: 'Tủ Quần Áo', imageUrl: '/assets/admin/images/products/wardrobe.png', price: 1500000, status: 'Còn hàng', stock: 15 },
    { id: 4, name: 'Bàn Ăn', imageUrl: '/assets/admin/images/products/dining-table.png', price: 1200000, status: 'Còn hàng', stock: 10 },
    { id: 5, name: 'Giường Ngủ', imageUrl: '/assets/admin/images/products/bed.png', price: 2000000, status: 'Còn hàng', stock: 5 },
    { id: 6, name: 'Tủ Giày', imageUrl: '/assets/admin/images/products/shoe-cabinet.png', price: 700000, status: 'Còn hàng', stock: 25 },
    { id: 7, name: 'Ghế Sofa', imageUrl: '/assets/admin/images/products/sofa.png', price: 2500000, status: 'Còn hàng', stock: 8 },
    { id: 8, name: 'Kệ Sách', imageUrl: '/assets/admin/images/products/bookshelf.png', price: 800000, status: 'Còn hàng', stock: 12 },
    { id: 9, name: 'Tủ Bếp', imageUrl: '/assets/admin/images/products/kitchen-cabinet.png', price: 1800000, status: 'Hết hàng', stock: 0 },
    { id: 10, name: 'Đèn Bàn', imageUrl: '/assets/admin/images/products/table-lamp.png', price: 200000, status: 'Còn hàng', stock: 50 },
    { id: 11, name: 'Tủ Lạnh', imageUrl: '/assets/admin/images/products/refrigerator.png', price: 6000000, status: 'Còn hàng', stock: 3 },
    { id: 12, name: 'Máy Giặt', imageUrl: '/assets/admin/images/products/washing-machine.png', price: 5000000, status: 'Hết hàng', stock: 0 },
    { id: 13, name: 'Máy Hút Bụi', imageUrl: '/assets/admin/images/products/vacuum-cleaner.png', price: 2000000, status: 'Còn hàng', stock: 7 },
    { id: 14, name: 'Lò Vi Sóng', imageUrl: '/assets/admin/images/products/microwave.png', price: 1500000, status: 'Còn hàng', stock: 9 },
    { id: 15, name: 'Bếp Ga', imageUrl: '/assets/admin/images/products/gas-stove.png', price: 3000000, status: 'Còn hàng', stock: 6 },
    { id: 16, name: 'Tủ Rượu', imageUrl: '/assets/admin/images/products/wine-cabinet.png', price: 5000000, status: 'Còn hàng', stock: 4 },
    { id: 17, name: 'Giá Treo Quần Áo', imageUrl: '/assets/admin/images/products/clothes-rack.png', price: 400000, status: 'Còn hàng', stock: 30 },
    { id: 18, name: 'Ghế Gỗ', imageUrl: '/assets/admin/images/products/wooden-chair.png', price: 450000, status: 'Còn hàng', stock: 18 },
    { id: 19, name: 'Thảm Trải Sàn', imageUrl: '/assets/admin/images/products/rug.png', price: 350000, status: 'Còn hàng', stock: 40 },
    { id: 20, name: 'Máy Điều Hòa', imageUrl: '/assets/admin/images/products/air-conditioner.png', price: 7000000, status: 'Còn hàng', stock: 5 }
];


const headers = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'imageUrl', label: 'Hình ảnh', sortable: false },
    { key: 'name', label: 'Tên sản phẩm', sortable: true },
    { key: 'price', label: 'Giá', sortable: true },
    { key: 'status', label: 'Trạng thái', sortable: true },
    { key: 'stock', label: 'Số lượng', sortable: true },
    { key: 'actions', label: 'Thao tác', sortable: false }
];

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filters, setFilters] = useState<Record<string, string>>({});

    const fetchProducts = (page: number) => {
        const filteredData = mockProducts.filter(product =>
            Object.entries(filters).every(([key, value]) =>
                product[key as keyof Product].toString().toLowerCase().includes(value.toLowerCase())
            )
        );

        const start = (page - 1) * perPage;
        const end = start + perPage;
        setProducts(filteredData.slice(start, end));
        setTotalRows(filteredData.length);
    };

    useEffect(() => {
        fetchProducts(1);
    }, [perPage, filters]);

    const handlePageChange = (page: number) => {
        fetchProducts(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
    };

    const handleSearch = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const columns = headers.map(header => ({
        name: header.label,
        selector: (row: Product) => row[header.key as keyof Product],
        sortable: header.sortable,
        cell: (row: Product) => {
            if (header.key === 'imageUrl') {
                return <img src={row.imageUrl} alt={row.name} width="50" height="50" className="rounded-circle" />;
            }
            if (header.key === 'price') {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price);
            }
            if (header.key === 'actions') {
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
                );
            }
            return row[header.key as keyof Product];
        },
    }));

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Quản Lý Sản Phẩm</h2>
            <p>Tổng số sản phẩm: {mockProducts.length}</p>

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        {headers.filter(h => h.sortable).map(header => (
                            <Input
                                key={header.key}
                                type="text"
                                placeholder={`Tìm ${header.label.toLowerCase()}...`}
                                onChange={(e) => handleSearch(header.key, e.target.value)}
                                style={{ width: '200px', marginRight: '10px' }}
                            />
                        ))}
                    </div>
                }
            />
        </div>
    );
};

export default ProductList;
