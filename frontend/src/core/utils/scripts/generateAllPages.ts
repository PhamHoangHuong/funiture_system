import { pages } from '../pages.js';
import { createPage } from './createPage.js';
import { generateMenu } from './generateMenu.js';

function generateAllPages() {
  pages.forEach((page) => {
    createPage(page);
  });

  generateMenu();

  console.log('Tất cả các trang đã được tạo thành công!');
}

generateAllPages();
