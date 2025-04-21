# PersonaTrip-UI

## 项目概述

PersonaTrip-UI是一个基于React的前端应用，为PersonaTrip智能旅行规划系统提供用户界面。该应用允许用户创建个性化的旅行计划，获取目的地推荐，并管理他们的旅行行程。系统还包含一个完整的管理员后台，用于系统配置和用户管理。

## 功能特点

### 用户功能

- **用户认证**：注册、登录和个人资料管理
- **旅行计划**：创建、查看、编辑和删除旅行计划
- **AI辅助规划**：基于用户偏好生成个性化旅行建议
- **目的地推荐**：根据用户兴趣和预算获取旅游目的地推荐

### 管理员功能

- **管理员认证**：独立的管理员登录系统
- **用户管理**：查看和管理系统用户
- **管理员账户管理**：创建、编辑和删除管理员账户
- **模型配置**：管理AI模型配置，包括API密钥、参数设置等

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite
- **UI组件库**：Material UI
- **状态管理**：React Context API
- **路由管理**：React Router v6
- **HTTP客户端**：Axios
- **日期处理**：date-fns, @mui/x-date-pickers

## 项目结构

```
personatrip-ui/
├── public/              # 静态资源
├── src/                 # 源代码
│   ├── components/      # 可复用组件
│   │   ├── admin/       # 管理员组件
│   │   └── common/      # 通用组件
│   ├── contexts/        # React上下文
│   ├── pages/           # 页面组件
│   │   ├── admin/       # 管理员页面
│   │   └── ...          # 其他页面
│   ├── services/        # API服务
│   ├── styles/          # 样式文件
│   ├── utils/           # 工具函数
│   ├── App.tsx          # 应用入口组件
│   ├── config.ts        # 全局配置
│   └── main.tsx         # 应用入口点
├── .gitignore           # Git忽略文件
├── index.html           # HTML模板
├── package.json         # 项目依赖
├── tsconfig.json        # TypeScript配置
└── vite.config.ts       # Vite配置
```

## 安装与运行

### 前提条件

- Node.js (v16+)
- npm 或 yarn

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/ZhangSetSail/PersonaTrip-UI.git
cd PersonaTrip-UI
```

2. 安装依赖

```bash
yarn install
# 或
npm install
```

3. 配置环境

编辑 `src/config.ts` 文件，设置API基础URL：

```typescript
export const API_BASE_URL = 'http://your-api-url';
```

4. 启动开发服务器

```bash
yarn dev
# 或
npm run dev
```

应用将在 http://localhost:3000 运行（或下一个可用端口）。

### 构建生产版本

```bash
yarn build
# 或
npm run build
```

构建文件将生成在 `dist` 目录中。

## API集成

应用通过以下服务与后端API集成：

- `authService.ts` - 用户认证相关API
- `tripService.ts` - 旅行计划相关API
- `adminService.ts` - 管理员系统相关API

所有API调用都使用Axios库，并配置了统一的错误处理和认证令牌管理。

## 路由结构

### 用户路由

- `/` - 首页
- `/login` - 用户登录
- `/register` - 用户注册
- `/dashboard` - 用户仪表盘
- `/trips` - 旅行计划列表
- `/trips/:id` - 旅行计划详情
- `/trips/create` - 创建旅行计划
- `/profile` - 用户资料

### 管理员路由

- `/admin/login` - 管理员登录
- `/admin/dashboard` - 管理员仪表盘

## 贡献指南

1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

[MIT](LICENSE)

## 联系方式

项目维护者：[ZhangSetSail](https://github.com/ZhangSetSail)

---

© 2025 PersonaTrip. 保留所有权利。
