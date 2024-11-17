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
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CategoryEdit: React.FC = () => {
    const { t } = useTranslation();
    const { updateCategory, categories } = useCategory();
    const { id } = useParams<{ id: string }>();
    const [category, setCategory] = React.useState<Partial<Category>>({});
    const CategoryMap = useCategory();

    const [imagePreview, setimagePreview] = React.useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [sanPhamNames, setSanPhamNames] = React.useState<string[]>([]);
    const [sanPhamIds, setSanPhamIds] = React.useState<number[]>([]);

    React.useEffect(() => {
        const categoryToEdit = categories.find(cat => cat.id === Number(id));
        if (categoryToEdit) {
            setCategory(categoryToEdit);
        }
    }, [categories, id]);

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

    const chonimage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setCategory((prev) => ({ ...prev, image: file }));
            setimagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Construct the data object to be sent
        const dataToSend = {
            id: category.id || null,
            name: category.name || '',
            slug: category.slug || generateSlug(category.name || ''),
            parent_id: category.parent_id || null,
            status: category.status || 1,
            product_ids: sanPhamIds,
            image: category.image || null,
        };

        // Log the data object
        console.log('Data to be sent:', dataToSend);

        try {
            const formData = new FormData();

            // Append each field to the FormData
            formData.append('id', dataToSend.id?.toString() || '');
            formData.append('name', dataToSend.name);
            formData.append('slug', dataToSend.slug);
            formData.append('parent_id', dataToSend.parent_id?.toString() || '');
            formData.append('status', dataToSend.status.toString());
            formData.append('image', dataToSend.image || '');
            // Append product_ids as an array
            dataToSend.product_ids.forEach((id) => formData.append('product_ids[]', id.toString()));

            // Log the formData to verify the structure
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const updatedCategory = await updateCategory(Number(id), formData as unknown as Partial<Category>);
            console.log('Category updated successfully:', updatedCategory);
        } catch (error) {
            console.error('Error updating category:', error);
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
                            <Typography variant="h4">{t('addCategory')}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                                {t('addCategory')}
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 4 }} />

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                            <Typography variant="h6">{t('basicInformation')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3}>
                                <Grid item md={10}>
                                    <Grid container spacing={3}>
                                        <Grid item md={3}>
                                            <TextField
                                                fullWidth
                                                value={category.name}
                                                onChange={(e) => handleCategoryChange('name', e.target.value)}
                                                required
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <TextField
                                                fullWidth
                                                value={category.slug}
                                                onChange={(e) => handleCategoryChange('slug', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            {CategoryMap.categories && CategoryMap.categories.length > 0 && (
                                                <FormControl fullWidth>
                                                    <InputLabel>{t('parentCategory')}</InputLabel>
                                                    <Select
                                                        value={category.parent_id || ''}
                                                        onChange={(e) => handleCategoryChange('parent_id', e.target.value)}
                                                    >
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
                                                placeholder={t('selectProduct')}
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
                                            <Typography variant="body2" color="textSecondary">{t('imagePreview')}</Typography>
                                        )}
                                    </Box>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="raised-button-file"
                                        type="file"
                                        onChange={chonimage}
                                    />
                                    <label htmlFor="raised-button-file" style={{ marginTop: '5%' }}>
                                        <Button variant="contained" component="span">
                                            {t('uploadImage')}
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

export default CategoryEdit;
