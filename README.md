# 猫猫王求职

一个本地优先的职位筛选与申请工作台。产品思路参考 [career-ops](https://github.com/santifer/career-ops)：先用简历、求职偏好和硬性条件从大量职位中筛选高质量机会，再生成针对性材料，最后由用户确认是否提交。

## Live DEMO
https://raw.githack.com/jackzhang0925/Career_Pilot/main/live-demo/index.html

## 当前版本

- 中文本地 Web UI，支持桌面端和移动端
- 每日职位雷达、匹配分数、解释和来源信息
- 从 Greenhouse、Lever 和 Ashby 公开职位板扫描真实岗位，并保留原始申请链接
- Dashboard 首次打开、每 5 分钟及重新回到标签页时自动刷新，并显示数据时间和来源故障
- 加入申请队列 / 跳过职位，状态保存在浏览器本地
- 更换简历后自动更新求职画像、重新扫描并刷新 Dashboard
- 求职画像、独立材料库、职位来源和自动化设置界面
- PDF、DOCX、TXT、Markdown 简历的本地解析与保存（支持拖拽）
- 可在设置页修改姓名、城市和职业方向，侧栏与欢迎语实时同步
- 可在设置页验证、临时使用和移除 OpenAI API Key，浏览器不保存 Key
- LinkedIn 搜索配置：关键词、地点、工作方式、发布时间、经验级别、雇佣类型和 Easy Apply
- LinkedIn 搜索保存后直接显示在 Dashboard；不需要人工确认“浏览器已连接”
- 用户可主动粘贴 LinkedIn 职位链接与完整描述，按当前画像评分并以“LinkedIn · 用户导入”加入 Dashboard
- 上传简历后进入职业教练对话，探索可迁移经验、转行方向和阶段学习路线
- 默认禁止未经确认点击最终提交
- 首次启动包含少量演示数据；完成扫描后会替换为公开职位板的实时结果

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

打开终端显示的本地地址（默认 `http://localhost:3000`）。生产构建使用：

```bash
npm run build
npm run start
```

## 配置 AI 简历分析

纯本地单用户运行时，可以点击页面右上角的钥匙图标打开“本地 API Key 测试”，输入 OpenAI API Key 和模型 ID，然后点击“验证并用于本次会话”。验证成功后可直接打开职业教练测试。也可以在“自动化设置”的 OpenAI API 区域完成相同操作。

临时 Key 功能只接受来自 `localhost`、`127.0.0.1` 或 `::1` 的请求。Key 验证后只保存在本地服务的当前运行进程中，不进入浏览器存储、不写入 Cookie、不落盘，也不会写入 Git；重启本地服务或点击“移除临时 Key”会清除。

公开部署或多人使用时，应由服务端统一提供 Key。复制 `.env.example` 为 `.env.local`，在本机填写 API key：

```bash
OPENAI_API_KEY=你的密钥
OPENAI_MODEL=gpt-5.6-sol
```

`.env.local` 已被 `.gitignore` 排除。重启本地服务后生效。没有配置 Key 时，应用会使用本地规则给出初步职位建议，手动编辑和保存画像仍然可用。

> 不要把真实 Key 写进 `.env.example`、源码、README、截图或 Git commit。设置页的“移除本机 Key”会清除本地服务当前会话中的临时 Key。

## API 接口

- `GET /api/analyze-resume`：检查服务端是否配置了 Key。
- `GET /api/openai-key`：只返回是否配置及模型 ID，不返回 Key。
- `POST /api/openai-key`：验证 Key 与模型权限，并放入当前本地服务会话。
- `DELETE /api/openai-key`：清除当前会话 Key。
- `POST /api/analyze-resume`：使用当前会话 Key 或服务端环境变量分析简历。
- `POST /api/scan-jobs`：扫描启用的公开职位板并按求职画像重新评分；返回抓取时间和失败来源，且不会被缓存。
- `POST /api/career-coach`：基于简历、目标岗位和最近对话生成循证追问与阶段学习路线。

## LinkedIn 与实时数据边界

LinkedIn 页面需要用户自己的浏览器登录会话。应用不读取 LinkedIn Cookie，也不会在服务端抓取、截图或自动操作登录后的职位列表。用户保存筛选条件后，Dashboard 会直接显示搜索卡片和一键入口，不再要求确认浏览器连接。

Dashboard 的自动实时刷新只包含 Greenhouse、Lever 和 Ashby 等公开职位板。LinkedIn 搜索卡不计入实时扫描数量，也不会被误报为已评分职位。需要评分时，用户可在职位来源页主动粘贴 LinkedIn 职位链接及完整职位描述；本地规则会按当前画像评分并将它加入职位池，来源明确标记为“LinkedIn · 用户导入”。

## GitHub 协作与零配置 Live Demo

- 协作者分支和 Pull Request 会运行 CI，执行锁定安装、lint、生产构建与测试。
- `live-demo/` 保存可直接展示的静态构建；推送到公开 GitHub 仓库后由 GitHack 免费提供正确的 HTML、CSS 和 JavaScript Content-Type。
- Demo 地址为 `https://raw.githack.com/jackzhang0925/Career_Pilot/main/live-demo/index.html`，不需要启用 GitHub Pages，不需要部署 Token，也不需要付费服务。
- `main` 会运行 **Validate GitHub-hosted Demo**，确认源码测试通过并且提交的静态 Demo 没有过期。
- 静态 Demo 支持本地简历解析、LinkedIn 用户导入评分、队列、职业教练本地模式和路线图；实时职位 API、OpenAI 服务端调用和本地 API Key 窗口不在公开 Demo 中运行。

完整配置和分支保护建议见 [部署文档](docs/DEPLOYMENT.md)，逐项验收结果见 [验证清单](docs/VALIDATION.md)，版本变化见 [CHANGELOG.md](CHANGELOG.md)。

## 当前安全边界

- 简历、画像、身份信息和申请状态默认保存在当前浏览器；API Key 不进入浏览器存储。
- 使用 AI 简历分析或 AI 职业教练时，简历文字及必要的最近对话会发送到用户配置的 OpenAI API；本地规则模式不会发送。
- LinkedIn 登录由用户在 LinkedIn 页面完成，本应用不读取密码或 Cookie。
- 自动提交保持关闭；最终投递必须由用户确认。
- 当前材料生成和自动填表仍是待实现功能，界面不会把“待生成”伪装为已完成。

## 上传 GitHub 前检查

```bash
npm run check
git status --short
```

确认 `.env.local` 不存在或已被忽略，并检查暂存内容中没有任何 `sk-...` 密钥。

仓库包含 GitHub Actions CI/CD 和零配置静态 Demo 验证。项目采用 [MIT License](LICENSE)。

更完整的模块边界见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。
