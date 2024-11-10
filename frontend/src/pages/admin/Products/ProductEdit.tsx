import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Paper, CircularProgress, Switch, FormControlLabel } from "@mui/material";
import { useProductContext } from '../../../core/contexts/ProductContext';
import { Product } from '../../../core/hooks/dataTypes';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ProductEditProps {
    productId: number;
    onClose: () => void;
}

const ProductEdit: React.FC<ProductEditProps> = ({ productId, onClose }) => {
    const { fetchProductById, updateProduct } = useProductContext();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const fetchedProduct = await fetchProductById(productId);
                if (fetchedProduct) {
                    setProduct(fetchedProduct);
                    setImagePreview(fetchedProduct.imageUrl); // Assuming imageUrl is a field in Product
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError('Error fetching product');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [productId, fetchProductById]);

    const handleInputChange = (field: keyof Product, value: any) => {
        setProduct(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            handleInputChange('image', file); // Assuming 'image' is a field in Product
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (product) {
            try {
                await updateProduct(product.id, product);
                onClose();
            } catch (err) {
                console.error('Error updating product:', err);
            }
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper', zIndex: 10, p: 2, borderBottom: '1px solid #ccc' }}>
                    <Typography variant="h4" gutterBottom>
                        Edit Product
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mr: 2 }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save Changes
                        </Button>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto' }}>
                    <Grid container spacing={3} sx={{ p: 4 }}>
                        <Grid item md={9}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Product Name"
                                        value={product?.name || ''}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                    />
                                </Grid>
                                {/* Other fields */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={product?.status || false}
                                                onChange={(e) => handleInputChange('status', e.target.checked)}
                                            />
                                        }
                                        label="Status"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Weight"
                                        type="number"
                                        value={product?.weight || 0}
                                        onChange={(e) => handleInputChange('weight', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DatePicker
                                        label="Start New Time"
                                        value={product?.start_new_time ? dayjs(product.start_new_time) : null}
                                        onChange={(date) => handleInputChange('start_new_time', date ? date.toISOString() : null)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DatePicker
                                        label="End New Time"
                                        value={product?.end_new_time ? dayjs(product.end_new_time) : null}
                                        onChange={(date) => handleInputChange('end_new_time', date ? date.toISOString() : null)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="SKU"
                                        value={product?.sku || ''}
                                        onChange={(e) => handleInputChange('sku', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="SEO Title"
                                        value={product?.seo_title || ''}
                                        onChange={(e) => handleInputChange('seo_title', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="SEO Description"
                                        multiline
                                        value={product?.seo_description || ''}
                                        onChange={(e) => handleInputChange('seo_description', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Video Link"
                                        value={product?.video_link || ''}
                                        onChange={(e) => handleInputChange('video_link', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="body1" gutterBottom>Product Image</Typography>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                            {imagePreview && <img src={imagePreview} alt="Product Preview" style={{ width: '100%', maxHeight: '300px', marginTop: '10px' }} />}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>Description</Typography>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
                                <ReactQuill
                                    theme="snow"
                                    value={product?.description || ''}
                                    onChange={(value) => handleInputChange('description', value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>Content</Typography>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
                                <ReactQuill
                                    theme="snow"
                                    value={product?.content || ''}
                                    onChange={(value) => handleInputChange('content', value)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </LocalizationProvider>
    );
};

export default ProductEdit;