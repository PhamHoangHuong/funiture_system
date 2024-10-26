import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable, { TableColumn } from 'react-data-table-component';
import { Input, Button } from 'reactstrap';
import { categoryService } from '../../../core/services/categoryService';
import { Category, TableHeader } from '../../../core/hooks/dataTypes';
import { formatDateTime, formatDate, formatDateYMD } from '../../../core/hooks/format';
import { useCategory } from '../../../core/contexts/CategoryContext';

const headers: TableHeader[] = [
  { key: 'id', label: 'ID', sortable: true },
  // { key: 'image', label: 'Hình ảnh', sortable: false },
  { key: 'name', label: 'Tên danh mục', sortable: true },
  { key: 'slug', label: 'Slug', sortable: true },
  { key: 'parent_id', label: 'Danh mục cha', sortable: true },
  { key: 'description', label: 'Mô tả', sortable: true },
  { key: 'status', label: 'Trạng thái', sortable: true },
  { key: 'created_at', label: 'Ngày tạo', sortable: true },
  { key: 'actions', label: 'Thao tác', sortable: false }
];

const CategoryList: React.FC = () => {
  const { categories, loading, error, fetchCategories } = useCategory();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const filtered = categories.filter(category =>
      Object.entries(filters).every(([key, value]) =>
        category[key as keyof Category]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredCategories(filtered);
    setTotalRows(filtered.length);
  }, [categories, filters]);

  const handleSearch = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(id);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const columns = headers.map(header => ({
    name: header.label,
    selector: (row: Category) => row[header.key as keyof Category],
    sortable: header.sortable,
    cell: (row: Category) => {
      if (header.key === 'image') {
        return <img src={row.image || ''} alt={row.name} width="50" height="50" className="rounded-circle" />;
      }
      if (header.key === 'parent_id') {
        return row.parent_id === null ? 'Không' : 'Có';
      }
      if (header.key === 'created_at') {
        return formatDate(row.created_at);
      }
      if (header.key === 'status') {
        return row.status ? 'Hoạt động' : 'Tạm ngưng';
      }
      if (header.key === 'actions') {
        return (
          <>
            <Link to={`/admin/categories/edit/${row.id}`} className="btn btn-warning btn-sm me-1">
              <Icon icon="mdi:pencil" />
            </Link>
            <Button color="danger" size="sm" onClick={() => handleDelete(row.id)}>
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
      <p>Tổng số danh mục: {totalRows}</p>

      <div className="mb-3">
        <Link to="/admin/categories/create" className="btn btn-primary">
          <Icon icon="mdi:plus" className="me-1" /> Thêm Danh Mục
        </Link>
      </div>

      <DataTable
        columns={columns as TableColumn<Category>[]}
        data={filteredCategories}
        fixedHeader
        pagination
        paginationTotalRows={totalRows}
        subHeader
      // subHeaderComponent={
      //   <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      //     {headers.filter(h => h.sortable).map(header => (
      //       <Input
      //         key={header.key}
      //         type="text"
      //         placeholder={`Tìm ${header.label.toLowerCase()}...`}
      //         onChange={(e) => handleSearch(header.key, e.target.value)}
      //         style={{ width: '200px', marginRight: '10px' }}
      //       />
      //     ))}
      //   </div>
      // }
      />
    </div>
  );
};

export default CategoryList;
