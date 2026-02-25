#!/bin/bash

# 科幻风格个人展示网站部署脚本
# 作者：张航宁

echo "🚀 开始部署科幻风格个人展示网站..."

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装，请先安装Node.js"
    echo "访问 https://nodejs.org/ 下载安装"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ npm未安装，请先安装npm"
    exit 1
fi

# 检查git是否安装
if ! command -v git &> /dev/null; then
    echo "❌ git未安装，请先安装git"
    echo "访问 https://git-scm.com/ 下载安装"
    exit 1
fi

echo "✅ 环境检查通过"

# 安装依赖
echo "📦 安装依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 项目构建失败"
    exit 1
fi

echo "✅ 项目构建完成"

# 检查dist目录
if [ ! -d "dist" ]; then
    echo "❌ dist目录不存在"
    exit 1
fi

echo "📁 项目结构:"
ls -la dist/

# 部署选项
echo ""
echo "📋 部署选项:"
echo "1. 部署到GitHub Pages"
echo "2. 部署到Vercel"
echo "3. 部署到Netlify"
echo "4. 本地预览"
echo "5. 退出"
echo ""

read -p "请选择部署方式 (1-5): " choice

case $choice in
    1)
        echo "🌐 部署到GitHub Pages..."
        
        # 检查gh-pages是否安装
        if ! npm list gh-pages &> /dev/null; then
            echo "📦 安装gh-pages..."
            npm install gh-pages --save-dev
        fi
        
        # 询问GitHub用户名
        read -p "请输入GitHub用户名: " github_username
        
        # 更新package.json中的homepage
        sed -i "s|zhanghangning|$github_username|g" package.json
        
        # 部署
        npm run deploy
        
        if [ $? -eq 0 ]; then
            echo "✅ 部署成功！"
            echo "🌍 访问地址: https://$github_username.github.io/scifi-portfolio"
        else
            echo "❌ 部署失败"
        fi
        ;;
        
    2)
        echo "🚀 部署到Vercel..."
        echo "请执行以下步骤:"
        echo "1. 访问 https://vercel.com"
        echo "2. 使用GitHub登录"
        echo "3. 导入此项目仓库"
        echo "4. 点击部署"
        echo ""
        echo "或使用Vercel CLI:"
        echo "npm install -g vercel"
        echo "vercel"
        ;;
        
    3)
        echo "🌐 部署到Netlify..."
        echo "请执行以下步骤:"
        echo "1. 访问 https://netlify.com"
        echo "2. 拖拽dist文件夹到部署区域"
        echo "3. 获得自动生成的链接"
        echo ""
        echo "或使用Netlify CLI:"
        echo "npm install -g netlify-cli"
        echo "netlify deploy"
        ;;
        
    4)
        echo "🔧 启动本地预览..."
        npm run preview
        ;;
        
    5)
        echo "👋 退出部署"
        exit 0
        ;;
        
    *)
        echo "❌ 无效的选择"
        exit 1
        ;;
esac

echo ""
echo "📋 部署完成！"
echo ""
echo "✨ 网站功能:"
echo "   - 科幻风格3D效果"
echo "   - 智能车项目展示"
echo "   - 博客系统"
echo "   - 权限管理"
echo ""
echo "🔧 管理账号:"
echo "   - 管理员: admin / admin123"
echo "   - 普通用户: user / user123"
echo ""
echo "📞 联系方式:"
echo "   - 张航宁"
echo "   - 杭州电子科技大学 自动化"
echo "   - 邮箱: 3400136344@qq.com"
echo "   - 电话: 15957455889"