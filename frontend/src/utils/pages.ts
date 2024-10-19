interface SubMenuItem {
    name: string;
    route: string;
    title: string;
}

interface PageConfig {
    name: string;
    route: string;
    component?: string;
    title: string;
    icon: string;
    subItems?: SubMenuItem[];
}

export let pages: PageConfig[] = [
    {
        name: "QuanLyKhachHang",
        route: "#sidebarKhachHang",
        title: "Quản lý Khách hàng",
        icon: "mdi:account-group",
        subItems: [
            {
                name: "DanhSachKhachHang",
                route: "/admin/quan-ly-khach-hang/danh-sach",
                title: "Danh sách Khách hàng"
            },
            {
                name: "ThemKhachHang",
                route: "/admin/quan-ly-khach-hang/them-moi",
                title: "Thêm Khách hàng"
            }
        ]
    },
    // Thêm các trang khác ở đây nếu cần
];


export { PageConfig, SubMenuItem };
