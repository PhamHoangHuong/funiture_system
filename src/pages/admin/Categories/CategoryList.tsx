import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from 'react-data-table-component';
import { Input, Button } from 'reactstrap';
// import { catyrogyRowData } from "../../../contexts/category";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  status: string;
  stock: number;
}

const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Phòng Khách',
    imageUrl: '/assets/admin/images/categories/living-room.png',
    status: 'Hoạt động',
    stock: 150
  },
  {
    id: 2,
    name: 'Phòng Ngủ',
    imageUrl: '/assets/admin/images/categories/bedroom.png',
    status: 'Hoạt động',
    stock: 120
  },
  {
    id: 3,
    name: 'Phòng Ăn',
    imageUrl: '/assets/admin/images/categories/dining-room.png',
    status: 'Tạm ngưng',
    stock: 80
  },
  {
    id: 4,
    name: 'Văn Phòng',
    imageUrl: '/assets/admin/images/categories/office.png',
    status: 'Hoạt động',
    stock: 100
  },
  {
    id: 5,
    name: 'Ngoài Trời',
    imageUrl: '/assets/admin/images/categories/outdoor.png',
    status: 'Tạm ngưng',
    stock: 60
  },
  {
    id: 6,
    name: 'Phòng Đọc',
    imageUrl: '/assets/admin/images/categories/reading-room.png',
    status: 'Hoạt động',
    stock: 50
  },
  {
    id: 7,
    name: 'Phòng Đọc',
    imageUrl: '/assets/admin/images/categories/reading-room.png',
    status: 'Hoạt động',
    stock: 50
  },
  {
    id: 8,
    name: 'Phòng Đọc',
    imageUrl: '/assets/admin/images/categories/reading-room.png',
    status: 'Hoạt động',
    stock: 50
  },
  {
    id: 9,
    name: 'Phòng Đọc',
    imageUrl: '/assets/admin/images/categories/reading-room.png',
    status: 'Hoạt động',
    stock: 50
  },
  {
    id: 10,
    name: 'Phòng Đọc',
    imageUrl: '/assets/admin/images/categories/reading-room.png',
    status: 'Hoạt động',
    stock: 50
  },
  {
    id: 11,
    name: 'Phòng Đọc',
    imageUrl: '/assets/admin/images/categories/reading-room.png',
    status: 'Hoạt động',
    stock: 50
  }

];

const headers = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'imageUrl', label: 'Hình ảnh', sortable: false },
  { key: 'name', label: 'Tên danh mục', sortable: true },
  { key: 'status', label: 'Trạng thái', sortable: true },
  { key: 'stock', label: 'Số lượng', sortable: true },
  { key: 'status', label: 'Trạng thái', sortable: true },
  { key: 'actions', label: 'Thao tác', sortable: false }
];

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchCategories = (page: number) => {
    // Simulate API call with mock data
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
      <div className="mb-3">
        <Link to="/admin/categories/create" className="btn btn-primary">
          <Icon icon="mdi:plus" className="me-1" /> Thêm Danh Mục
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={categories}
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
