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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AttributeService, useAttribute } from '../../../core/hooks/contexts';
import { Attribute } from '../../../core/hooks/dataTypes';
import { formatDate } from '../../../core/hooks/format';

const AttributesList: React.FC = () => {
  const { attributes, fetchAttributes } = useAttribute();
  const [filteredAttributes, setFilteredAttributes] = useState<Attribute[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAttributeId, setSelectedAttributeId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const filtered = attributes.filter(attribute =>
      Object.entries(filters).every(([key, value]) =>
        attribute[key as keyof Attribute]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredAttributes(filtered);
  }, [attributes, filters]);

  const handleSearch = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this attribute?')) {
      try {
        await AttributeService.deleteAttribute(id);
        console.log('Attribute deleted successfully');
        fetchAttributes();
      } catch (error) {
        console.error('Error deleting attribute:', error);
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, attributeId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedAttributeId(attributeId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAttributeId(null);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const action = event.target.value as string;
    if (action === 'export') {
      console.log('Exporting data...');
    } else if (action === 'import') {
      console.log('Importing data...');
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(event.target.value as number);
    setPage(1); // Reset to first page
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Tên danh mục', width: 200 },
    { field: 'description', headerName: 'Mô tả', width: 250 },
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
            open={Boolean(anchorEl) && selectedAttributeId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to={`/admin/attributes/edit/${params.row.id}`}>
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
  const end = Math.min(page * rowsPerPage, filteredAttributes.length);
  const total = filteredAttributes.length;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản Lý Thuộc Tính
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
              <MenuItem value="export">Export</MenuItem>
              <MenuItem value="import">Import</MenuItem>
            </Select>
          </FormControl>
          <Button
            component={Link}
            to="/admin/attributes/create"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Thêm Thuộc Tính
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: 600, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <DataGrid
          rows={filteredAttributes.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
          columns={columns}
          pageSize={rowsPerPage}
          pagination={false} // Ensure pagination is set to false
          hideFooter // Hide the footer completely
          checkboxSelection
          disableSelectionOnClick
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

export default AttributesList;