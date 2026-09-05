# Zoey Yichen Qian — Portfolio

一个像素风但保持专业、清晰的个人简历与项目网站。静态 HTML/CSS/JavaScript 构建，无需安装依赖。

## 本地预览

```bash
python3 -m http.server 4173
```

浏览器打开 `http://localhost:4173`。

## 一键发布到 GitHub Pages

双击 `发布到GitHub.command`。首次使用时，如果电脑没有安装并登录 GitHub CLI，脚本会打开 GitHub 的新建仓库页面；创建空仓库后回到终端按回车，后续更新只需再次双击脚本。

站点默认发布到：`https://y1ch3nq.github.io/`

GitHub Actions 工作流位于 `.github/workflows/pages.yml`，每次推送到 `main` 都会自动部署。
