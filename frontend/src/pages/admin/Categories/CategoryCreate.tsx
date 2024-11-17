import * as React from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, Divider, FormControlLabel, Switch, MenuItem, FormControl, Select, InputLabel, IconButton } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from '../../../components/shared/StyledAccordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { useCategory } from '../../../core/hooks/contexts';
import { Category, CategoryMap } from '../../../core/hooks/dataTypes';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProductFullScreen from '../FullScreen/ProductFullScreen';
import { generateSlug, formatStatusAdd } from '../../../core/hooks/format';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CategoryCreate: React.FC = () => {
    const { createCategory } = useCategory();
    const [category, setCategory] = React.useState<Omit<Category, 'id'>>({
        name: '',
        slug: '',
        parent_id: null,
        image: null,
        description: '',
        status: 1,
        created_at: '',
        updated_at: '',
        product_ids: []
    });
    const CategoryMap = useCategory();

    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [sanPhamNames, setSanPhamNames] = React.useState<string[]>([]);
    const [sanPhamIds, setSanPhamIds] = React.useState<number[]>([]);

    const handleCategoryChange = (field: keyof typeof category, value: any) => {
        setCategory((prev) => {
            const updatedCategory = {
                ...prev,
                [field]: field === 'status' ? formatStatusAdd(value) : value,
            };
            if (field === 'name') {
                updatedCategory.slug = generateSlug(value);
            }

            return updatedCategory;
        });
    };

    const chonImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setCategory((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const logFormData = () => {
        const formData = new FormData();
        Object.entries(category).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value instanceof File ? value.name : value.toString());
            }
        });
        formData.append('product_ids', sanPhamIds.join(', '));

        // Log the form data
        console.log('Form Data Preview:');
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        logFormData(); // Log the data before submitting
        try {
            const formData = new FormData();
            Object.entries(category).forEach(([key, value]) => {
                if (value !== null && key !== 'created_at' && key !== 'updated_at') {
                    formData.append(key, value instanceof File ? value : value.toString());
                }
            });

            sanPhamIds.forEach((id) => formData.append('product_ids[]', id.toString()));

            const newCategory = await createCategory(formData as unknown as Omit<Category, 'id'>);
            console.log('Category created successfully:', newCategory);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const mapCategories = (categories: CategoryMap[]) => {
        return categories.map((category) => {
            if (category.parent_id === null) {
                return (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                );
            }
            return null;
        });
    };

    const moDialog = () => {
        setDialogOpen(true);
    };

    const dongDialog = () => {
        setDialogOpen(false);
    };

    const chonProducts = (productIds: number[], productNames: string[]) => {
        if (productNames.length > 0) {
            setSanPhamNames(productNames);
            setSanPhamIds(productIds);
        }
        setDialogOpen(false);
    };

    const xoaProducts = () => {
        setSanPhamNames([]);
        setSanPhamIds([]);
    };

    return (
        <Container maxWidth="xl">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={10}>
                            <Typography variant="h4">Thêm Danh Mục Mới</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                                Thêm Danh Mục
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
                                <Grid item md={10}>
                                    <Grid container spacing={3}>
                                        <Grid item md={3}>
                                            <TextField
                                                fullWidth
                                                label="Tên danh mục"
                                                value={category.name}
                                                onChange={(e) => handleCategoryChange('name', e.target.value)}
                                                required
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <TextField
                                                fullWidth
                                                label="Slug"
                                                value={category.slug}
                                                onChange={(e) => handleCategoryChange('slug', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            {CategoryMap.categories && CategoryMap.categories.length > 0 && (
                                                <FormControl fullWidth>
                                                    <InputLabel>Danh mục cha</InputLabel>
                                                    <Select value={category.parent_id || ''} label="Danh mục cha">
                                                        {mapCategories(CategoryMap.categories)}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Grid>
                                        <Grid item md={2}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={category.status === 1}
                                                        onChange={(e) => handleCategoryChange('status', e.target.checked ? 1 : 0)}
                                                    />
                                                }
                                                label="Status"
                                            />
                                        </Grid>
                                        <Grid item onClick={moDialog} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                                            <TextField
                                                variant="outlined"
                                                value={sanPhamNames.join(', ')}
                                                placeholder="Chọn sản phẩm"
                                                fullWidth
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <IconButton
                                                color="primary"
                                                sx={{
                                                    ml: 1,
                                                    border: '1px solid',
                                                    borderColor: 'primary.main',
                                                    borderRadius: '50%',
                                                }}
                                            >
                                                <AddCircleIcon />
                                            </IconButton>
                                            {sanPhamNames.length > 0 && (
                                                <IconButton
                                                    size="small"
                                                    onClick={xoaProducts}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 50,
                                                        display: 'block',
                                                        '&:hover': {
                                                            display: 'block',
                                                        },
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            )}
                                        </Grid>
                                        <Grid item md={12}>
                                            <Typography variant="body1" gutterBottom>Mô tả</Typography>
                                            <Box sx={{ border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={category.description || ''}
                                                    onChange={(value) => handleCategoryChange('description', value)}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item md={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box mt={2} sx={{ width: '100%', height: '200px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">Image Preview</Typography>
                                        )}
                                    </Box>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="raised-button-file"
                                        type="file"
                                        onChange={chonImage}
                                    />
                                    <label htmlFor="raised-button-file" style={{ marginTop: '5%' }}>
                                        <Button variant="contained" component="span">
                                            Upload Image
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </form>
            </Paper>
            <ProductFullScreen
                open={dialogOpen}
                onClose={dongDialog}
                onSelect={chonProducts}
            />
        </Container>
    );
}

export default CategoryCreate;
