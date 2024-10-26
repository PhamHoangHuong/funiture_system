import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
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
        name: "",
        slug: "",
        description: "",
        content: "",
        image: null as File | null,
        status: 1,
        weight: "",
        price: "",
        start_new_time: null as dayjs.Dayjs | null,
        end_new_time: null as dayjs.Dayjs | null,
        advanced_price_id: "",
        parent_id: "",
        sku: "",
        stock_quantity: "",
        seo_title: "",
        seo_description: "",
        video_link: "",
        category_id: "",
        variants: [] as any[],
        sources: [] as any[],
    });
    const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});

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
                            <AccordionSummary
                                expandIcon={
                                    <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
                                }
                                aria-controls="panel-content"
                                id="panel-header"
                            >
                                <Typography>Thông tin sản phẩm</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Thông tin cơ bản</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Tên sản phẩm" name="name" value={product.name} onChange={(e) => handleProductChange(e.target.name, e.target.value)} required />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Slug" name="slug" value={product.slug} onChange={(e) => handleProductChange(e.target.name, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <InputLabel>Trạng thái</InputLabel>
                                            <Select name="status" value={product.status} onChange={(e) => handleProductChange(e.target.name, e.target.value)} label="Trạng thái">
                                                <MenuItem value={1}>Hoạt động</MenuItem>
                                                <MenuItem value={0}>Không hoạt động</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Giá" name="price" type="number" value={product.price} onChange={(e) => handleProductChange(e.target.name, e.target.value)} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6">Mô tả và Nội dung</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Mô tả"
                                            name="description"
                                            multiline
                                            value={product.description}
                                            onChange={(e) => handleProductChange(e.target.name, e.target.value)}
                                            sx={{
                                                '& .MuiInputBase-inputMultiline': {
                                                    padding: '10px 14px',
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Nội dung"
                                            name="content"
                                            multiline
                                            value={product.content}
                                            onChange={(e) => handleProductChange(e.target.name, e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6">Thông tin bổ sung</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="SKU" name="sku" value={product.sku} onChange={(e) => handleProductChange(e.target.name, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Số lượng trong kho" name="stock_quantity" type="number" value={product.stock_quantity} onChange={(e) => handleProductChange(e.target.name, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Cân nặng" name="weight" value={product.weight} onChange={(e) => handleProductChange(e.target.name, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <InputLabel id="category-select-label">Danh mục</InputLabel>
                                            <Select
                                                labelId="category-select-label"
                                                id="category-select"
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

                                    <Grid item xs={12}>
                                        <Typography variant="h6">SEO và Media</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="SEO Title" name="seo_title" value={product.seo_title} onChange={(e) => handleProductChange(e.target.name, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="SEO Description" name="seo_description" multiline value={product.seo_description} onChange={(e) => handleProductChange(e.target.name, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="Video Link" name="video_link" value={product.video_link} onChange={(e) => handleProductChange(e.target.name, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={3}>
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
                                    <Grid item xs={3}>
                                        <DatePicker
                                            label="Start New Time"
                                            value={product.start_new_time}
                                            onChange={(date) => handleProductChange('start_new_time', date)}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
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
                                <Typography>Variants</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {product.variants.map((variant, index) => (
                                    <Grid container spacing={2} key={index}>
                                        <Grid item xs={3}>
                                            <TextField
                                                fullWidth
                                                label="Variant Name"
                                                value={variant.name}
                                                onChange={(e) => handleProductChange('variants', { [e.target.name]: e.target.value }, index)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                fullWidth
                                                label="Price"
                                                type="number"
                                                value={variant.price}
                                                onChange={(e) => handleProductChange('variants', { [e.target.name]: e.target.value }, index)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                fullWidth
                                                label="SKU"
                                                value={variant.sku}
                                                onChange={(e) => handleProductChange('variants', { [e.target.name]: e.target.value }, index)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                fullWidth
                                                label="Stock Quantity"
                                                type="number"
                                                value={variant.stock_quantity}
                                                onChange={(e) => handleProductChange('variants', { [e.target.name]: e.target.value }, index)}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton onClick={() => removeItem('variants', index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Button startIcon={<AddIcon />} onClick={() => handleProductChange('variants', { name: "", price: "", sku: "", stock_quantity: "" })}>
                                    Add Variant
                                </Button>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography>Sources</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {product.sources.map((source, index) => (
                                    <Grid container spacing={2} key={index}>
                                        <Grid item xs={3}>
                                            <TextField
                                                fullWidth
                                                label="Source ID"
                                                value={source.source_id}
                                                onChange={(e) => handleProductChange('sources', { [e.target.name]: e.target.value }, index)}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                fullWidth
                                                label="Quantity"
                                                type="number"
                                                value={source.quantity}
                                                onChange={(e) => handleProductChange('sources', { [e.target.name]: e.target.value }, index)}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                fullWidth
                                                label="Stock"
                                                type="number"
                                                value={source.stock}
                                                onChange={(e) => handleProductChange('sources', { [e.target.name]: e.target.value }, index)}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton onClick={() => removeItem('sources', index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
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
