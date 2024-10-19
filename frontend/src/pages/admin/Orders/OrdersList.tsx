import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from 'react-data-table-component';
import { Input, Button } from 'reactstrap';

interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  status: string;
  totalAmount: number;
}

const mockOrders: Order[] = [
    { id: 1, customerName: 'Nguyễn Văn A', orderDate: '2024-01-01', status: 'Đang xử lý', totalAmount: 500000 },
    { id: 2, customerName: 'Trần Thị B', orderDate: '2024-01-02', status: 'Hoàn thành', totalAmount: 300000 },
    { id: 3, customerName: 'Lê Văn C', orderDate: '2024-01-03', status: 'Đang giao', totalAmount: 150000 },
    { id: 4, customerName: 'Phạm Thị D', orderDate: '2024-01-04', status: 'Đã hủy', totalAmount: 0 },
    { id: 5, customerName: 'Nguyễn Văn E', orderDate: '2024-01-05', status: 'Đang xử lý', totalAmount: 200000 },
    { id: 6, customerName: 'Nguyễn Thị F', orderDate: '2024-01-06', status: 'Đang giao', totalAmount: 350000 },
    { id: 7, customerName: 'Lê Văn G', orderDate: '2024-01-07', status: 'Hoàn thành', totalAmount: 450000 },
    { id: 8, customerName: 'Trần Văn H', orderDate: '2024-01-08', status: 'Đang xử lý', totalAmount: 600000 },
    { id: 9, customerName: 'Phạm Văn I', orderDate: '2024-01-09', status: 'Đã hủy', totalAmount: 0 },
    { id: 10, customerName: 'Nguyễn Văn J', orderDate: '2024-01-10', status: 'Đang giao', totalAmount: 250000 },
    { id: 11, customerName: 'Trần Thị K', orderDate: '2024-01-11', status: 'Hoàn thành', totalAmount: 700000 },
    { id: 12, customerName: 'Lê Văn L', orderDate: '2024-01-12', status: 'Đang xử lý', totalAmount: 800000 },
    { id: 13, customerName: 'Nguyễn Thị M', orderDate: '2024-01-13', status: 'Đang giao', totalAmount: 900000 },
    { id: 14, customerName: 'Phạm Văn N', orderDate: '2024-01-14', status: 'Hoàn thành', totalAmount: 1000000 },
    { id: 15, customerName: 'Trần Văn O', orderDate: '2024-01-15', status: 'Đang xử lý', totalAmount: 1100000 },
    { id: 16, customerName: 'Nguyễn Văn P', orderDate: '2024-01-16', status: 'Đang giao', totalAmount: 1200000 },
    { id: 17, customerName: 'Lê Thị Q', orderDate: '2024-01-17', status: 'Đã hủy', totalAmount: 0 },
    { id: 18, customerName: 'Trần Văn R', orderDate: '2024-01-18', status: 'Hoàn thành', totalAmount: 1300000 },
    { id: 19, customerName: 'Nguyễn Văn S', orderDate: '2024-01-19', status: 'Đang xử lý', totalAmount: 1400000 },
    { id: 20, customerName: 'Phạm Thị T', orderDate: '2024-01-20', status: 'Đang giao', totalAmount: 1500000 },
];


const headers = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'customerName', label: 'Tên Khách Hàng', sortable: true },
  { key: 'orderDate', label: 'Ngày Đặt Hàng', sortable: true },
  { key: 'status', label: 'Trạng Thái', sortable: true },
  { key: 'totalAmount', label: 'Tổng Tiền', sortable: true },
  { key: 'actions', label: 'Thao Tác', sortable: false }
];

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchOrders = (page: number) => {
    const filteredData = mockOrders.filter(order =>
      Object.entries(filters).every(([key, value]) =>
        order[key as keyof Order].toString().toLowerCase().includes(value.toLowerCase())
      )
    );

    const start = (page - 1) * perPage;
    const end = start + perPage;
    setOrders(filteredData.slice(start, end));
    setTotalRows(filteredData.length);
  };

  useEffect(() => {
    fetchOrders(1);
  }, [perPage, filters]);

  const handlePageChange = (page: number) => {
    fetchOrders(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
  };

  const handleSearch = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const columns = headers.map(header => ({
    name: header.label,
    selector: (row: Order) => row[header.key as keyof Order],
    sortable: header.sortable,
    cell: (row: Order) => {
      if (header.key === 'totalAmount') {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.totalAmount);
      }
      if (header.key === 'actions') {
        return (
          <>
            <Button color="primary" size="sm" className="me-1">
              <Icon icon="mdi:eye" />
            </Button>
            <Button color="warning" size="sm" className="me-1">
              <Icon icon="mdi:pencil" />
            </Button>
            <Button color="danger" size="sm">
              <Icon icon="mdi:delete" />
            </Button>
          </>
        );
      }
      return row[header.key as keyof Order];
    },
  }));

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản Lý Đơn Hàng</h2>
      <p>Tổng số đơn hàng: {mockOrders.length}</p>

      <div className="mb-3">
        <Link to="/admin/orders/create" className="btn btn-primary">
          <Icon icon="mdi:plus" className="me-1" /> Thêm Đơn Hàng
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        fixedHeader
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        subHeader
        subHeaderComponent={
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {headers.filter(h => h.sortable).map(header => (
              <Input
                key={header.key}
                type="text"
                placeholder={`Tìm ${header.label.toLowerCase()}...`}
                onChange={(e) => handleSearch(header.key, e.target.value)}
                style={{ width: '200px', marginRight: '10px' }}
              />
            ))}
          </div>
        }
      />
    </div>
  );
};

export default OrdersList;
