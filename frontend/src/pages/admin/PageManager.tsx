import React, { useState, useEffect } from 'react';
import { pages, PageConfig, SubMenuItem } from '../../utils/pages';

const PageManager: React.FC = () => {
    const [pageList, setPageList] = useState<PageConfig[]>([]);
    const [newPage, setNewPage] = useState<PageConfig>({
        name: '',
        route: '',
        component: '',
        title: '',
        icon: '',
    });
    const [showSubItems, setShowSubItems] = useState(false);
    const [subItems, setSubItems] = useState<SubMenuItem[]>([]);

    useEffect(() => {
        setPageList(pages);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPage(prev => ({ ...prev, [name]: value }));
    };

    const handleSubItemChange = (index: number, field: keyof SubMenuItem, value: string) => {
        const updatedSubItems = [...subItems];
        updatedSubItems[index] = { ...updatedSubItems[index], [field]: value };
        setSubItems(updatedSubItems);
    };

    const addSubItem = () => {
        setSubItems([...subItems, { name: '', route: '', title: '' }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pageToAdd: PageConfig = {
            ...newPage,
            subItems: showSubItems ? subItems : undefined,
        };
        setPageList([...pageList, pageToAdd]);
        // Reset form
        setNewPage({
            name: '',
            route: '',
            component: '',
            title: '',
            icon: '',
        });
        setShowSubItems(false);
        setSubItems([]);
    };

    return (
        <div className="container mt-4">
            <h1>Quản lý Trang</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên trang</label>
                    <input type="text" className="form-control" id="name" name="name" value={newPage.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="route" className="form-label">Đường dẫn</label>
                    <input type="text" className="form-control" id="route" name="route" value={newPage.route} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="component" className="form-label">Tên component</label>
                    <input type="text" className="form-control" id="component" name="component" value={newPage.component} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Tiêu đề</label>
                    <input type="text" className="form-control" id="title" name="title" value={newPage.title} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="icon" className="form-label">Icon</label>
                    <input type="text" className="form-control" id="icon" name="icon" value={newPage.icon} onChange={handleInputChange} required />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="hasSubItems" checked={showSubItems} onChange={() => setShowSubItems(!showSubItems)} />
                    <label className="form-check-label" htmlFor="hasSubItems">Có mục con</label>
                </div>
                {showSubItems && (
                    <div className="mb-3">
                        <h3>Mục con</h3>
                        {subItems.map((item, index) => (
                            <div key={index} className="mb-3 border p-3">
                                <input type="text" className="form-control mb-2" placeholder="Tên" value={item.name} onChange={(e) => handleSubItemChange(index, 'name', e.target.value)} />
                                <input type="text" className="form-control mb-2" placeholder="Đường dẫn" value={item.route} onChange={(e) => handleSubItemChange(index, 'route', e.target.value)} />
                                <input type="text" className="form-control mb-2" placeholder="Tiêu đề" value={item.title} onChange={(e) => handleSubItemChange(index, 'title', e.target.value)} />
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={addSubItem}>Thêm mục con</button>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Thêm trang mới</button>
            </form>
            <div className="mt-4">
                <h2>Danh sách trang hiện tại</h2>
                <ul>
                    {pageList.map((page, index) => (
                        <li key={index}>{page.title} - {page.route}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PageManager;
