# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 一 TodoList 项目

# 二 图书管理系统，具备以下功能
## 1. 前端(React) 

    首页 /books：展示所有书籍（标题 + 作者 + 是否借出）

    详情页 /books/:id：查看单本书详情

    新建/编辑书籍 /books/new /books/:id/edit

    删除书籍

    用 React Router 实现路由切换

    用 React Query 管理数据请求和缓存   

## 2. 后端(Express)

    GET /api/books → 获取所有书籍

    GET /api/books/:id → 获取单本书

    POST /api/books → 添加书籍

    PUT /api/books/:id → 更新书籍

    DELETE /api/books/:id → 删除书籍