import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Divider } from "@mui/material";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ProductCreate: React.FC = () => {
    const [product, setProduct] = useState({
        name: "",
        slug: "",
        description: "",
        content: "",
        image: "",
        status: 1,
        weight: "",
        price: "",
        start_new_time: null,
        end_new_time: null,
        advanced_price_id: "",
        parent_id: "",
        sku: "",
        stock_quantity: "",
        seo_title: "",
        seo_description: "",
        video_link: "",
        category_id: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name: string) => (date: dayjs.Dayjs | null) => {
        setProduct((prev) => ({ ...prev, [name]: date }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Product data:", product);
        // Handle form submission
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
                                        <TextField fullWidth label="Tên sản phẩm" name="name" value={product.name} onChange={handleInputChange} required />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Slug" name="slug" value={product.slug} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <InputLabel>Trạng thái</InputLabel>
                                            <Select name="status" value={product.status} onChange={handleInputChange as any} label="Trạng thái">
                                                <MenuItem value={1}>Hoạt động</MenuItem>
                                                <MenuItem value={0}>Không hoạt động</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Giá" name="price" type="number" value={product.price} onChange={handleInputChange} />
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6">Thông tin bổ sung</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="SKU" name="sku" value={product.sku} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Số lượng trong kho" name="stock_quantity" type="number" value={product.stock_quantity} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Cân nặng" name="weight" value={product.weight} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Danh mục" name="category_id" value={product.category_id} onChange={handleInputChange} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6">SEO và Media</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="SEO Title" name="seo_title" value={product.seo_title} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="SEO Description" name="seo_description" multiline value={product.seo_description} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField fullWidth label="Video Link" name="video_link" value={product.video_link} onChange={handleInputChange} />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Container>
            </form>
        </LocalizationProvider>
    );
};

export default ProductCreate;
