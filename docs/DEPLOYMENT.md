# GitHub 协作与发布

## Pull Request 流程

1. 从 `main` 创建功能分支，并为用户可见变化更新 `CHANGELOG.md`。
2. GitHub CI 使用 Node.js 22.13 和 `npm ci` 还原锁定依赖，运行 lint、生产构建、API 测试与渲染测试。
3. 处理失败检查并完成审核后再合并。

推荐在 GitHub 的 `main` branch protection 中启用：要求 Pull Request、至少 1 个 approval、`Lint, build, and test` 状态检查、分支保持最新，并禁止 force push 与删除。

## 首次 Launch 配置

1. 在 Cloudflare 创建仅具备目标 Worker 发布权限的 API Token。
2. 在 GitHub 打开 **Settings → Environments**，创建 `production`。
3. 添加 Environment secrets：`CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`。
4. 建议添加 required reviewer，避免未经确认的生产发布。
5. 打开 **Actions → Launch → Run workflow** 完成首次发布。

之后每次推送或合并到 `main` 都会在重新验证后发布，也可从 Actions 手动 Launch。工作流发布生成的 Cloudflare Worker，并保留控制台已有运行时变量。

## Secrets 与运行时配置

- 不要提交 `.env.local`、`.dev.vars`、API key、简历或 LinkedIn 会话数据。
- Pull Request 工作流没有生产部署凭据。
- 生产 `OPENAI_API_KEY` 应在 Cloudflare Worker secrets 中配置。
- LinkedIn 密码和 Cookie 不属于部署配置，应用不会读取它们。

## 本地发布前检查

```bash
npm run check
git status --short
```

检查暂存 diff、`CHANGELOG.md`，并确认没有 `sk-...` 等密钥或个人简历内容。
