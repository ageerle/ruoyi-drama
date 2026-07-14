# ruoyi-drama

从 `ruoyi-web` 独立迁移的短剧创作 Web 项目，继续使用现有 `ruoyi-ai` 后台，后台代码和接口保持不变。

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址由 Vite 输出，默认后台为 `http://127.0.0.1:6039`。

如需切换后台，只修改 `.env.development`：

```dotenv
VITE_API_URL=/dev-api
VITE_API_PROXY_TARGET=http://你的后台地址:端口
VITE_CLIENT_ID=后台配置的客户端ID
```

`VITE_API_URL` 使用相对路径时，请求由 Vite 代理，可以避免浏览器跨域问题；也可将它改为后台完整 URL，但后台需要允许跨域。

## 生产构建

```bash
npm run build
```

产物位于 `dist/`。默认生产接口前缀为 `/prod-api`，示例 `nginx.conf` 会将该前缀代理到 `http://127.0.0.1:6039`。部署时按实际情况修改 `proxy_pass` 即可。

## 已迁移范围

- RuoYi 账号密码登录及令牌持久化
- 短剧项目、剧本、角色、场景、分镜管理
- AI 剧本与分镜流式生成
- 图片资产生成、选择与撤销
- 分镜视频生成、进度轮询
- 成片合成、进度查询、预览与下载
- 聊天、应用市场、图片工作台等非短剧功能未引入

---

## 独家赞助

访问 [Atlas Cloud 官网](https://www.atlascloud.ai/) · 编程计划优惠

全模态 AI 推理平台，为开发者提供统一的 AI API，支持视频生成、图像生成和大语言模型。一次接入，即可访问 300+ 精选模型。

<https://www.atlascloud.ai/>
