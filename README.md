<div align="center">

# AI 文生图 ✦ Text to Image

<p align="center">
  <img src="https://img.shields.io/badge/ModelScope-Z--Image--Turbo-blue?style=flat-square" alt="ModelScope">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square" alt="Node">
  <img src="https://img.shields.io/badge/price-FREE-orange?style=flat-square" alt="Free">
</p>

<p align="center">
  <b>基于 ModelScope 免费模型的 AI 文生图应用</b>
</p>

<p align="center">
  输入你的想象，AI 为你绘制 🎨
</p>

[快速开始](#-快速开始) | [功能展示](#-功能展示) | [获取帮助](#-获取帮助)

</div>

---

## ✨ 项目特色

- 🎨 **AI绘图** - 输入文字描述即可生成精美图片
- ⚡ **实时反馈** - SSE 流式推送生成进度，不用干等
- 🆓 **完全免费** - 使用 ModelScope 免费的 Z-Image-Turbo 模型
- 🌙 **炫酷界面** - 暗色主题 + 玻璃态 + 粒子动画
- 📱 **响应式** - PC 和手机端完美适配
- 📥 **一键下载** - 生成的图片可直接下载保存
- 📜 **历史记录** - 自动保存最近 20 张生成记录
- 🔐 **安全可靠** - API Key 后端隐藏，前端无法获取

## 🎯 功能展示

### 操作流程

1. 在输入框里写一段图片描述（英文效果更佳）
2. 点击「✨ 生成图片」按钮
3. 等待 AI 生成（通常 10-30 秒）
4. 查看生成结果，支持下载和历史记录

### 技术特点

- 🚀 SSE 流式响应，实时展示生成进度
- 🎨 玻璃拟态 + 暗色渐变设计
- ✨ 浮动粒子背景动画
- 🖼️ 图片模糊渐入展示效果
- 💾 localStorage 本地历史记录

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- npm
- ModelScope 账号（免费注册）

### 安装步骤

#### 1️⃣ 克隆项目

```bash
git clone https://github.com/fengzhixinlaoguo/text-to-image.git
cd text-to-image
```

#### 2️⃣ 安装依赖

```bash
npm install
```

#### 3️⃣ 获取 API Key

访问 [ModelScope](https://modelscope.cn/) 注册账号，在个人设置中获取 API Token（免费）。

#### 4️⃣ 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的 API Key：

```env
MODELSCOPE_API_KEY=你的ModelScope_Token
PORT=3000
```

#### 5️⃣ 启动服务

```bash
npm run dev
```

#### 6️⃣ 访问应用

打开浏览器访问：http://localhost:3000

看到页面即配置成功！🎉

## 📦 技术栈

| 技术 | 说明 |
|------|------|
| **后端** | Node.js + Express |
| **AI模型** | ModelScope Z-Image-Turbo (免费) |
| **前端** | 原生 HTML/CSS/JavaScript |
| **通信** | SSE (Server-Sent Events) |
| **存储** | localStorage 本地缓存 |

## 🎨 API 接口

### POST /api/generate

生成图片（SSE 流式响应）

**请求**：
```json
{
  "prompt": "A golden cat sitting on a moonlit rooftop"
}
```

**响应**：Server-Sent Events 流式推送

```
data: {"type":"status","message":"正在提交生成任务..."}
data: {"type":"status","message":"任务已提交，正在生成中..."}
data: {"type":"complete","message":"生成完成！","imageUrl":"https://..."}
```

## 🔐 安全说明

✅ API Key 存储在服务器端环境变量
✅ 前端无法访问 API Key
✅ 所有 AI 调用通过后端代理
✅ .env 文件已加入 .gitignore

**重要提示**：
- ❌ 不要将 `.env` 文件提交到 Git
- ❌ 不要在公开场合分享你的 API Key
- ✅ 定期更换 API Key 提高安全性

## 💰 费用说明

- Z-Image-Turbo 模型：**完全免费** 🆓
- 无需付费即可使用所有功能
- 适合个人和小型项目使用

## 🗺️ Roadmap

- [x] 基础文生图功能
- [x] SSE 实时进度推送
- [x] 历史记录
- [x] 图片下载
- [ ] 多种模型切换
- [ ] 图片尺寸/比例选择
- [ ] 提示词模板库
- [ ] 批量生成

## 📝 License

本项目采用 [MIT](./LICENSE) 许可证。

## ❓ 获取帮助

- 🐛 提交 [Issue](https://github.com/fengzhixinlaoguo/text-to-image/issues)
- 💬 关注公众号「风之馨老郭带你学AI」获取更多 AI 编程干货

## 🙏 致谢

- [ModelScope](https://modelscope.cn/) - 提供免费的 Z-Image-Turbo 模型
- 所有贡献者 - 感谢你们的付出

## ⭐ Star History

如果这个项目对你有帮助，请给个 Star ⭐️

---

<div align="center">

**用 ❤️ 制作，用 🤖 赋能**

[⬆ 回到顶部](#ai-文生图--text-to-image)

</div>
