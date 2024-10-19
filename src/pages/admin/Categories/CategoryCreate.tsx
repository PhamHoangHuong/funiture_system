import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

const TaoChuyenMuc: React.FC = () => {
    return (
        <div className="container-fluid">
            <Row>
                <Col xl={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">Tạo Chuyên Mục</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Thông Tin Chuyên Mục</h4>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="tenChuyenMuc">Tên Chuyên Mục</Form.Label>
                                    <Form.Control type="text" id="tenChuyenMuc" placeholder="Nhập tên chuyên mục" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="moTaChuyenMuc">Mô Tả</Form.Label>
                                    <Form.Control as="textarea" rows={5} id="moTaChuyenMuc" placeholder="Nhập mô tả" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="chuyenMucCha">Chuyên Mục Cha</Form.Label>
                                    <Form.Select id="chuyenMucCha">
                                        <option>Chọn chuyên mục cha</option>
                                        {/* Thêm các tùy chọn cho chuyên mục cha */}
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Hình Ảnh Chuyên Mục</h4>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hinhAnhChuyenMuc">Tải Lên Hình Ảnh</Form.Label>
                                <Form.Control type="file" id="hinhAnhChuyenMuc" />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Dữ Liệu Meta</h4>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="tieuDeMeta">Tiêu Đề Meta</Form.Label>
                                    <Form.Control type="text" id="tieuDeMeta" placeholder="Nhập tiêu đề meta" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="tuKhoaMeta">Từ Khóa Meta</Form.Label>
                                    <Form.Control type="text" id="tuKhoaMeta" placeholder="Nhập từ khóa meta" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="moTaMeta">Mô Tả Meta</Form.Label>
                                    <Form.Control as="textarea" rows={3} id="moTaMeta" placeholder="Nhập mô tả meta" />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <div className="text-end mb-3">
                        <Button variant="danger" className="me-2">
                            Hủy
                        </Button>
                        <Button variant="success" type="submit">
                            Tạo Chuyên Mục
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TaoChuyenMuc;
