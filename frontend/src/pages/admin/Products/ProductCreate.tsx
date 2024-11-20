import * as React from 'react';
import { Box, Button, Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Divider, IconButton, CircularProgress, Checkbox, ListItemText, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from '../../../components/shared/StyledAccordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useProductContext, useCategory, useSource, useAttribute, useAdvancedPrice } from '../../../core/hooks/contexts';
import { Product, AdvancedPrice, Variant, ProductAttribute } from '../../../core/hooks/dataTypes';
import { generateSlug, generateVariantName } from '../../../core/hooks/format';
import { SelectChangeEvent } from '@mui/material';
import { createProductFormData } from '../../../core/hooks/formDataUtils';
import VariantMapping from './VariantMapping';
import { useTranslation } from 'react-i18next';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type ProductWithArrays = Product & {
    sources: any[];
    attributes: any[];
    category_ids: number[];
    advanced_prices: AdvancedPrice[];
    variants: Variant[];
};

const ProductCreate: React.FC = () => {
    const { t } = useTranslation();
    const { createProduct } = useProductContext();
    const { categories, fetchCategories } = useCategory();
    const { sources, fetchSources } = useSource();
    const { attributes, attributeValues, loading, error } = useAttribute();
    const [selectedAttributes, setSelectedAttributes] = React.useState<number[]>([]);
    const [selectedAttributeValues, setSelectedAttributeValues] = React.useState<Record<number, number[]>>({});
    const [product, setProduct] = React.useState<ProductWithArrays>({
        id: 0, name: "", slug: "", description: "", content: "", image: null,
        status: 1, weight: 0, price: 0, start_new_time: null,
        end_new_time: null, parent_id: 0,
        sku: "", stock_quantity: 0, seo_title: "", seo_description: "", video_link: "",
        category_ids: categories.length > 0 ? [categories[0].id] : [],
        sources: [], attributes: [], advanced_prices: [], variants: []
    });
    const { createAdvancedPrice } = useAdvancedPrice();
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [variantDetails, setVariantDetails] = React.useState<Record<number, { price: number; weight: number; status: number; sku: string; image: File | null }>>({});
    const [variantImages, setVariantImages] = React.useState<Record<number, string | null>>({});
    const [variants, setVariants] = React.useState<Variant[]>([]);

    React.useEffect(() => {
        fetchCategories();
        fetchSources();
    }, []);

    React.useEffect(() => {
        setVariants(generateVariants());
    }, [selectedAttributes, selectedAttributeValues, product]);

    const handleAttributeChange = (event: SelectChangeEvent<number[]>) => {
        const value = event.target.value as number[];
        setSelectedAttributes(value);
    };

    const handleAttributeValueChange = (attributeId: number, event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number[];
        setSelectedAttributeValues(prev => ({
            ...prev,
            [attributeId]: value,
        }));
    };

    const handleProductChange = (field: keyof Product | 'sources', value: any, index?: number) => {
        setProduct((prev) => {
            let updatedProduct = { ...prev };
            if (field === 'sources' || field === 'attributes' || field === 'advanced_prices') {
                const newArray = [...(prev[field] as any[])];
                if (index !== undefined) {
                    newArray[index] = { ...newArray[index], ...value };
                } else {
                    newArray.push(value);
                }
                updatedProduct[field] = newArray;
            } else {
                updatedProduct[field] = value as never;
            }

            if (field === 'name') {
                updatedProduct.slug = generateSlug(value);
            }

            return updatedProduct;
        });
    };

    const removeItem = (field: keyof typeof product, index: number) => {
        setProduct((prev) => ({
            ...prev,
            [field]: (prev[field] as any[]).filter((_: any, i: number) => i !== index)
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setProduct((prev: any) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const mappedAttributes: ProductAttribute[] = selectedAttributes.flatMap(attributeId => {
            const valueIds = selectedAttributeValues[attributeId] || [];
            return valueIds.map(valueId => ({
                attribute_id: attributeId,
                attribute_value_id: valueId
            }));
        });

        const validAttributes = mappedAttributes.filter(attr => attr.attribute_value_id !== undefined);

        const updatedProduct = {
            ...product,
            attributes: validAttributes,
            category_ids: Array.isArray(product.category_ids) ? product.category_ids : [product.category_ids],
            sources: product.sources.map(source => ({
                source_id: source.source_id,
                quantity: source.quantity
            })),
            variants: variants
        };

        console.log('Updated Product Data:', updatedProduct);

        try {
            const formData = createProductFormData(updatedProduct as unknown as Product);
            console.log('FormData to be submitted:', formData);
            const newProduct = await createProduct(formData);
            console.log('Product created successfully:', newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const removeAttribute = (attributeId: number) => {
        setSelectedAttributes(prev => prev.filter(id => id !== attributeId));
        setSelectedAttributeValues(prev => {
            const updatedValues = { ...prev };
            delete updatedValues[attributeId];
            return updatedValues;
        });
    };

    const generateVariants = () => {
        if (selectedAttributes.length === 0) return [];

        return selectedAttributes.reduce((acc, attributeId) => {
            const attributeValuesForAttribute = selectedAttributeValues[attributeId] || [];
            if (acc.length === 0) {
                return attributeValuesForAttribute.map(valueId => [valueId]);
            }
            return acc.flatMap(existingCombination =>
                attributeValuesForAttribute.map(valueId => [...existingCombination, valueId])
            );
        }, [] as number[][]).map((combination, index) => {
            const variantName = generateVariantName(
                product.name,
                combination.map(valueId => {
                    const value = attributeValues.find(v => v.id === valueId);
                    return value ? { attribute_id: value.attribute_id, values: [value.value] } : { attribute_id: 0, values: [] };
                })
            );

            const sku = generateSlug(variantName.join(' '));

            return {
                name: variantName.join(' '),
                slug: sku,
                description: product.description,
                content: product.content,
                status: 1,
                weight: variantDetails[index]?.weight || product.weight,
                start_new_time: product.start_new_time,
                end_new_time: product.end_new_time,
                seo_title: product.seo_title,
                seo_description: product.seo_description,
                video_link: product.video_link,
                price: variantDetails[index]?.price || product.price,
                sku: variantDetails[index]?.sku || `SPC001-V${index + 1}`,
                attributes: combination.map(valueId => ({
                    attribute_id: attributeValues.find(v => v.id === valueId)?.attribute_id || 0,
                    attribute_value_id: valueId
                })),
                image: variantDetails[index]?.image || null,
                id: 0,
                parent_id: product.id,
                stock_quantity: 0,
                category_ids: product.category_ids
            };
        });
    };

    const handleVariantChange = (index: number, field: keyof Variant, value: any) => {
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index] = {
                ...updatedVariants[index],
                [field]: value,
            };
            return updatedVariants;
        });
    };

    const handleVariantImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setVariantImages(prev => ({
                ...prev,
                [index]: imageUrl,
            }));
            setVariantDetails(prev => ({
                ...prev,
                [index]: {
                    ...prev[index],
                    image: file,
                },
            }));
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
                <Container maxWidth="xl">
                    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={10}>
                                <Typography variant="h4">{t('addProduct')}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                                    {t('addProduct')}
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
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label={t('productName')}
                                                    value={product.name}
                                                    onChange={(e) => handleProductChange('name', e.target.value)}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label={t('slug')}
                                                    value={product.slug}
                                                    onChange={(e) => handleProductChange('slug', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label={t('sku')}
                                                    value={product.sku}
                                                    onChange={(e) => handleProductChange('sku', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label={t('price')}
                                                    type="number"
                                                    value={product.price}
                                                    onChange={(e) => handleProductChange('price', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label={t('weight')}
                                                    type="number"
                                                    value={product.weight}
                                                    onChange={(e) => handleProductChange('weight', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel>{t('status')}</InputLabel>
                                                    <Select
                                                        name="status"
                                                        value={product.status}
                                                        onChange={(e) => handleProductChange(e.target.name as keyof typeof product, e.target.value)}
                                                        label={t('status')}
                                                    >
                                                        <MenuItem value={1}>{t('active')}</MenuItem>
                                                        <MenuItem value={0}>{t('inactive')}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4}>
                                                <FormControl fullWidth required>
                                                    <InputLabel>{t('category')}</InputLabel>
                                                    <Select
                                                        value={product.category_ids}
                                                        label={t('category')}
                                                        onChange={(e) => handleProductChange('category_ids', e.target.value)}
                                                    >
                                                        {categories.map((category) => (
                                                            <MenuItem key={category.id} value={category.id}>
                                                                {category.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label={t('seoTitle')}
                                                    value={product.seo_title}
                                                    onChange={(e) => handleProductChange('seo_title', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label={t('seoDescription')}
                                                    multiline
                                                    value={product.seo_description}
                                                    onChange={(e) => handleProductChange('seo_description', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label={t('description')}
                                                    multiline
                                                    value={product.description}
                                                    onChange={(e) => handleProductChange('description', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label={t('content')}
                                                    multiline
                                                    value={product.content}
                                                    onChange={(e) => handleProductChange('content', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label={t('videoLink')}
                                                    value={product.video_link}
                                                    onChange={(e) => handleProductChange('video_link', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <DatePicker
                                                    label={t('startNewTime')}
                                                    value={product.start_new_time ? dayjs(product.start_new_time) : null}
                                                    onChange={(date) => handleProductChange('start_new_time', date)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <DatePicker
                                                    label={t('endNewTime')}
                                                    value={product.end_new_time ? dayjs(product.end_new_time) : null}
                                                    onChange={(date) => handleProductChange('end_new_time', date)}
                                                />
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
                                            onChange={handleImageChange}
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

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">{t('attributes')}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControl sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="attributes-checkbox-label">{t('attributes')}</InputLabel>
                                    <Select
                                        labelId="attributes-checkbox-label"
                                        id="attributes-checkbox"
                                        multiple
                                        value={selectedAttributes}
                                        onChange={handleAttributeChange}
                                        input={<OutlinedInput label={t('attributes')} />}
                                        renderValue={(selected) => selected.map(id => attributes.find(attr => attr.id === id)?.name || '').join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {attributes.map((attribute) => (
                                            <MenuItem key={attribute.id} value={attribute.id}>
                                                <Checkbox checked={selectedAttributes.includes(attribute.id)} />
                                                <ListItemText primary={attribute.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {selectedAttributes.length > 0 && (
                                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{t('attribute')}</TableCell>
                                                    <TableCell>{t('value')}</TableCell>
                                                    <TableCell>{t('action')}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedAttributes.map((attributeId) => {
                                                    const attribute = attributes.find(attr => attr.id === attributeId);
                                                    if (!attribute) return null;
                                                    return (
                                                        <TableRow key={attributeId}>
                                                            <TableCell>{attribute.name}</TableCell>
                                                            <TableCell>
                                                                <FormControl sx={{ width: '100%' }}>
                                                                    <Select
                                                                        multiple
                                                                        value={selectedAttributeValues[attributeId] || []}
                                                                        onChange={(e) => handleAttributeValueChange(attributeId, e as React.ChangeEvent<{ value: unknown }>)}
                                                                        renderValue={(selected) => (selected as number[]).map(id => attributeValues.find(v => v.id === id)?.value || '').join(', ')}
                                                                        MenuProps={MenuProps}
                                                                    >
                                                                        {attributeValues
                                                                            .filter(v => v.attribute_id === attributeId)
                                                                            .map((v) => (
                                                                                <MenuItem key={v.id} value={v.id}>
                                                                                    <Checkbox checked={(selectedAttributeValues[attributeId] || []).indexOf(v.id) > -1} />
                                                                                    <ListItemText primary={v.value} />
                                                                                </MenuItem>
                                                                            ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <IconButton onClick={() => removeAttribute(attributeId)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">{t('productVariants')}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <VariantMapping
                                    variants={variants}
                                    variantImages={Object.values(variantImages) as string[]}
                                    attributeValues={attributeValues}
                                    handleVariantImageChange={handleVariantImageChange}
                                    onVariantChange={handleVariantChange}
                                />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">{t('sources')}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {product.sources.map((source, index) => (
                                    <Box key={index} sx={{ mb: 2, p: 2, borderRadius: '4px' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} md={5}>
                                                <FormControl fullWidth required>
                                                    <InputLabel>{t('source')}</InputLabel>
                                                    <Select
                                                        value={source.source_id}
                                                        onChange={(e) => handleProductChange('sources', { ...source, source_id: e.target.value }, index)}
                                                    >
                                                        {sources.map((s) => (
                                                            <MenuItem key={s.id} value={s.id}>
                                                                {s.name} - {s.address}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <TextField
                                                    fullWidth
                                                    label={t('quantity')}
                                                    type="number"
                                                    value={source.quantity}
                                                    onChange={(e) => handleProductChange('sources', { quantity: e.target.value }, index)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <IconButton onClick={() => removeItem('sources', index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                                <Button startIcon={<AddIcon />} onClick={() => handleProductChange('sources', { source_id: "", quantity: "" })}>
                                    {t('addSource')}
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