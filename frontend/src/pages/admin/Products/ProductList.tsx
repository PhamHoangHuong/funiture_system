import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    TextField,
    Typography,
    Box,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Select,
    FormControl,
    Pagination,
    Modal,
    SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useProductContext } from "../../../core/hooks/contexts";
import { Product } from "../../../core/hooks/dataTypes";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../../core/hooks/format";
import ProductEdit from './ProductEdit';

const ProductList: React.FC = () => {
    const { t } = useTranslation();
    const { products: productList, loading, error, fetchProducts, deleteProduct } = useProductContext();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        const filtered = productList.filter(product =>
            Object.entries(filters).every(([key, value]) =>
                product[key as keyof Product]?.toString().toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredProducts(filtered);
    }, [productList, filters]);

    const handleSearch = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, productId: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedProductId(productId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProductId(null);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
        setRowsPerPage(event.target.value as number);
        setPage(1); // Reset to first page
    };

    const handleEditClick = (productId: number) => {
        setSelectedProductId(productId);
        setEditModalOpen(true);
    };

    const handleModalClose = () => {
        setEditModalOpen(false);
        fetchProducts();
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: t("product.id"), width: 70 },
        { field: 'image', headerName: t("product.image"), width: 100, renderCell: (params) => <img src={params.row.image} alt={params.row.name} style={{ width: '100%', height: 'auto' }} /> },
        { field: 'name', headerName: t("product.name"), width: 200 },
        { field: 'sku', headerName: t("product.sku"), width: 100 },
        { field: 'parent_id', headerName: t("product.parent_id"), width: 100 },
        { field: 'price', headerName: t("product.price"), width: 150, renderCell: (params) => formatCurrency(params.row.price) },
        { field: 'weight', headerName: t("product.weight"), width: 100 },
        { field: 'description', headerName: t("product.description"), width: 200 },
        { field: 'status', headerName: t("product.status"), width: 120, renderCell: (params) => params.row.status === 1 ? t("product.inactive") : t("product.active") },
        {
            field: 'actions',
            headerName: t("product.actions"),
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEditClick(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    // Calculate the range of items being displayed
    const start = (page - 1) * rowsPerPage + 1;
    const end = Math.min(page * rowsPerPage, filteredProducts.length);
    const total = filteredProducts.length;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                {t("product.management")}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder={t("search")}
                    onChange={(e) => handleSearch('name', e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    component={Link}
                    to="/admin/products/create"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                >
                    {t("product.add")}
                </Button>
            </Box>
            <Box sx={{ height: 600, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <DataGrid
                    rows={filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: rowsPerPage,
                                page: page - 1,
                            },
                        },
                    }}
                    paginationMode="server"
                    rowCount={filteredProducts.length}
                    hideFooter
                    checkboxSelection
                    disableRowSelectionOnClick
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
                    <FormControl variant="outlined" size="small">
                        <Select
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            Showing {start}-{end} of {total}
                        </Typography>
                        <Pagination
                            count={Math.ceil(total / rowsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            size="large"
                        />
                    </Box>
                </Box>
            </Box>
            <Modal
                open={editModalOpen}
                onClose={handleModalClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 1440, maxHeight: '80vh', bgcolor: 'background.paper', boxShadow: 24, overflowY: 'auto' }}>
                    <ProductEdit productId={selectedProductId!} onClose={handleModalClose} />
                </Box>
            </Modal>
        </Box>
    );
};

export default ProductList;
