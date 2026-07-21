# GitHub 协作与发布

## Pull Request 流程

1. 从 `main` 创建功能分支，并为用户可见变化更新 `CHANGELOG.md`。
2. GitHub CI 使用 Node.js 22.13 和 `npm ci` 还原锁定依赖，运行 lint、生产构建、API 测试与渲染测试。
3. 处理失败检查并完成审核后再合并。

推荐在 GitHub 的 `main` branch protection 中启用：要求 Pull Request、至少 1 个 approval、`Lint, build, and test` 状态检查、分支保持最新，并禁止 force push 与删除。

## 免费 GitHub Pages Demo

1. 在 GitHub 打开 **Settings → Pages**。
2. 在 **Build and deployment → Source** 选择 **GitHub Actions**。
3. 打开 **Actions → Launch GitHub Pages Demo → Run workflow**，或推送到 `main`。
4. 成功后访问 `https://jackzhang0925.github.io/Career_Pilot/`。

如果 `Configure GitHub Pages` 返回 `Get Pages site failed: Not Found`，表示第 2 步尚未完成。不要给 workflow 添加个人访问 Token，也不要设置 `enablement: true`；在仓库设置中启用 Pages 后重新运行失败任务即可。

之后每次推送或合并到 `main` 都会重新验证并更新免费 Demo。工作流使用 GitHub 官方 Pages Actions，不需要 Cloudflare secrets。

Pages 只托管静态文件，因此不会运行 `/api/scan-jobs`、`/api/career-coach`、`/api/analyze-resume` 或 `/api/openai-key`。Demo 会保留演示数据以及所有浏览器本地功能，并明确显示 `GITHUB PAGES DEMO`，避免把静态数据说成实时结果。

## Secrets 与运行时配置

- 不要提交 `.env.local`、`.dev.vars`、API key、简历或 LinkedIn 会话数据。
- Pull Request 工作流没有生产部署凭据。
- GitHub Pages Demo 不接受或保存生产 `OPENAI_API_KEY`；AI 服务端模式仅在本地或未来的动态托管版本中启用。
- LinkedIn 密码和 Cookie 不属于部署配置，应用不会读取它们。

## 本地发布前检查

```bash
npm run check
git status --short
```

检查暂存 diff、`CHANGELOG.md`，并确认没有 `sk-...` 等密钥或个人简历内容。
