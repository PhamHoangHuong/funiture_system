import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ProductFormData {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    releaseDate: Date | null;
}

const initialFormData: ProductFormData = {
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    releaseDate: null,
};

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'];

const ProductCreate: React.FC = () => {
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setFormData(prevState => ({
            ...prevState,
            releaseDate: date,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically send the formData to your API
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData(initialFormData);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Thêm Sản Phẩm</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormGroup floating>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Tên Sản Phẩm"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Label for="name">Tên Sản Phẩm</Label>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup floating>
                            <Input
                                type="select"
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Input>
                            <Label for="category">Danh Mục</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup floating>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="Mô Tả"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={{ height: '100px' }}
                    />
                    <Label for="description">Mô Tả</Label>
                </FormGroup>
                <Row>
                    <Col md={4}>
                        <FormGroup floating>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Giá"
                                value={formData.price}
                                onChange={handleInputChange}
                                min={0}
                                step={0.01}
                                required
                            />
                            <Label for="price">Giá</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup floating>
                            <Input
                                type="number"
                                name="stock"
                                id="stock"
                                placeholder="Số Lượng"
                                value={formData.stock}
                                onChange={handleInputChange}
                                min={0}
                                required
                            />
                            <Label for="stock">Số Lượng</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup floating>
                            <DatePicker
                                selected={formData.releaseDate}
                                onChange={handleDateChange}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                id="releaseDate"
                                name="releaseDate"
                                placeholderText="Ngày Phát Hành"
                            />
                            {/* <Label for="releaseDate">Ngày Phát Hành</Label> */}
                        </FormGroup>
                    </Col>
                </Row>
                <Button color="primary" type="submit" className="mt-3">
                    Thêm Sản Phẩm
                </Button>
            </Form>
            <style>{`
                .form-floating > .form-control,
                .form-floating > .form-control-plaintext {
                    padding: 1rem 0.75rem;
                }
                .form-floating > .form-control,
                .form-floating > .form-control-plaintext,
                .form-floating > .form-select {
                    height: calc(3.5rem + 2px);
                    line-height: 1.25;
                }
                .form-floating > label {
                    padding: 1rem 0.75rem;
                }
                .form-floating > .form-control:focus ~ label,
                .form-floating > .form-control:not(:placeholder-shown) ~ label,
                .form-floating > .form-select ~ label {
                    opacity: .65;
                    transform: scale(.85) translateY(-0.5rem) translateX(0.15rem);
                }
                .form-floating > .form-control:-webkit-autofill ~ label {
                    opacity: .65;
                    transform: scale(.85) translateY(-0.5rem) translateX(0.15rem);
                }
                .required:after {
                    content: " *";
                    color: red;
                }
                label {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default ProductCreate;
