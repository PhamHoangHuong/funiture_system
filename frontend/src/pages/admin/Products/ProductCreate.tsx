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
import { useProductContext, useCategory, useSource, useAttribute, useAdvancedPrice } from '../../../core/hooks/contexts';
import { Product, AdvancedPrice } from '../../../core/hooks/dataTypes';
import { generateSlug } from '../../../core/hooks/format';
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

type ProductWithArrays = Product & {
    sources: any[];
    attributes: any[];
};

const ProductCreate: React.FC = () => {
    const { createProduct } = useProductContext();
    const { categories, fetchCategories } = useCategory();
    const { sources, fetchSources } = useSource();
    const { attributes, attributeValues, loading, error } = useAttribute();
    const [selectedAttributes, setSelectedAttributes] = React.useState<number[]>([]);
    const [selectedAttributeValues, setSelectedAttributeValues] = React.useState<Record<number, number[]>>({});
    const [product, setProduct] = React.useState<ProductWithArrays>({
        id: 0, name: "", slug: "", description: "", content: "", image: "",
        status: 1, weight: 0, price: 0, start_new_time: null,
        end_new_time: null, advanced_price_id: 0, parent_id: 0,
        sku: "", stock_quantity: 0, seo_title: "", seo_description: "", video_link: "",
        category_id: 0, sources: [], attributes: [], advanced_prices: []
    });
    const { createAdvancedPrice } = useAdvancedPrice();
    const [advancedPrices, setAdvancedPrices] = React.useState<Partial<AdvancedPrice>[]>([]);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetchCategories();
        fetchSources();
    }, []);

    const handleAttributeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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

    const handleProductChange = (field: keyof Product, value: any, index?: number) => {
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

            if (product.weight) {
                formData.set('weight', Number(product.weight).toString());
            }

            const newProduct = await createProduct(formData as any);

            if (newProduct.id) {
                await Promise.all(
                    advancedPrices.map(price => createAdvancedPrice({ ...price, product_id: newProduct.id }))
                );
            }

            console.log('Product created successfully');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error creating product:', error.response.data);
                if (error.response.status === 422) {
                    const validationErrors = error.response.data.errors;
                    Object.entries(validationErrors).forEach(([field, messages]) => {
                        console.error(`${field}: ${messages.join(', ')}`);
                    });
                }
            } else {
                console.error('Error creating product:', error);
            }
        }
    };

    const generateVariantNames = (baseName: string, attributes: any[], attributeValues: any) => {
        const combinations: string[] = [];

        const generateCombinations = (currentCombination: string[], index: number) => {
            if (index === attributes.length) {
                combinations.push(currentCombination.join(' '));
                return;
            }

            const attributeId = attributes[index];
            const values = attributeValues[attributeId] || [];

            values.forEach((value: string) => {
                generateCombinations([...currentCombination, `${attributes[index].name}: ${value}`], index + 1);
            });
        };

        generateCombinations([baseName], 0);
        console.log("Generated Combinations:", combinations);
        return combinations;
    };

    const handleGenerateVariants = () => {
        const variantNames = generateVariantNames(product.name, selectedAttributes, selectedAttributeValues);

        const newVariants = variantNames.map(name => {
            const variantAttributes = selectedAttributes.map(attrId => ({
                attribute_id: attrId,
                values: selectedAttributeValues[attrId] || []
            }));

            console.log(`Variant Name: ${name}, Attributes:`, variantAttributes);

            return {
                name,
                sku: '',
                price: product.price,
                weight: product.weight,
                status: product.status,
                attributes: variantAttributes,
                parent_id: product.id
            };
        });

    };

    const handleAddAdvancedPrice = () => {
        const initialPrice = {
            type: '',
            amount: 0,
            start_time: null,
            end_time: null,
            attributes: selectedAttributes.map(attrId => ({
                attribute_id: attrId,
                values: selectedAttributeValues[attrId] || []
            }))
        };
        setAdvancedPrices([...advancedPrices, initialPrice]);
    };

    const handleRemoveVariant = (index: number) => {
        setProduct((prev) => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };

    const handleEditVariant = (index: number) => {
        // Implement edit logic here
    };

    const removeAdvancedPrice = (index: number) => {
        setAdvancedPrices(prev => prev.filter((_, i) => i !== index));
    };

    const removeAttribute = (attributeId: number) => {
        setSelectedAttributes(prev => prev.filter(id => id !== attributeId));
        setSelectedAttributeValues(prev => {
            const updatedValues = { ...prev };
            delete updatedValues[attributeId];
            return updatedValues;
        });
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
                                    <Grid item md={10}>
                                        <Grid container spacing={3}>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Tên sản phẩm"
                                                    value={product.name}
                                                    onChange={(e) => handleProductChange('name', e.target.value)}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Slug"
                                                    value={product.slug}
                                                    onChange={(e) => handleProductChange('slug', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="SKU"
                                                    value={product.sku}
                                                    onChange={(e) => handleProductChange('sku', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Giá"
                                                    type="number"
                                                    value={product.price}
                                                    onChange={(e) => handleProductChange('price', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Cân nặng"
                                                    type="number"
                                                    value={product.weight}
                                                    onChange={(e) => handleProductChange('weight', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4}>
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
                                            <Grid item md={4}>
                                                <FormControl fullWidth required>
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
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="SEO Title"
                                                    value={product.seo_title}
                                                    onChange={(e) => handleProductChange('seo_title', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="SEO Description"
                                                    multiline
                                                    value={product.seo_description}
                                                    onChange={(e) => handleProductChange('seo_description', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Mô tả"
                                                    multiline
                                                    value={product.description}
                                                    onChange={(e) => handleProductChange('description', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Nội dung"
                                                    multiline
                                                    value={product.content}
                                                    onChange={(e) => handleProductChange('content', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Video Link"
                                                    value={product.video_link}
                                                    onChange={(e) => handleProductChange('video_link', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <DatePicker
                                                    label="Start New Time"
                                                    value={product.start_new_time ? dayjs(product.start_new_time) : null}
                                                    onChange={(date) => handleProductChange('start_new_time', date)}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <DatePicker
                                                    label="End New Time"
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
                                                Upload Image
                                            </Button>
                                        </label>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Thuộc tính</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControl sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="attributes-checkbox-label">Thuộc tính</InputLabel>
                                    <Select
                                        labelId="attributes-checkbox-label"
                                        id="attributes-checkbox"
                                        multiple
                                        value={selectedAttributes}
                                        onChange={handleAttributeChange}
                                        input={<OutlinedInput label="Thuộc tính" />}
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
                                                    <TableCell>Thuộc tính</TableCell>
                                                    <TableCell>Giá trị</TableCell>
                                                    <TableCell>Hành động</TableCell>
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
                                <Typography variant="h6">Sản phẩm biến thể</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer component={Paper} sx={{ mt: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Hình ảnh</TableCell>
                                                <TableCell>Tên</TableCell>
                                                <TableCell>SKU</TableCell>
                                                <TableCell>Giá</TableCell>
                                                <TableCell>Cân nặng</TableCell>
                                                <TableCell>Trạng thái</TableCell>
                                                <TableCell>Thuộc tính</TableCell>
                                                <TableCell>Hành động</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            sản phẩm biến thể
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Giá nâng cao</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {advancedPrices.map((price, index) => (
                                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                                        <Grid container spacing={2}>
                                            <Grid item md={2}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Loại</InputLabel>
                                                    <Select
                                                        value={price.type}
                                                        onChange={(e) => handleAdvancedPriceChange(index, 'type', e.target.value)}
                                                    >
                                                        <MenuItem value="discount">Giảm giá</MenuItem>
                                                        <MenuItem value="special">Đặc biệt</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Số tiền"
                                                    type="number"
                                                    value={price.amount}
                                                    onChange={(e) => handleAdvancedPriceChange(index, 'amount', parseFloat(e.target.value))}
                                                />
                                            </Grid>
                                            <Grid item md={3}>
                                                <DatePicker
                                                    label="Thời gian bắt đầu"
                                                    value={price.start_time ? dayjs(price.start_time) : null}
                                                    onChange={(newValue) => handleAdvancedPriceChange(index, 'start_time', newValue?.toISOString())}
                                                />
                                            </Grid>
                                            <Grid item md={3}>
                                                <DatePicker
                                                    label="Thời gian kết thúc"
                                                    value={price.end_time ? dayjs(price.end_time) : null}
                                                    onChange={(newValue) => handleAdvancedPriceChange(index, 'end_time', newValue?.toISOString())}
                                                />
                                            </Grid>
                                            <Grid item md={1}>
                                                <IconButton onClick={() => removeAdvancedPrice(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                                <Button startIcon={<AddIcon />} onClick={handleAddAdvancedPrice}>
                                    Thêm giá
                                </Button>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}>
                                <Typography variant="h6">Nguồn hàng</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {product.sources.map((source, index) => (
                                    <Box key={index} sx={{ mb: 2, p: 2, borderRadius: '4px' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} md={5}>
                                                <FormControl fullWidth required>
                                                    <InputLabel>Nguồn</InputLabel>
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
                                                    label="Số lượng"
                                                    type="number"
                                                    value={source.quantity}
                                                    onChange={(e) => handleProductChange(`sources[${index}].quantity`, e.target.value)}
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
                                    Thêm nguồn hàng
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