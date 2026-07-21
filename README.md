# 猫猫王求职

一个本地优先的职位筛选与申请工作台。产品思路参考 [career-ops](https://github.com/santifer/career-ops)：先用简历、求职偏好和硬性条件从大量职位中筛选高质量机会，再生成针对性材料，最后由用户确认是否提交。

## 当前版本

- 中文本地 Web UI，支持桌面端和移动端
- 每日职位雷达、匹配分数、解释和来源信息
- 从 Greenhouse 和 Ashby 公开职位板扫描真实岗位，并保留原始申请链接
- 加入申请队列 / 跳过职位，状态保存在浏览器本地
- 更换简历后自动更新求职画像、重新扫描并刷新 Dashboard
- 求职画像、独立材料库、职位来源和自动化设置界面
- PDF、DOCX、TXT、Markdown 简历的本地解析与保存（支持拖拽）
- 可在设置页修改姓名、城市和职业方向，侧栏与欢迎语实时同步
- 可在设置页验证、临时使用和移除 OpenAI API Key，浏览器不保存 Key
- LinkedIn 搜索配置：关键词、地点、工作方式、发布时间、经验级别、雇佣类型和 Easy Apply
- LinkedIn 登录仅在浏览器中完成；应用不保存账号密码
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

纯本地单用户运行时，可以打开“自动化设置”，在 OpenAI API 区域输入 API Key 和模型 ID，然后点击“验证并使用”。Key 验证后只保存在本地服务的当前运行会话中，不进入浏览器存储、不落盘、不回传，也不会写入 Git；重启本地服务会自动清除。

公开部署或多人使用时，应由服务端统一提供 Key。复制 `.env.example` 为 `.env.local`：

复制 `.env.example` 为 `.env.local`，在本机填写 API key：

```bash
OPENAI_API_KEY=你的密钥
OPENAI_MODEL=gpt-5.6
```

`.env.local` 已被 `.gitignore` 排除。重启本地服务后生效。没有配置 Key 时，应用会使用本地规则给出初步职位建议，手动编辑和保存画像仍然可用。

> 不要把真实 Key 写进 `.env.example`、源码、README、截图或 Git commit。设置页的“移除本机 Key”会清除浏览器中保存的 Key。

## API 接口

- `GET /api/analyze-resume`：检查服务端是否配置了 Key。
- `GET /api/openai-key`：只返回是否配置及模型 ID，不返回 Key。
- `POST /api/openai-key`：验证 Key 与模型权限，并放入当前本地服务会话。
- `DELETE /api/openai-key`：清除当前会话 Key。
- `POST /api/analyze-resume`：使用当前会话 Key 或服务端环境变量分析简历。
- `POST /api/scan-jobs`：扫描公开职位板并按求职画像重新评分。

## 当前安全边界

- 简历、画像、身份信息和申请状态默认保存在当前浏览器；API Key 不进入浏览器存储。
- LinkedIn 登录由用户在 LinkedIn 页面完成，本应用不读取密码或 Cookie。
- 自动提交保持关闭；最终投递必须由用户确认。
- 当前材料生成和自动填表仍是待实现功能，界面不会把“待生成”伪装为已完成。

## 上传 GitHub 前检查

```bash
npm run lint
npm test
git status --short
```

确认 `.env.local` 不存在或已被忽略，并检查暂存内容中没有任何 `sk-...` 密钥。

仓库包含 GitHub Actions CI，会在推送和 Pull Request 时执行 lint、生产构建与渲染测试。项目采用 [MIT License](LICENSE)。

更完整的模块边界见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。
