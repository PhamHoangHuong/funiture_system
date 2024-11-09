import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface VariantMappingProps {
    variants: any[];
    variantImages: string[];
    attributeValues: any[];
    handleVariantImageChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    handleVariantChange: (index: number, field: string, value: any) => void;
}

const VariantMapping: React.FC<VariantMappingProps> = ({ variants, variantImages, attributeValues, handleVariantImageChange, handleVariantChange }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Hình ảnh</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell sx={{ width: '100px' }}>Giá</TableCell>
                        <TableCell sx={{ width: '100px' }}>Cân nặng</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Thuộc tính</TableCell>
                        <TableCell>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {variants.map((variant, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {variantImages[index] ? (
                                        <img src={variantImages[index]} alt="Variant Preview" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    ) : (
                                        <label htmlFor={`variant-image-upload-${index}`}>
                                            <Box sx={{ width: '50px', height: '50px', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <AddIcon color="action" />
                                            </Box>
                                        </label>
                                    )}
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id={`variant-image-upload-${index}`}
                                        type="file"
                                        onChange={(e) => handleVariantImageChange(index, e)}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={variant.name}
                                    onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                                    disabled
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={variant.sku}
                                    onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{ width: '100px' }}>
                                <TextField
                                    type="number"
                                    value={variant.price}
                                    onChange={(e) => handleVariantChange(index, 'price', Number(e.target.value))}
                                />
                            </TableCell>
                            <TableCell sx={{ width: '100px' }}>
                                <TextField
                                    type="number"
                                    value={variant.weight}
                                    onChange={(e) => handleVariantChange(index, 'weight', Number(e.target.value))}
                                />
                            </TableCell>
                            <TableCell>
                                <FormControl fullWidth>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={variant.status || 1}
                                        onChange={(e) => handleVariantChange(index, 'status', e.target.value)}
                                        label="Trạng thái"
                                    >
                                        <MenuItem value={1}>Hoạt động</MenuItem>
                                        <MenuItem value={0}>Không hoạt động</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                {variant.attributes.map((attr: any) => {
                                    const value = attributeValues.find(v => v.id === attr.value_id);
                                    return value ? value.value : '';
                                }).join(', ')}
                            </TableCell>
                            <TableCell>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VariantMapping;
