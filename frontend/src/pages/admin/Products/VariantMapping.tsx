import React, { useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useProductContext } from '../../../core/hooks/contexts';

interface VariantMappingProps {
    variants: any[];
    variantImages: string[];
    attributeValues: any[];
    handleVariantImageChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    onVariantChange: (index: number, field: string, value: any) => void;
}

const VariantMapping: React.FC<VariantMappingProps> = ({ variants, variantImages, attributeValues, handleVariantImageChange, onVariantChange }) => {
    const { updateVariant } = useProductContext();
    const [variantState, setVariantState] = useState(variants);

    const handleVariantChange = (index: number, field: keyof typeof variants[0], value: any) => {
        setVariantState((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index] = {
                ...updatedVariants[index],
                [field]: value,
            };
            console.log(`Variant at index ${index} updated:`, updatedVariants[index]);

            onVariantChange(index, field as string, value);

            return updatedVariants;
        });
    };

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {variants.map((variant, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <label htmlFor={`variant-image-upload-${index}`}>
                                        <Box
                                            sx={{
                                                width: '50px',
                                                height: '50px',
                                                border: variantImages[index] ? 'none' : '1px dashed #ccc',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {variantImages[index] ? (
                                                <img
                                                    src={variantImages[index]}
                                                    alt="Variant Preview"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <AddIcon color="action" />
                                            )}
                                        </Box>
                                    </label>
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
                                <Switch
                                    checked={variant.status === 1}
                                    onChange={(e) => handleVariantChange(index, 'status', e.target.checked ? 1 : 0)}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </TableCell>
                            <TableCell>
                                {variant.attributes.map((attr: any) => {
                                    const value = attributeValues.find(v => v.id === attr.value_id);
                                    return value ? value.value : '';
                                }).join(', ')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VariantMapping;
