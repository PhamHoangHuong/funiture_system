import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Box, Button, FormControl, Select, MenuItem, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useProductContext } from '../../../core/contexts/ProductContext';
import { formatCurrency } from '../../../core/hooks/format';
import { useTranslation } from 'react-i18next';

interface ProductFullScreenProps {
    open: boolean;
    onClose: () => void;
    onSelect: (productIds: number[], productNames: string[]) => void;
}

const ProductFullScreen: React.FC<ProductFullScreenProps> = ({ open, onClose, onSelect }) => {
    const { t } = useTranslation();
    const { products, fetchProducts } = useProductContext();
    const [sanPhamDaChonIds, setSanPhamDaChonIds] = useState<number[]>([]);
    const [trang, setTrang] = useState(1);
    const [soHangMoiTrang, setSoHangMoiTrang] = useState(10);

    useEffect(() => {
        if (open) {
            fetchProducts();
        }
    }, [open, fetchProducts]);

    const thayDoiSelection = (productId: number) => {
        setSanPhamDaChonIds((prev) =>
            prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        );
    };

    const luuVaDong = () => {
        if (sanPhamDaChonIds.length > 0) {
            const sanPhamDaChon = products.filter(p => sanPhamDaChonIds.includes(p.id));
            const productIds = sanPhamDaChon.map(product => product.id);
            const productNames = sanPhamDaChon.map(product => product.name);
            onSelect(productIds, productNames);
            onClose(); 
        }
    };

    const thayDoiTrang = (event: React.ChangeEvent<unknown>, value: number) => {
        setTrang(value);
    };

    const thayDoiSoHangMoiTrang = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSoHangMoiTrang(event.target.value as number);
        setTrang(1);
    };

    const start = (trang - 1) * soHangMoiTrang;
    const end = Math.min(trang * soHangMoiTrang, products.length);
    const total = products.length;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {t('product.selectProduct')}
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={sanPhamDaChonIds.length > 0 && sanPhamDaChonIds.length < products.length}
                                        checked={products.length > 0 && sanPhamDaChonIds.length === products.length}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSanPhamDaChonIds(products.map((product) => product.id));
                                            } else {
                                                setSanPhamDaChonIds([]);
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{t('product.id')}</TableCell>
                                <TableCell>{t('product.name')}</TableCell>
                                <TableCell>{t('product.image')}</TableCell>
                                <TableCell>{t('product.price')}</TableCell>
                                <TableCell>{t('product.status')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.slice(start, end).map((product) => (
                                <TableRow key={product.id} hover>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={sanPhamDaChonIds.includes(product.id)}
                                            onChange={() => thayDoiSelection(product.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        <img src={typeof product.image === 'string' ? product.image : ''} alt={product.name} style={{ width: '50px', height: 'auto' }} />
                                    </TableCell>
                                    <TableCell>{formatCurrency(product.price)}</TableCell>
                                    <TableCell>{product.status === 1 ? t('product.inactive') : t('product.active')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <FormControl variant="outlined" size="small">
                        <Select
                            value={soHangMoiTrang}
                            onChange={(e) => thayDoiSoHangMoiTrang(e as React.ChangeEvent<{ value: unknown }>)}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            {t('product.showing')} {start + 1}-{end} {t('product.of')} {total}
                        </Typography>
                        <Pagination
                            count={Math.ceil(total / soHangMoiTrang)}
                            page={trang}
                            onChange={thayDoiTrang}
                            size="large"
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={luuVaDong} variant="contained" color="primary">
                    {t('product.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductFullScreen;