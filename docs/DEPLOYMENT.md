# GitHub 协作与发布

## Pull Request 流程

1. 从 `main` 创建功能分支，并为用户可见变化更新 `CHANGELOG.md`。
2. GitHub CI 使用 Node.js 22.13 和 `npm ci` 还原锁定依赖，运行 lint、生产构建、API 测试与渲染测试。
3. 处理失败检查并完成审核后再合并。

推荐在 GitHub 的 `main` branch protection 中启用：要求 Pull Request、至少 1 个 approval、`Lint, build, and test` 状态检查、分支保持最新，并禁止 force push 与删除。

## 零配置 GitHub Live Demo

1. 运行 `npm run build:demo`，生成并提交 `live-demo/`。
2. 推送到公开仓库的 `main` 分支。
3. 访问 `https://raw.githack.com/jackzhang0925/Career_Pilot/main/live-demo/index.html`。

该方案不调用 GitHub Pages API，因此不会出现 `Get Pages site failed: Not Found`，也不需要 `enablement`、PAT、Cloudflare 或仓库 secrets。GitHack 是第三方缓存代理，适合公开演示和评审，不作为正式生产 SLA。

之后每次推送或合并到 `main` 都会重新构建并检查已提交 Demo 是否与源码一致。分支 URL 使用短期缓存；需要不可变评审链接时，把 URL 中的 `main` 替换为具体 commit SHA，并使用 `rawcdn.githack.com`。

静态 Demo 不会运行 `/api/scan-jobs`、`/api/career-coach`、`/api/analyze-resume` 或 `/api/openai-key`。它会保留演示数据以及所有浏览器本地功能，并明确显示 `GITHUB LIVE DEMO`，避免把静态数据说成实时结果。

## Secrets 与运行时配置

- 不要提交 `.env.local`、`.dev.vars`、API key、简历或 LinkedIn 会话数据。
- Pull Request 工作流没有生产部署凭据。
- GitHub 静态 Demo 不接受或保存生产 `OPENAI_API_KEY`；AI 服务端模式仅在本地或未来的动态托管版本中启用。
- LinkedIn 密码和 Cookie 不属于部署配置，应用不会读取它们。

## 本地发布前检查

```bash
npm run check
git status --short
```

检查暂存 diff、`CHANGELOG.md`，并确认没有 `sk-...` 等密钥或个人简历内容。
