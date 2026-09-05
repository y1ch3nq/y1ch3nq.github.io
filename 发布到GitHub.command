#!/bin/zsh
set -e

SCRIPT_DIR="${0:A:h}"
cd "$SCRIPT_DIR"

OWNER="y1ch3nq"
REPO="y1ch3nq.github.io"
REMOTE_URL="https://github.com/${OWNER}/${REPO}.git"

echo "Zoey Portfolio · GitHub Pages 发布助手"
echo "---------------------------------------"

if ! command -v git >/dev/null 2>&1; then
  echo "未找到 Git。请先安装 Xcode Command Line Tools。"
  read "?按回车退出..."
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
    echo "正在创建公开仓库 ${OWNER}/${REPO}..."
    gh repo create "${OWNER}/${REPO}" --public --source=. --remote=origin --description "Zoey Yichen Qian — portfolio"
    gh api -X POST "repos/${OWNER}/${REPO}/pages" -f build_type=workflow >/dev/null 2>&1 || true
  else
    echo "首次发布需要先创建一个空仓库：${OWNER}/${REPO}"
    open "https://github.com/new?name=${REPO}&description=Zoey%20Yichen%20Qian%20portfolio&visibility=public"
    echo "请在打开的 GitHub 页面点击 Create repository（不要添加 README）。"
    read "?创建完成后，回到这里按回车继续..."
    git remote add origin "$REMOTE_URL"
  fi
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "未找到 Node.js / npm。请先安装 Node.js 22 或更新版本。"
  read "?按回车退出..."
  exit 1
fi

echo "正在安装依赖并检查正式版本..."
npm install
npm run build

git add -A
if ! git diff --cached --quiet; then
  git commit -m "Rebuild Zoey portfolio"
else
  echo "没有新的网页改动，继续检查线上分支。"
fi

git branch -M main
git push -u origin main

echo ""
echo "发布已触发。通常 1–2 分钟后可访问："
echo "https://${OWNER}.github.io/"
open "https://github.com/${OWNER}/${REPO}/actions"
read "?按回车关闭窗口..."
