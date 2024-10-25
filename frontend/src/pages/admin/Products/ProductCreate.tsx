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
        <div className="container mt-3">
            <h4 className="mb-3">Thêm Sản Phẩm</h4>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={3}>
                        <FormGroup floating>
                            <Input
                                bsSize="lg"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Tên Sản Phẩm"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup floating>
                            <Input
                                bsSize="sm"
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
                            <Label for="category" className="small-label">Danh Mục</Label>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup floating>
                            <Input
                                bsSize="sm"
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
                            <Label for="price" className="small-label">Giá</Label>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup floating>
                            <Input
                                bsSize="sm"
                                type="number"
                                name="stock"
                                id="stock"
                                placeholder="Số Lượng"
                                value={formData.stock}
                                onChange={handleInputChange}
                                min={0}
                                required
                            />
                            <Label for="stock" className="small-label">Số Lượng</Label>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup floating>
                            <DatePicker
                                selected={formData.releaseDate}
                                onChange={handleDateChange}
                                className="form-control form-control-sm"
                                dateFormat="dd/MM/yyyy"
                                id="releaseDate"
                                name="releaseDate"
                                placeholderText="Ngày Phát Hành"
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup floating>
                    <Input
                        bsSize="sm"
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="Mô Tả"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={{ height: '80px' }}
                    />
                    <Label for="description" className="small-label">Mô Tả</Label>
                </FormGroup>
                <Button color="primary" size="sm" type="submit" className="mt-2">
                    Thêm Sản Phẩm
                </Button>
            </Form>
            <style>{`
                .form-floating > .form-control,
                .form-floating > .form-control-plaintext {
                    padding: 0.5rem 0.5rem;
                }
                .form-floating > .form-control,
                .form-floating > .form-control-plaintext,
                .form-floating > .form-select {
                    height: calc(2.5rem + 2px);
                    line-height: 1.25;
                }
                .form-floating > label {
                    padding: 0.5rem 0.5rem;
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
                    font-weight: normal;
                }
                .small-label {
                    font-size: 0.875rem;
                }
                .form-control-sm {
                    font-size: 0.875rem;
                }
            `}</style>
        </div>
    );
};

export default ProductCreate;
