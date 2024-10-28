import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pages, PageConfig, SubMenuItem } from '../pages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateMenuItem(page: PageConfig) {
  if (page.subItems) {
    return `
    <li className="nav-item">
        <a className="nav-link menu-arrow" href="${page.route}" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="${page.route.slice(1)}">
            <span className="nav-icon">
                <Icon icon="${page.icon}" />
            </span>
            <span className="nav-text"> ${page.title} </span>
        </a>
        <div className="collapse" id="${page.route.slice(1)}">
            <ul className="nav sub-navbar-nav">
                ${page.subItems.map((subItem: SubMenuItem) => `
                <li className="sub-nav-item">
                    <NavLink className="sub-nav-link" to="${subItem.route}">${subItem.title}</NavLink>
                </li>
                `).join('')}
            </ul>
        </div>
    </li>`;
  } else {
    return `
    <li className="nav-item">
        <NavLink className="nav-link" to="${page.route}">
            <span className="nav-icon">
                <Icon icon="${page.icon}" />
            </span>
            <span className="nav-text"> ${page.title} </span>
        </NavLink>
    </li>`;
  }
}

export function generateMenu() {
  const menuPath = path.join(__dirname, '..', '..', 'components', 'admin', 'AdminMenu.tsx');
  let menuContent = fs.readFileSync(menuPath, 'utf-8');

  const newMenuItems = pages.map(page => {
    const menuItem = generateMenuItem(page);
    if (!menuContent.includes(page.title)) {
      return menuItem;
    }
    return '';
  }).filter(item => item !== '').join('\n');

  if (newMenuItems) {
    const insertPosition = menuContent.lastIndexOf('Settings');
    if (insertPosition !== -1) {
      const settingsItemStart = menuContent.lastIndexOf('<li', insertPosition);
      const updatedMenuContent = menuContent.slice(0, settingsItemStart) + newMenuItems + '\n\n' + menuContent.slice(settingsItemStart);
      
      fs.writeFileSync(menuPath, updatedMenuContent);
      console.log('Menu đã được cập nhật thành công!');
    } else {
      console.log('Không thể tìm thấy vị trí để chèn menu mới.');
    }
  } else {
    console.log('Không có mục menu mới để thêm.');
  }
}