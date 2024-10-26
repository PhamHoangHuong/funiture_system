import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Divider, IconButton } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from '../../../components/shared/StyledAccordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useProductContext } from '../../../core/contexts/ProductContext';
import { useCategory } from '../../../core/contexts/CategoryContext';
import { useAttribute } from '../../../core/contexts/AttributeContext';

const ProductCreate: React.FC = () => {
    const { createProduct } = useProductContext();
    const { categories, fetchCategories } = useCategory();
    const { attributes, fetchAttributes } = useAttribute();
    const [product, setProduct] = useState({
        name: "", slug: "", description: "", content: "", image: null as File | null,
        status: 1, weight: "", price: "", start_new_time: null as dayjs.Dayjs | null,
        end_new_time: null as dayjs.Dayjs | null, advanced_price_id: "", parent_id: "",
        sku: "", stock_quantity: "", seo_title: "", seo_description: "", video_link: "",
        category_id: "", variants: [] as any[], sources: [] as any[],
    });

    useEffect(() => {
        fetchCategories();
        fetchAttributes();
    }, []);

    const handleProductChange = (field: string, value: any, index?: number) => {
        setProduct((prev) => {
            if (field === 'variants' || field === 'sources') {
                const newArray = [...prev[field]];
                if (index !== undefined) {
                    newArray[index] = { ...newArray[index], ...value };
                } else {
                    newArray.push(value);
                }
                return { ...prev, [field]: newArray };
            } else {
                return { ...prev, [field]: value };
            }
        });
    };

    const removeItem = (field: string, index: number) => {
        setProduct((prev) => ({
            ...prev,
            [field]: prev[field].filter((_: any, i: number) => i !== index)
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProduct((prev) => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.entries(product).forEach(([key, value]) => {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else if (key === 'variants' || key === 'sources') {
                    formData.append(key, JSON.stringify(value));
                } else if (value !== null) {
                    formData.append(key, value.toString());
                }
            });
            await createProduct(formData);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const renderTextField = (label: string, name: string, value: any, type: string = "text") => (
        <TextField
            fullWidth
            label={label}
            name={name}
            value={value}
            type={type}
            onChange={(e) => handleProductChange(e.target.name, e.target.value)}
        />
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
                <Container maxWidth="xl">
                    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={10}>
                                <Typography variant="h4">Thêm Sản Phẩm Mới</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                                    Thêm Sản Phẩm
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 4 }} />

                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Thông tin cơ bản</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("Tên sản phẩm", "name", product.name)}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("Slug", "slug", product.slug)}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Trạng thái</InputLabel>
                                            <Select
                                                name="status"
                                                value={product.status}
                                                onChange={(e) => handleProductChange(e.target.name, e.target.value)}
                                                label="Trạng thái"
                                            >
                                                <MenuItem value={1}>Hoạt động</MenuItem>
                                                <MenuItem value={0}>Không hoạt động</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("Giá", "price", product.price, "number")}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {renderTextField("Mô tả", "description", product.description)}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {renderTextField("Nội dung", "content", product.content)}
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Thông tin bổ sung</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("SKU", "sku", product.sku)}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("Số lượng trong kho", "stock_quantity", product.stock_quantity, "number")}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("Cân nặng", "weight", product.weight)}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Danh mục</InputLabel>
                                            <Select
                                                value={product.category_id}
                                                label="Danh mục"
                                                onChange={(e) => handleProductChange('category_id', e.target.value)}
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">SEO và Media</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("SEO Title", "seo_title", product.seo_title)}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("SEO Description", "seo_description", product.seo_description)}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {renderTextField("Video Link", "video_link", product.video_link)}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="raised-button-file"
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                        <label htmlFor="raised-button-file">
                                            <Button variant="contained" component="span">
                                                Upload Image
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <DatePicker
                                            label="Start New Time"
                                            value={product.start_new_time}
                                            onChange={(date) => handleProductChange('start_new_time', date)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <DatePicker
                                            label="End New Time"
                                            value={product.end_new_time}
                                            onChange={(date) => handleProductChange('end_new_time', date)}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Variants</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {product.variants.map((variant, index) => (
                                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} md={3}>
                                                {renderTextField("Variant Name", `variants[${index}].name`, variant.name)}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {renderTextField("Price", `variants[${index}].price`, variant.price, "number")}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {renderTextField("SKU", `variants[${index}].sku`, variant.sku)}
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {renderTextField("Stock Quantity", `variants[${index}].stock_quantity`, variant.stock_quantity, "number")}
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <IconButton onClick={() => removeItem('variants', index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                                <Button startIcon={<AddIcon />} onClick={() => handleProductChange('variants', { name: "", price: "", sku: "", stock_quantity: "" })}>
                                    Add Variant
                                </Button>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Sources</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {product.sources.map((source, index) => (
                                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} md={4}>
                                                {renderTextField("Source ID", `sources[${index}].source_id`, source.source_id)}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {renderTextField("Quantity", `sources[${index}].quantity`, source.quantity, "number")}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {renderTextField("Stock", `sources[${index}].stock`, source.stock, "number")}
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <IconButton onClick={() => removeItem('sources', index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                                <Button startIcon={<AddIcon />} onClick={() => handleProductChange('sources', { source_id: "", quantity: "", stock: "" })}>
                                    Add Source
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Container>
            </form>
        </LocalizationProvider>
    );
};

export default ProductCreate;
