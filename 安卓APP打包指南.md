# 绘梦板 - 安卓APP打包指南

## 方案一：HBuilderX（推荐，最简单）⭐

**适合人群**：编程新手，不需要复杂配置，快速生成APK

### 准备工作
1. 下载 HBuilderX：https://www.dcloud.io/hbuilderx.html
2. 选择 "App开发版" 下载安装

### 操作步骤

#### 第1步：生成应用图标
打开 `generate-app-icons.html` 文件，点击"下载全部图标"按钮，保存所有图标到一个文件夹。

#### 第2步：在HBuilderX中新建项目
1. 打开 HBuilderX
2. 文件 → 新建 → 项目
3. 选择 "5+App" → 输入项目名称（如："绘梦板"）
4. 点击"创建"

#### 第3步：替换项目文件
1. 删除新建项目中的默认文件
2. 将 `index.html` 和所有用到的资源文件复制到项目根目录
3. 确保入口文件是 `index.html`

#### 第4步：配置应用信息
打开 `manifest.json` 文件，配置以下内容：

```json
{
    "name" : "绘梦板",
    "appid" : "__UNI__XXXXXXX",
    "description" : "一款治愈系IP板绘创作应用",
    "versionName" : "1.0.0",
    "versionCode" : "100",
    "icons" : {
        "android" : {
            "mdpi" : "icons/mdpi.png",
            "hdpi" : "icons/hdpi.png",
            "xhdpi" : "icons/xhdpi.png",
            "xxhdpi" : "icons/xxhdpi.png",
            "xxxhdpi" : "icons/xxxhdpi.png"
        }
    },
    "splashscreen" : {
        "waiting" : false
    }
}
```

#### 第5步：设置应用图标
1. 在项目根目录创建 `icons` 文件夹
2. 将之前下载的图标分别放入对应文件
3. 在 manifest.json 的 "图标配置" 中设置启动图标

#### 第6步：云打包生成APK
1. 点击菜单：发行 → 原生App-云打包
2. 选择 Android 平台
3. 配置签名信息：
   - 首次使用可以选择"使用公用证书"
   - 或者自己生成签名证书（正式发布建议）
4. 点击"打包"
5. 等待打包完成（通常需要几分钟）
6. 下载生成的 APK 文件

### 优点
- ✅ 操作简单，图形化界面
- ✅ 免费云打包，不需要安装Android Studio
- ✅ 支持离线打包（需要安装Android SDK）

### 缺点
- ❌ 免费版有打包次数限制
- ❌ 启动画面有广告（可以付费去除）

---

## 方案二：Capacitor（推荐，开发者友好）⭐⭐

**适合人群**：有一定编程基础，希望更灵活的控制

### 准备工作
1. 安装 Node.js：https://nodejs.org/
2. 安装 Android Studio：https://developer.android.com/studio
3. 安装 JDK 11 或更高版本

### 操作步骤

#### 第1步：构建Web应用
```bash
# 进入项目目录
cd 你的项目路径

# 安装依赖（如果还没有安装）
npm install

# 构建生产版本
npm run build
```

#### 第2步：安装Capacitor
```bash
# 安装Capacitor核心包
npm install @capacitor/core @capacitor/cli @capacitor/android

# 初始化Capacitor
npx cap init "绘梦板" "com.huimengban.app" --web-dir=dist
```

#### 第3步：添加Android平台
```bash
npx cap add android
```

#### 第4步：复制应用图标
将之前生成的图标复制到对应目录：
```
android/app/src/main/res/
├── mipmap-mdpi/ic_launcher.png          (48x48)
├── mipmap-hdpi/ic_launcher.png          (72x72)
├── mipmap-xhdpi/ic_launcher.png         (96x96)
├── mipmap-xxhdpi/ic_launcher.png        (144x144)
└── mipmap-xxxhdpi/ic_launcher.png       (192x192)
```

也可以使用Android Studio的Image Asset工具：
1. 在Android Studio中打开项目
2. 右键 app → New → Image Asset
3. 选择 Launcher Icons
4. 选择你的512x512图标
5. 自动生成所有尺寸

#### 第5步：同步并构建
```bash
# 同步Web资源到Android项目
npx cap sync

# 打开Android Studio
npx cap open android
```

#### 第6步：生成APK
在Android Studio中：
1. 等待项目加载完成
2. Build → Build Bundle(s) / APK(s) → Build APK(s)
3. 等待构建完成
4. 点击通知中的 "locate" 找到APK文件
5. APK路径：`android/app/build/outputs/apk/debug/app-debug.apk`

