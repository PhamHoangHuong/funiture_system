import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export function createPage(config: PageConfig) {
  if (config.subItems) {
    const parentDir = path.join(__dirname, '..', '..', 'pages', 'admin', config.name);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    config.subItems.forEach(subItem => {
      if (!pageExists(config, subItem)) {
        createSubPage(config, subItem);
      }
    });
  } else if (config.component) {
    if (!pageExists(config)) {
      createSinglePage(config);
    }
  }
}

function pageExists(config: PageConfig, subItem?: SubMenuItem): boolean {
  let componentPath;
  if (subItem) {
    componentPath = path.join(__dirname, '..', '..', 'pages', 'admin', config.name, `${subItem.name}.tsx`);
  } else {
    componentPath = path.join(__dirname, '..', '..', 'pages', 'admin', `${config.component}.tsx`);
  }
  return fs.existsSync(componentPath);
}

function createSinglePage(config: PageConfig) {
  const { name, route, component, title } = config;

  const componentContent = `
import React from 'react';

const ${name}: React.FC = () => {
  return (
    <div>
      <h1>${title}</h1>
      {/* Nội dung component của bạn */}
    </div>
  );
};

export default ${name};
`;

  const componentPath = path.join(__dirname, '..', '..', 'pages', 'admin', `${component}.tsx`);
  const componentDir = path.dirname(componentPath);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  fs.writeFileSync(componentPath, componentContent);
  updateRoutes(name, route, componentPath);
  console.log(`Trang ${name} đã được tạo thành công!`);
}

function createSubPage(parentConfig: PageConfig, subItem: SubMenuItem) {
  const { name, route, title } = subItem;
  const componentName = `${parentConfig.name}${name}`;
  const componentPath = `${parentConfig.name}/${name}`;

  const componentContent = `
import React from 'react';

const ${componentName}: React.FC = () => {
  return (
    <div>
      <h1>${title}</h1>
      {/* Nội dung component của bạn */}
    </div>
  );
};

export default ${componentName};
`;

  const fullComponentPath = path.join(__dirname, '..', '..', 'pages', 'admin', `${componentPath}.tsx`);
  const componentDir = path.dirname(fullComponentPath);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  fs.writeFileSync(fullComponentPath, componentContent);
  updateRoutes(componentName, route, componentPath);
  console.log(`Trang con ${componentName} đã được tạo thành công!`);
}

function updateRoutes(name: string, route: string, component: string) {
  const routerPath = path.join(__dirname, '..', '..', 'routes', 'AdminRoutes.tsx');
  let routerContent = fs.readFileSync(routerPath, 'utf-8');

  const importStatement = `import ${name} from "../pages/admin/${component}";\n`;
  const routeStatement = `<Route path="${route.replace('/admin/', '')}" element={<${name} />} />\n`;

  if (!routerContent.includes(importStatement)) {
    routerContent = routerContent.replace(/import React from "react"/, `import React from "react"\n${importStatement}`);
  }

  if (!routerContent.includes(routeStatement)) {
    const insertPosition = routerContent.lastIndexOf('<Route path="settings"');
    if (insertPosition !== -1) {
      routerContent = routerContent.slice(0, insertPosition) + `        ${routeStatement}` + routerContent.slice(insertPosition);
    }
  }

  fs.writeFileSync(routerPath, routerContent);
}
