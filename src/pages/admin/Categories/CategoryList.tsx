import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from 'react-data-table-component';
import { Input, Button } from 'reactstrap';

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  status: string;
  stock: number;
}

const mockCategories: Category[] = [
  { id: 1, name: 'Phòng Khách', imageUrl: '/assets/admin/images/categories/living-room.png', status: 'Hoạt động', stock: 150 },
  { id: 2, name: 'Phòng Ngủ', imageUrl: '/assets/admin/images/categories/bedroom.png', status: 'Hoạt động', stock: 120 },
  { id: 3, name: 'Phòng Ngủ', imageUrl: '/assets/admin/images/categories/dining-room.png', status: 'Tạm ngưng', stock: 80 },
  { id: 4, name: 'Văn Phòng', imageUrl: '/assets/admin/images/categories/office.png', status: 'Hoạt động', stock: 100 },
  { id: 5, name: 'Ngoài Trời', imageUrl: '/assets/admin/images/categories/outdoor.png', status: 'Tạm ngưng', stock: 60 },
  { id: 6, name: 'Phòng Đọc', imageUrl: '/assets/admin/images/categories/reading-room.png', status: 'Hoạt động', stock: 50 },
  { id: 7, name: 'Phòng Trẻ Em', imageUrl: '/assets/admin/images/categories/kids-room.png', status: 'Hoạt động', stock: 90 },
  { id: 8, name: 'Phòng Giải Trí', imageUrl: '/assets/admin/images/categories/entertainment-room.png', status: 'Tạm ngưng', stock: 45 },
  { id: 9, name: 'Phòng Tắm', imageUrl: '/assets/admin/images/categories/bathroom.png', status: 'Hoạt động', stock: 70 },
  { id: 10, name: 'Nhà Bếp', imageUrl: '/assets/admin/images/categories/kitchen.png', status: 'Tạm ngưng', stock: 110 },
  { id: 11, name: 'Gara', imageUrl: '/assets/admin/images/categories/garage.png', status: 'Hoạt động', stock: 55 },
  { id: 12, name: 'Hành Lang', imageUrl: '/assets/admin/images/categories/hallway.png', status: 'Hoạt động', stock: 65 },
  { id: 13, name: 'Phòng Thể Dục', imageUrl: '/assets/admin/images/categories/gym-room.png', status: 'Tạm ngưng', stock: 40 },
  { id: 14, name: 'Ban Công', imageUrl: '/assets/admin/images/categories/balcony.png', status: 'Hoạt động', stock: 35 },
  { id: 15, name: 'Phòng Ngủ', imageUrl: '/assets/admin/images/categories/wine-room.png', status: 'Tạm ngưng', stock: 25 },
  { id: 16, name: 'Hầm Xe', imageUrl: '/assets/admin/images/categories/basement.png', status: 'Hoạt động', stock: 20 },
  { id: 17, name: 'Sân Thượng', imageUrl: '/assets/admin/images/categories/rooftop.png', status: 'Hoạt động', stock: 30 },
  { id: 18, name: 'Phòng Giặt', imageUrl: '/assets/admin/images/categories/laundry-room.png', status: 'Tạm ngưng', stock: 15 },
  { id: 19, name: 'Kho', imageUrl: '/assets/admin/images/categories/storage-room.png', status: 'Hoạt động', stock: 100 },
  { id: 20, name: 'Sảnh Lớn', imageUrl: '/assets/admin/images/categories/lobby.png', status: 'Hoạt động', stock: 85 }
];


const headers = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'imageUrl', label: 'Hình ảnh', sortable: false },
  { key: 'name', label: 'Tên danh mục', sortable: true },
  { key: 'status', label: 'Trạng thái', sortable: true },
  { key: 'stock', label: 'Số lượng', sortable: true },
  { key: 'actions', label: 'Thao tác', sortable: false }
];

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchCategories = (page: number) => {
    const filteredData = mockCategories.filter(category =>
      Object.entries(filters).every(([key, value]) =>
        category[key as keyof Category].toString().toLowerCase().includes(value.toLowerCase())
      )
    );

    const start = (page - 1) * perPage;
    const end = start + perPage;
    setCategories(filteredData.slice(start, end));
    setTotalRows(filteredData.length);
  };

  useEffect(() => {
    fetchCategories(1);
  }, [perPage, filters]);

  const handlePageChange = (page: number) => {
    fetchCategories(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
  };

  const handleSearch = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const columns = headers.map(header => ({
    name: header.label,
    selector: (row: Category) => row[header.key as keyof Category],
    sortable: header.sortable,
    cell: (row: Category) => {
      if (header.key === 'imageUrl') {
        return <img src={row.imageUrl} alt={row.name} width="50" height="50" className="rounded-circle" />;
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
      return row[header.key as keyof Category];
    },
  }));

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản Lý Danh Mục</h2>
      <p>Tổng số danh mục: {mockCategories.length}</p>

      <div className="mb-3">
        <Link to="/admin/categories/create" className="btn btn-primary">
          <Icon icon="mdi:plus" className="me-1" /> Thêm Danh Mục
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={categories}
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

export default CategoryList;
