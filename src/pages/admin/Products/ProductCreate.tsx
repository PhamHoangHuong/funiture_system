import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DuLieuSanPham {
    ten: string;
    moTa: string;
    gia: number;
    danhMuc: string;
    soLuong: number;
    ngayPhatHanh: Date | null;
}

const duLieuBanDau: DuLieuSanPham = {
    ten: '',
    moTa: '',
    danhMuc: '',
    gia: 0,
    soLuong: 0,
    ngayPhatHanh: null,
};

const danhSachDanhMuc = ['Điện tử', 'Quần áo', 'Sách', 'Nhà & Vườn', 'Đồ chơi'];

const TaoSanPham: React.FC = () => {
    const [duLieuForm, setDuLieuForm] = useState<DuLieuSanPham>(duLieuBanDau);

    const xuLyThayDoiInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDuLieuForm(trangThaiTruoc => ({
            ...trangThaiTruoc,
            [name]: name === 'gia' || name === 'soLuong' ? parseFloat(value) : value,
        }));
    };

    const xuLyThayDoiNgay = (ngay: Date | null) => {
        setDuLieuForm(trangThaiTruoc => ({
            ...trangThaiTruoc,
            ngayPhatHanh: ngay,
        }));
    };

    const xuLyGuiForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Đã gửi form:', duLieuForm);
        setDuLieuForm(duLieuBanDau);
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col xl={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">Tạo Sản Phẩm Mới</h4>
                    </div>
                </Col>
            </Row>

            <Form onSubmit={xuLyGuiForm}>
                <Row>
                    <Col lg={9}>
                        <Card>
                            <Card.Body>
                                <h4 className="header-title mb-3">Thông Tin Sản Phẩm</h4>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="ten">Tên Sản Phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="ten"
                                        name="ten"
                                        value={duLieuForm.ten}
                                        onChange={xuLyThayDoiInput}
                                        placeholder="Nhập tên sản phẩm"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="moTa">Mô Tả</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        id="moTa"
                                        name="moTa"
                                        value={duLieuForm.moTa}
                                        onChange={xuLyThayDoiInput}
                                        placeholder="Nhập mô tả sản phẩm"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="danhMuc">Danh Mục</Form.Label>
                                    <Form.Select
                                        id="danhMuc"
                                        name="danhMuc"
                                        value={duLieuForm.danhMuc}
                                        onChange={xuLyThayDoiInput}
                                        required
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {danhSachDanhMuc.map((danhMuc, index) => (
                                            <option key={index} value={danhMuc}>
                                                {danhMuc}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={3}>
                        <Card>
                            <Card.Body>
                                <h4 className="header-title mb-3">Chi Tiết Sản Phẩm</h4>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="gia">Giá</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="gia"
                                        name="gia"
                                        value={duLieuForm.gia}
                                        onChange={xuLyThayDoiInput}
                                        min={0}
                                        step={0.01}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="soLuong">Số Lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="soLuong"
                                        name="soLuong"
                                        value={duLieuForm.soLuong}
                                        onChange={xuLyThayDoiInput}
                                        min={0}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="ngayPhatHanh">Ngày Phát Hành</Form.Label>
                                    <DatePicker
                                        selected={duLieuForm.ngayPhatHanh}
                                        onChange={xuLyThayDoiNgay}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                        id="ngayPhatHanh"
                                        name="ngayPhatHanh"
                                        placeholderText="Chọn ngày phát hành"
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Body>
                                <h4 className="header-title mb-3">Hình Ảnh Sản Phẩm</h4>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="hinhAnh">Tải Lên Hình Ảnh</Form.Label>
                                    <Form.Control type="file" id="hinhAnh" />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={12}>
                        <div className="text-end mb-3">
                            <Button variant="danger" className="me-2" type="button">
                                Hủy
                            </Button>
                            <Button variant="success" type="submit">
                                Tạo Sản Phẩm
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default TaoSanPham;
