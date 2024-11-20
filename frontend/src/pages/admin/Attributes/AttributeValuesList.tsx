import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAttribute } from '../../../core/hooks/contexts';
import { AttributeValue } from '../../../core/hooks/dataTypes';

const AttributeValuesList: React.FC = () => {
  const { t } = useTranslation();
  const { attributeValues, fetchAttributeValues, deleteAttributeValue } = useAttribute();
  const [filteredAttributeValues, setFilteredAttributeValues] = useState<AttributeValue[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAttributeValueId, setSelectedAttributeValueId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchAttributeValues();
  }, []);

  useEffect(() => {
    const filtered = attributeValues.filter(attributeValue =>
      Object.entries(filters).every(([key, value]) =>
        attributeValue[key as keyof AttributeValue]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredAttributeValues(filtered);
  }, [attributeValues, filters]);

  const handleSearch = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, attributeValueId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedAttributeValueId(attributeValueId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAttributeValueId(null);
  };

  const handleOpenDialog = (id: number) => {
    setSelectedAttributeValueId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAttributeValueId(null);
  };

  const handleDelete = async () => {
    if (selectedAttributeValueId !== null) {
      try {
        await deleteAttributeValue(selectedAttributeValueId);
        console.log('Attribute value deleted successfully');
        fetchAttributeValues();
      } catch (error) {
        console.error('Error deleting attribute value:', error);
      }
    }
    handleCloseDialog();
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
    { field: 'attribute_id', headerName: 'Thuộc tính', width: 200 },
    { field: 'value', headerName: 'Giá trị', width: 250 },
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
            open={Boolean(anchorEl) && selectedAttributeValueId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to={`/admin/attributes/values/edit/${params.row.id}`}>
              <EditIcon fontSize="small" /> Sửa
            </MenuItem>
            <MenuItem onClick={() => handleOpenDialog(params.row.id)}>
              <DeleteIcon fontSize="small" /> Xóa
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Calculate the range of items being displayed
  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, filteredAttributeValues.length);
  const total = filteredAttributeValues.length;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản Lý Giá Trị Thuộc Tính
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
              onChange={(event) => handleSelectChange(event as React.ChangeEvent<{ value: unknown }>)}
            >
              <MenuItem value="export">Export</MenuItem>
              <MenuItem value="import">Import</MenuItem>
            </Select>
          </FormControl>
          <Button
            component={Link}
            to="/admin/attributes/values/create"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            {t('add')}
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: 600, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <DataGrid
          rows={filteredAttributeValues.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
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
          rowCount={filteredAttributeValues.length}
          hideFooter
          checkboxSelection
          disableRowSelectionOnClick
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
          <FormControl variant="outlined" size="small">
            <Select
              value={rowsPerPage}
              onChange={(event) => handleRowsPerPageChange(event as React.ChangeEvent<{ value: unknown }>)}
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

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{t('confirmDeleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('confirmDeleteMessage')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AttributeValuesList;

