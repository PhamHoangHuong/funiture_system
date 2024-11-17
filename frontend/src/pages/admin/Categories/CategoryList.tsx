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
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { categoryService, useCategory } from '../../../core/hooks/contexts';
import { Category } from '../../../core/hooks/dataTypes';
import { formatDate, formatStatus } from '../../../core/hooks/format';
import { useTranslation } from 'react-i18next';

const CategoryList: React.FC = () => {
  const { t } = useTranslation();
  const { categories, fetchCategories, deleteCategory } = useCategory();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const filtered = categories.filter(category =>
      Object.entries(filters).every(([key, value]) =>
        category[key as keyof Category]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredCategories(filtered);
  }, [categories, filters]);

  const handleSearch = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t('common.confirmDelete'))) {
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, categoryId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoryId(categoryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategoryId(null);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    const action = event.target.value;
    if (action === 'export') {
      console.log('Exporting data...');
    } else if (action === 'import') {
      console.log('Importing data...');
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(event.target.value as number);
    setPage(1); // Reset to first page
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Tên danh mục', width: 200 },
    { field: 'slug', headerName: 'Slug', width: 150 },
    { field: 'parent_id', headerName: 'Danh mục cha', width: 150 },
    { field: 'description', headerName: 'Mô tả', width: 250 },
    { field: 'status', headerName: 'Trạng thái', width: 120, renderCell: (params) => formatStatus(params.row.status, t) },
    { field: 'created_at', headerName: 'Ngày tạo', width: 180, renderCell: (params) => formatDate(params.row.created_at) },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => handleMenuOpen(event, params.row.id)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedCategoryId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to={`/admin/categories/edit/${params.row.id}`}>
              <EditIcon fontSize="small" /> Sửa
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon fontSize="small" /> Xóa
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Calculate the range of items being displayed
  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, filteredCategories.length);
  const total = filteredCategories.length;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản Lý Danh Mục
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Tìm kiếm..."
          onChange={(e) => handleSearch('name', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl variant="outlined" size="small" sx={{ mr: 1 }}>
            <Select
              displayEmpty
              defaultValue="export"
              onChange={handleSelectChange}
            >
              <MenuItem value="export">{t('export')}</MenuItem>
              <MenuItem value="import">{t('import')}</MenuItem>
            </Select>
          </FormControl>
          <Button
            component={Link}
            to="/admin/categories/create"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Thêm Sản Phẩm
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: 600, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <DataGrid
          rows={filteredCategories.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
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
          rowCount={filteredCategories.length}
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
              Hiển thị {start}-{end} của {total}
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
    </Box>
  );
};

export default CategoryList;