### 优点
- ✅ 完全免费，无限制
- ✅ 功能强大，可扩展原生插件
- ✅ 可以上架应用商店

### 缺点
- ❌ 需要安装Android Studio（占用空间较大）
- ❌ 需要一定的技术基础

---

## 方案三：PWA（渐进式Web应用）⭐⭐⭐

**适合人群**：不想安装APP，想要"添加到主屏幕"的体验

### 准备工作
只需要修改现有项目，不需要额外工具

### 操作步骤

#### 第1步：生成PWA图标
打开 `generate-app-icons.html` 下载图标，保存到 `public/icons` 目录

需要的尺寸：
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

#### 第2步：创建 manifest.webmanifest
在 `public` 目录下创建 `manifest.webmanifest` 文件：

```json
{
  "name": "绘梦板 - IP板绘创作工具",
  "short_name": "绘梦板",
  "description": "一款治愈系IP板绘创作应用",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fde1f3",
  "theme_color": "#fde1f3",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

#### 第3步：在index.html中添加引用
在 `<head>` 标签中添加：

```html
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#fde1f3">
<link rel="apple-touch-icon" href="/icons/icon-152.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="绘梦板">
```

#### 第4步：添加 Service Worker（可选，用于离线访问）
在 `public` 目录下创建 `sw.js`：

```javascript
const CACHE_NAME = 'huimengban-cache-v1';
const urlsToCache = ['/', '/index.html'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

在index.html底部注册Service Worker：

```html
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => console.log('SW registered'))
    .catch(error => console.log('SW registration failed:', error));
}
</script>
```

#### 第5步：部署网站
PWA需要HTTPS环境才能正常工作。可以部署到：
- Vercel (免费)：https://vercel.com
- Netlify (免费)：https://netlify.com
- GitHub Pages (免费)
- 自己的服务器（需要HTTPS证书）

#### 第6步：在手机上安装
1. 用手机Chrome浏览器打开网站
2. 点击菜单 → "安装应用" 或 "添加到主屏幕"
3. 桌面上就会出现应用图标
4. 点击图标即可像APP一样打开

### 优点
- ✅ 完全免费，零成本
- ✅ 不需要应用商店，随时更新
- ✅ 跨平台，iOS和Android都能用
- ✅ 安装包小，几乎不占空间

### 缺点
- ❌ 需要HTTPS环境
- ❌ 不能上架应用商店
- ❌ 部分原生功能无法调用

---

## 三种方案对比

| 特性 | HBuilderX | Capacitor | PWA |
|------|-----------|-----------|-----|
| 难度 | ⭐ 简单 | ⭐⭐⭐ 较难 | ⭐⭐ 中等 |
| 成本 | 免费（有限制） | 完全免费 | 完全免费 |
| 是否需要安装工具 | 是（HBuilderX） | 是（Android Studio） | 否 |
| 能否上架应用商店 | 能 | 能 | 不能 |
| 离线使用 | 支持 | 支持 | 支持 |
| 应用商店分发 | 支持 | 支持 | 不支持 |
| 更新方式 | 重新打包 | 重新打包 | 自动更新 |
| 推荐指数 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 我的推荐

**如果你是新手，想快速看到效果**：选择 **方案一 HBuilderX**
- 操作最简单，图形化界面
- 免费云打包，不需要配置环境
- 适合课程作业展示

**如果你想学习安卓开发**：选择 **方案二 Capacitor**
- 更专业，功能更强大
- 可以学到原生开发知识
- 适合长期维护的项目

**如果你只是想在手机上用**：选择 **方案三 PWA**
- 不需要打包，部署即用
- 跨平台，iOS也能用
- 最轻便的方案

---

## 应用图标说明

应用图标使用游客头像的设计：
- 背景：粉色渐变（#fde1f3 → #fbc8e0）
- 主体：白色圆形 + 蓝色简笔画脸
- 元素：竖线眼睛、圆点鼻子、粉色腮红
- 顶部：两只可爱的小耳朵

打开 `generate-app-icons.html` 可以预览和下载所有尺寸的图标。

---

## 常见问题

### Q: APK安装到手机时提示"未知来源"怎么办？
A: 打开手机设置 → 安全 → 允许安装未知来源应用

### Q: 如何上架应用商店？
A: 
- 小米应用商店、华为应用市场等国内商店需要注册开发者账号
- Google Play需要25美元注册费
- 上架需要软著等资质

### Q: 数据会丢失吗？
A: 数据存在本地，卸载应用会丢失。建议导出重要作品备份。

### Q: 可以加广告赚钱吗？
A: 可以集成穿山甲、优量汇等广告平台SDK，需要在原生层实现。
