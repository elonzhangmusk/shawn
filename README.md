# 🚀 科幻风格个人展示网站

## 📋 项目概述
这是一个高级的科幻风格个人展示网站，专为张航宁（杭州电子科技大学自动化专业）设计。网站包含3D效果、博客系统和权限管理功能。

## ✨ 核心功能

### 🎨 科幻风格设计
- **Three.js 3D粒子星空背景**
- **悬浮几何体动画效果**
- **霓虹青蓝(#00d4ff) + 电光紫(#bd00ff)配色**
- **发光边框、毛玻璃卡片、渐变文字特效**
- **鼠标视差响应效果**

### 🏆 智能车项目重点展示
- **全国一等奖智能车项目详细展示**
- **视觉算法开发（OpenCV图像处理）**
- **决策与控制协同（PID算法）**
- **项目时间线可视化**

### 📝 完整博客系统
- **用户注册/登录功能**
- **Markdown编辑器支持**
- **评论系统**
- **标签筛选管理**

### 🔐 权限管理系统
- **管理员权限**：修改内容、管理博客、禁止用户
- **普通用户权限**：发表博客和评论
- **用户管理面板**

## 🛠️ 技术栈

### 前端
- **React 18** - 现代前端框架
- **TypeScript** - 类型安全
- **Three.js** - 3D渲染引擎
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **React Router** - 路由管理

### 构建工具
- **Vite** - 快速构建工具
- **GitHub Pages** - 部署平台

## 📥 下载项目

### 方法一：直接下载ZIP
1. 点击页面右上角的 "Code" 按钮
2. 选择 "Download ZIP"
3. 解压到本地目录

### 方法二：Git克隆
```bash
git clone https://github.com/zhanghangning/scifi-portfolio.git
cd scifi-portfolio
```

## 🚀 本地运行

### 1. 安装依赖
```bash
npm install
# 或使用yarn
yarn install
# 或使用pnpm
pnpm install
```

### 2. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 3. 访问网站
打开浏览器访问：http://localhost:3000

## 🌐 部署到GitHub Pages

### 1. 创建GitHub仓库
1. 登录GitHub
2. 点击右上角 "+" → "New repository"
3. 仓库名：`scifi-portfolio`
4. 选择公开（Public）
5. 点击 "Create repository"

### 2. 上传代码
```bash
# 初始化git
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/scifi-portfolio.git

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交"

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 3. 配置GitHub Pages
1. 进入仓库设置（Settings）
2. 左侧选择 "Pages"
3. 在 "Source" 部分选择 "GitHub Actions"
4. 网站将自动构建和部署

### 4. 访问网站
部署完成后，访问：https://你的用户名.github.io/scifi-portfolio

## 📁 项目结构
```
scifi-portfolio/
├── public/              # 静态资源
├── src/
│   ├── components/      # React组件
│   ├── pages/          # 页面组件
│   ├── utils/          # 工具函数
│   ├── types/          # TypeScript类型定义
│   ├── hooks/          # 自定义Hook
│   ├── main.tsx        # 应用入口
│   └── index.css       # 全局样式
├── index.html          # HTML模板
├── package.json        # 项目配置
├── vite.config.ts      # Vite配置
├── tailwind.config.js  # Tailwind配置
└── README.md          # 项目说明
```

## 🔧 配置文件说明

### `package.json` 关键配置
```json
{
  "scripts": {
    "dev": "vite",                    // 开发服务器
    "build": "tsc && vite build",     // 构建生产版本
    "preview": "vite preview",        // 预览生产版本
    "deploy": "gh-pages -d dist"      // 部署到GitHub Pages
  },
  "homepage": "https://zhanghangning.github.io/scifi-portfolio"
}
```

### 环境变量
创建 `.env` 文件（可选）：
```env
VITE_APP_TITLE=张航宁个人展示网站
VITE_APP_DESCRIPTION=科幻风格个人展示网站
```

## 🎨 自定义配置

### 修改配色
在 `tailwind.config.js` 中修改颜色：
```javascript
colors: {
  'neon-cyan': '#00d4ff',      // 霓虹青色
  'electric-purple': '#bd00ff', // 电光紫色
  'cyber-blue': '#0a0a1a',     // 背景蓝色
}
```

### 修改个人信息
在 `src/data/profile.ts` 中修改个人信息：
```typescript
export const profileData = {
  name: "张航宁",
  school: "杭州电子科技大学",
  major: "自动化专业",
  // ... 其他信息
}
```

## 📱 响应式设计
- **桌面端**：完整3D特效和交互
- **平板端**：简化3D效果
- **移动端**：优化加载速度

## 🔐 默认账号
- **管理员**：`admin` / `admin123`
- **普通用户**：`user` / `user123`

## 🚨 常见问题

### 1. 安装依赖失败
```bash
# 清除npm缓存
npm cache clean --force

# 删除node_modules
rm -rf node_modules

# 重新安装
npm install
```

### 2. 构建失败
```bash
# 检查TypeScript错误
npx tsc --noEmit

# 检查依赖版本
npm outdated
```

### 3. GitHub Pages无法访问
- 检查仓库是否为公开（Public）
- 等待几分钟让GitHub Pages生效
- 检查 `vite.config.ts` 中的 `base` 配置

### 4. 3D效果不显示
- 检查浏览器是否支持WebGL
- 检查Three.js是否正确加载
- 查看浏览器控制台错误信息

## 📞 联系方式
- **姓名**：张航宁
- **学校**：杭州电子科技大学
- **专业**：自动化
- **邮箱**：3400136344@qq.com
- **电话**：15957455889

## 📄 许可证
MIT License

## 🙏 致谢
- Three.js 社区
- React 生态系统
- Tailwind CSS 团队
- Vite 开发团队

---

**✨ 祝您使用愉快！如果遇到任何问题，请查看常见问题或联系我。**