import * as React from 'react';
import { Box, Button, Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Divider, IconButton, CircularProgress, Checkbox, ListItemText, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
import { useSource } from '../../../core/contexts/SourceContext';
import { useAttribute } from '../../../core/contexts/AttributeContext';
import { Product } from '../../../core/hooks/dataTypes';
import { generateSlug } from '../../../core/hooks/format';
import { useAdvancedPrice } from '../../../core/contexts/AdvancedPriceContext';
import { AdvancedPrice } from '../../../core/hooks/dataTypes';
import axios from 'axios';

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

// Add this type definition
type ProductWithArrays = Product & {
    sources: any[];
    attributes: any[];
    variants: any[];
};

const ProductCreate: React.FC = () => {
    const { createProduct } = useProductContext();
    const { categories, fetchCategories } = useCategory();
    const { sources, fetchSources } = useSource();
    const { attributes, attributeValues, loading, error } = useAttribute();
    const [selectedAttributes, setSelectedAttributes] = React.useState([]);
    const [selectedAttributeValues, setSelectedAttributeValues] = React.useState({});
    const [product, setProduct] = React.useState<ProductWithArrays>({
        id: 0, name: "", slug: "", description: "", content: "", image: "",
        status: 1, weight: 0, price: 0, start_new_time: null,
        end_new_time: null, advanced_price_id: 0, parent_id: 0,
        sku: "", stock_quantity: 0, seo_title: "", seo_description: "", video_link: "",
        category_id: 0, sources: [], attributes: [], variants: [], advanced_prices: []
    });
    const { createAdvancedPrice } = useAdvancedPrice();
    const [advancedPrices, setAdvancedPrices] = React.useState<Partial<AdvancedPrice>[]>([]);

    React.useEffect(() => {
        fetchCategories();
        fetchSources();
    }, []);

    const handleAttributeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number[];
        setSelectedAttributes(value as never[]);
    };

    const handleAttributeValueChange = (attributeId: number, event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number[];
        setSelectedAttributeValues(prev => ({
            ...prev,
            [attributeId]: value,
        }));
    };

    const handleProductChange = (field: keyof Product, value: any, index?: number) => {
        setProduct((prev) => {
            let updatedProduct = { ...prev };
            if (field === 'sources' || field === 'attributes' || field === 'variants' || field === 'advanced_prices') {
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

            // Generate slug when name changes
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
            setProduct((prev: any) => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.entries(product).forEach(([key, value]) => {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                } else if (value !== null) {
                    formData.append(key, value.toString());
                }
            });

            // Ensure weight is a number
            if (product.weight) {
                formData.set('weight', Number(product.weight).toString());
            }

            // Create the product
            const newProduct = await createProduct(formData as any);

            // If product creation is successful, create advanced prices
            if (newProduct.id) {
                await Promise.all(
                    advancedPrices.map(price => createAdvancedPrice({ ...price, product_id: newProduct.id }))
                );
            }

            console.log('Product created successfully');
            // You might want to redirect or show a success message here
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error creating product:', error.response.data);
                // Handle validation errors
                if (error.response.status === 422) {
                    const validationErrors = error.response.data.errors;
                    // Display validation errors to the user
                    Object.entries(validationErrors).forEach(([field, messages]) => {
                        console.error(`${field}: ${messages.join(', ')}`);
                        // You might want to set these errors in state and display them in the UI
                    });
                }
            } else {
                console.error('Error creating product:', error);
            }
        }
    };

    const renderTextField = (label: string, name: string, value: any, type: string = "text") => (
        <TextField
            fullWidth
            label={label}
            name={name}
            value={value}
            type={type}
            onChange={(e) => handleProductChange(e.target.name as keyof typeof product, e.target.value)}
        />
    );

    const generateVariants = () => {
        const selectedAttributes = product.attributes.filter((attr: any) => attr.attribute_id && attr.value_id);
        if (selectedAttributes.length === 0) return;

        const generateCombinations = (attrs: any[], index: number = 0, current: any[] = []): any[][] => {
            if (index === attrs.length) {
                return [current];
            }
            const attribute = attrs[index];
            const combinations: any[][] = [];
            combinations.push(...generateCombinations(attrs, index + 1, [...current, attribute]));
            return combinations;
        };

        const combinations = generateCombinations(selectedAttributes);
        const newVariants = combinations.map(combination => ({
            name: `${product.name} - ${combination.map(attr => attr.value).join(' - ')}`,
            price: product.price,
            sku: '',
            stock_quantity: 0,
            attributes: combination
        }));

        setProduct((prev: any) => ({ ...prev, variants: newVariants }));
    };

    const handleAdvancedPriceChange = (index: number, field: keyof AdvancedPrice, value: any) => {
        setAdvancedPrices(prev => {
            const newPrices = [...prev];
            newPrices[index] = { ...newPrices[index], [field]: value };
            return newPrices;
        });
    };

    const handleAddAdvancedPrice = () => {
        setAdvancedPrices([...advancedPrices, { type: '', amount: 0, start_time: null, end_time: null }]);
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
                                                onChange={(e) => handleProductChange(e.target.name as keyof typeof product, e.target.value)}
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
                                            value={product.start_new_time ? dayjs(product.start_new_time) : null}
                                            onChange={(date) => handleProductChange('start_new_time', date)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <DatePicker
                                            label="End New Time"
                                            value={product.end_new_time ? dayjs(product.end_new_time) : null}
                                            onChange={(date) => handleProductChange('end_new_time', date)}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Thuộc tính</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {loading ? (
                                    <CircularProgress />
                                ) : error ? (
                                    <Typography color="error">{error}</Typography>
                                ) : (
                                    <>
                                        <FormControl sx={{ m: 1, width: 300 }}>
                                            <InputLabel id="attributes-checkbox-label">Attributes</InputLabel>
                                            <Select
                                                labelId="attributes-checkbox-label"
                                                id="attributes-checkbox"
                                                multiple
                                                value={selectedAttributes}
                                                onChange={handleAttributeChange}
                                                input={<OutlinedInput label="Attributes" />}
                                                renderValue={(selected) => selected.map(id => attributes.find(attr => attr.id === id)?.name || '').join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {attributes.map((attribute) => (
                                                    <MenuItem key={attribute.id} value={attribute.id}>
                                                        <Checkbox checked={selectedAttributes.includes(attribute.id as never)} />
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
                                                            <TableCell>Attribute</TableCell>
                                                            <TableCell>Values</TableCell>
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
                                                                                onChange={(e) => handleAttributeValueChange(attributeId, e)}
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
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}

                                        <Button onClick={generateVariants} sx={{ mt: 2 }}>
                                            Generate Variants
                                        </Button>
                                    </>
                                )}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Advanced Prices</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {advancedPrices.map((price, index) => (
                                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Type</InputLabel>
                                                    <Select
                                                        value={price.type}
                                                        onChange={(e) => handleAdvancedPriceChange(index, 'type', e.target.value)}
                                                    >
                                                        <MenuItem value="discount">Discount</MenuItem>
                                                        <MenuItem value="special">Special</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Amount"
                                                    type="number"
                                                    value={price.amount}
                                                    onChange={(e) => handleAdvancedPriceChange(index, 'amount', parseFloat(e.target.value))}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <DatePicker
                                                    label="Start Time"
                                                    value={price.start_time ? dayjs(price.start_time) : null}
                                                    onChange={(newValue) => handleAdvancedPriceChange(index, 'start_time', newValue?.toISOString())}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <DatePicker
                                                    label="End Time"
                                                    value={price.end_time ? dayjs(price.end_time) : null}
                                                    onChange={(newValue) => handleAdvancedPriceChange(index, 'end_time', newValue?.toISOString())}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                                <Button startIcon={<AddIcon />} onClick={handleAddAdvancedPrice}>
                                    Add Advanced Price
                                </Button>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Nguồn hàng</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {product.sources.map((source, index) => (
                                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} md={5}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Source</InputLabel>
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
                                                {renderTextField("Quantity", `sources[${index}].quantity`, source.quantity.toString(), "number")}
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
