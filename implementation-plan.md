# EUPRO 欧诺包装官网 - 前端实现规划文档

---

## 一、项目概述

### 1.1 项目信息
| 项目 | 详情 |
|------|------|
| 项目名称 | EUPRO 欧诺包装官网 |
| 页面类型 | 营销策略落地页（单页应用） |
| 设计风格 | 极简现代主义 / B2B专业风格 |
| 主色调 | 品牌绿 `#00C853` + 黑白灰中性色 |

### 1.2 设计稿核心要素
- **板块数量**: 8个主要区域（导航+Hero+核心理念+服务+竞争力+价值主张+CTA+页脚）
- **交互复杂度**: 中等（手风琴、固定导航、悬停效果）
- **图片资源**: 产品摄影6张+图标系统+装饰元素

---

## 二、技术方案

### 2.1 REM 适配方案

#### 基准设定
```css
/* 设计稿基准: 1920px 下 1rem = 100px */
/* 核心公式: rem = 设计稿像素值 / 100 */

/* 根元素字体大小设置 */
html {
  /* PC端基准 (1920px设计稿) */
  font-size: 100px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  html {
    font-size: calc(100vw / 7.5); /* 750px设计稿基准 */
  }
}

/* 平板适配 */
@media screen and (min-width: 769px) and (max-width: 1200px) {
  html {
    font-size: calc(100vw / 12);
  }
}
```

#### REM 转换规则
| 设计稿值 | REM值 | 适用场景 |
|---------|-------|---------|
| 16px | 0.16rem | 正文文字 |
| 24px | 0.24rem | 副标题 |
| 40px | 0.40rem | 大标题 |
| 1200px | 12rem | 内容区最大宽度 |
| 24px圆角 | 0.24rem | 按钮圆角 |

### 2.2 响应式断点设计

```scss
// 断点定义 (Mobile First)
$breakpoints: (
  'xs': 320px,    // 小型手机
  'sm': 576px,    // 大型手机
  'md': 768px,    // 平板竖屏
  'lg': 992px,    // 平板横屏/小型笔记本
  'xl': 1200px,   // 标准桌面
  'xxl': 1400px,  // 大屏桌面
  'xxxl': 1920px  // 超大屏
);

// 媒体查询混合宏
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}
```

#### 各断点布局策略

| 断点 | 布局变化 | 关键调整 |
|------|---------|---------|
| < 576px | 单栏堆叠 | 导航变汉堡菜单，侧边栏隐藏，卡片单列 |
| 576-768px | 单栏+部分双栏 | Hero文字上图片下，服务区域单列 |
| 768-992px | 双栏为主 | 导航展开，服务区域双栏，卡片双列 |
| 992-1200px | 标准桌面 | 完整布局，12列网格 |
| > 1200px | 大屏优化 | 固定1200px内容区，两侧留白扩展 |

### 2.3 CSS 架构 - BEM 命名规范

#### 命名约定
```
.block                    /* 块 */
.block__element           /* 元素 */
.block--modifier          /* 修饰符 */
.block__element--modifier /* 元素修饰符 */
```

#### 目录结构
```
scss/
├── base/                  # 基础样式
│   ├── _reset.scss       # CSS Reset
│   ├── _variables.scss   # 变量定义
│   ├── _mixins.scss      # 混合宏
│   ├── _typography.scss  # 排版基础
│   └── _utilities.scss   # 工具类
├── components/           # 组件样式
│   ├── _button.scss
│   ├── _card.scss
│   ├── _accordion.scss
│   ├── _nav.scss
│   └── _icon.scss
├── layout/              # 布局样式
│   ├── _grid.scss
│   ├── _header.scss
│   ├── _footer.scss
│   └── _sidebar.scss
├── sections/            # 页面区块
│   ├── _hero.scss
│   ├── _service.scss
│   ├── _competence.scss
│   ├── _value.scss
│   └── _cta.scss
└── main.scss           # 入口文件
```

#### 关键类名示例
```scss
// 按钮组件
.btn { }
.btn--primary { }        // 绿色主按钮
.btn--large { }          // 大尺寸
.btn__icon { }           // 按钮内图标

// 服务卡片
.service-card { }
.service-card__image { }
.service-card__content { }
.service-card--active { } // 展开状态

// 导航
.main-nav { }
.main-nav__menu { }
.main-nav__item { }
.main-nav__item--active { }
```

### 2.4 技术栈选择

| 层级 | 技术 | 说明 |
|------|------|------|
| 构建工具 | Vite 5.x | 快速开发服务器，支持SCSS |
| CSS预处理器 | SCSS | 变量、嵌套、混合宏 |
| CSS后处理 | PostCSS + Autoprefixer | 自动前缀、rem转换 |
| JavaScript | 原生 ES6+ | 无框架，轻量高效 |
| 图标 | SVG Sprite | 内联SVG，可变色 |
| 图片处理 | 响应式图片 srcset | 多分辨率适配 |

---

## 三、文件结构

### 3.1 目录组织

```
eupro-website/
├── public/                    # 静态资源
│   ├── images/               # 图片资源
│   │   ├── hero/
│   │   ├── products/
│   │   ├── icons/
│   │   └── decorative/
│   └── fonts/                # 字体文件
├── src/
│   ├── assets/               # 编译资源
│   │   ├── scss/
│   │   │   ├── base/
│   │   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── sections/
│   │   │   └── main.scss
│   │   ├── js/
│   │   │   ├── modules/
│   │   │   │   ├── accordion.js
│   │   │   │   ├── navigation.js
│   │   │   │   ├── scrollspy.js
│   │   │   │   └── lazyload.js
│   │   │   └── main.js
│   │   └── icons/            # SVG图标
│   ├── index.html
│   └── partials/             # HTML片段（可选）
├── dist/                     # 构建输出
├── .editorconfig
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

### 3.2 HTML/CSS/JS 分离策略

#### HTML 结构原则
```html
<!-- 语义化标签 -->
<body>
  <header class="main-header">...</header>
  
  <main>
    <section id="hero" class="section section--hero">...</section>
    <section id="service" class="section section--service">...</section>
    <!-- ... -->
  </main>
  
  <footer class="main-footer">...</footer>
</body>
```

#### CSS 加载策略
```scss
// main.scss - 入口文件组织

// 1. 变量和工具（无输出）
@import 'base/variables';
@import 'base/mixins';

// 2. 基础重置
@import 'base/reset';

// 3. 排版和工具
@import 'base/typography';
@import 'base/utilities';

// 4. 布局
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';

// 5. 组件
@import 'components/button';
@import 'components/card';
@import 'components/accordion';
@import 'components/nav';
@import 'components/icon';

// 6. 页面区块
@import 'sections/hero';
@import 'sections/service';
@import 'sections/competence';
@import 'sections/value';
@import 'sections/cta';
```

#### JS 模块化策略
```javascript
// main.js - 入口文件
import { Accordion } from './modules/accordion.js';
import { Navigation } from './modules/navigation.js';
import { ScrollSpy } from './modules/scrollspy.js';
import { LazyLoader } from './modules/lazyload.js';

document.addEventListener('DOMContentLoaded', () => {
  // 初始化导航
  new Navigation('.main-nav');
  
  // 初始化手风琴
  new Accordion('.service-accordion');
  
  // 初始化滚动监听
  new ScrollSpy('.sidebar-nav');
  
  // 初始化懒加载
  new LazyLoader('[data-lazy]');
});
```

---

## 四、实现优先级

### 4.1 开发阶段划分

#### Phase 1: 基础搭建 (Day 1)
- [ ] 项目初始化（Vite + SCSS配置）
- [ ] REM适配方案实现
- [ ] 基础变量和混合宏定义
- [ ] CSS Reset和基础排版
- [ ] 响应式网格系统

#### Phase 2: 布局框架 (Day 2)
- [ ] Header导航组件
- [ ] Footer页脚组件
- [ ] Sidebar侧边栏导航
- [ ] 通用容器和间距工具

#### Phase 3: 核心组件 (Day 3)
- [ ] Button按钮组件（多尺寸、多状态）
- [ ] Card卡片组件
- [ ] Accordion手风琴组件
- [ ] Icon图标系统（SVG Sprite）

#### Phase 4: 页面区块 (Day 4-5)
按视觉层级从上到下依次实现：

| 优先级 | 板块 | 预估工时 | 关键要点 |
|-------|------|---------|---------|
| P0 | Hero首屏 | 4h | 左文右图布局、大标题、CTA |
| P0 | 导航栏 | 3h | 固定定位、移动端汉堡菜单 |
| P1 | 核心主张区 | 2h | 大标题+说明文字 |
| P1 | 服务展示区 | 6h | 手风琴交互、双栏布局 |
| P1 | 差异化竞争力区 | 4h | 图文混排、图标系统 |
| P2 | 价值主张区 | 4h | 四列卡片、流程指示器 |
| P2 | CTA区域 | 2h | 背景装饰、居中布局 |
| P2 | 页脚 | 3h | 三列布局、社交图标 |

#### Phase 5: 交互增强 (Day 6)
- [ ] 滚动监听高亮当前板块
- [ ] 平滑滚动到锚点
- [ ] 图片懒加载
- [ ] 悬停动效

#### Phase 6: 响应式适配 (Day 7)
- [ ] 移动端导航菜单
- [ ] 各断点布局调整
- [ ] 触摸设备优化
- [ ] 图片响应式适配

### 4.2 详细实现顺序

```
Day 1: 环境 + 基础
├── 项目初始化
├── SCSS架构搭建
├── 变量系统（颜色、字体、间距）
└── 网格系统实现

Day 2: 布局组件
├── Header（固定导航）
├── Footer（页脚）
└── Sidebar（侧边栏）

Day 3: 通用组件
├── Button（按钮系统）
├── Accordion（手风琴）
├── Card（卡片）
└── Icon（图标系统）

Day 4: 上屏内容
├── Hero区域
├── 核心主张区
└── 服务展示区（上）

Day 5: 下屏内容
├── 服务展示区（下）
├── 差异化竞争力区
├── 价值主张区
└── CTA + Footer

Day 6: 交互
├── 导航交互
├── 手风琴交互
├── 滚动效果
└── 图片懒加载

Day 7: 响应式
├── 移动端导航
├── 各断点调试
└── 性能优化
```

---

## 五、质量保障

### 5.1 像素级还原检查清单

#### 布局精度检查
- [ ] 内容区最大宽度 1200px（12rem）
- [ ] 各板块间距与设计稿一致（参考px转rem表）
- [ ] 网格对齐（12列系统）
- [ ] 文字基线对齐

#### 视觉元素检查
| 检查项 | 标准 | 工具 |
|-------|------|------|
| 颜色值 | 使用取色器核对 #00C853 等品牌色 | Figma/Pixie |
| 字体大小 | 按 rem 值换算核对 | 浏览器 DevTools |
| 行高 | 1.6-1.8 倍基准 | DevTools |
| 间距 | padding/margin 精确到 rem | DevTools |
| 圆角 | 按钮 0.24rem (24px) | DevTools |
| 阴影 | 如有，核对模糊度和偏移 | DevTools |

#### 图片资源检查
- [ ] Hero区商务场景图
- [ ] 黑色电子产品包装盒图
- [ ] "Hello"灰色包装盒图
- [ ] 立体堆叠白色包装盒图
- [ ] CTA区包装盒线稿装饰
- [ ] 所有图片压缩优化（WebP格式）

#### 图标系统检查
- [ ] 绿色星号装饰图标
- [ ] 服务项箭头图标（↑↓↕）
- [ ] 竞争力区三项能力图标
- [ ] 价值主张区四个图标
- [ ] 页脚社交媒体图标

### 5.2 响应式测试方案

#### 测试设备矩阵

| 设备类型 | 分辨率 | 优先级 | 测试要点 |
|---------|-------|-------|---------|
| iPhone SE | 375×667 | P0 | 最小屏适配 |
| iPhone 14 | 390×844 | P0 | 主流手机 |
| iPhone 14 Pro Max | 430×932 | P0 | 大屏手机 |
| iPad Mini | 768×1024 | P1 | 小平板 |
| iPad Air | 820×1180 | P1 | 中平板 |
| MacBook Air | 1280×800 | P0 | 笔记本 |
| Desktop | 1920×1080 | P0 | 标准桌面 |
| Desktop HD | 2560×1440 | P1 | 大屏桌面 |

#### 测试检查项

**移动端 (< 768px)**
- [ ] 汉堡菜单正常展开/收起
- [ ] 侧边栏导航隐藏
- [ ] 所有板块单栏堆叠
- [ ] 文字大小可读（不小于12px）
- [ ] 按钮触摸区域 ≥ 44×44px
- [ ] 图片比例正确，不拉伸

**平板 (768px - 991px)**
- [ ] 导航完整显示
- [ ] 服务区域双栏布局
- [ ] 价值主张卡片双列
- [ ] 适当的留白空间

**桌面 (≥ 992px)**
- [ ] 完整布局显示
- [ ] 侧边栏导航固定
- [ ] 所有交互元素可用
- [ ] 1200px内容区居中

### 5.3 性能检查清单

- [ ] 首屏加载时间 < 3s（3G网络）
- [ ] 所有图片使用懒加载
- [ ] CSS/JS 压缩
- [ ] 关键CSS内联（可选）
- [ ] 字体使用 font-display: swap
- [ ] 无布局抖动（CLS < 0.1）

### 5.4 浏览器兼容性

| 浏览器 | 版本 | 支持级别 |
|-------|------|---------|
| Chrome | 最新2版 | A级 |
| Safari | 最新2版 | A级 |
| Firefox | 最新2版 | A级 |
| Edge | 最新2版 | A级 |
| IE11 | - | 不支持 |

### 5.5 验收标准

#### 功能验收
- [ ] 所有链接可点击
- [ ] 手风琴展开/收起正常
- [ ] 导航锚点跳转正常
- [ ] 表单验证（如有）正常
- [ ] 无JavaScript错误

#### 视觉验收
- [ ] 与设计稿对比相似度 ≥ 95%
- [ ] 无明显的像素偏差
- [ ] 颜色一致
- [ ] 字体渲染清晰
- [ ] 图片清晰无压缩痕迹

#### 代码质量
- [ ] BEM命名规范统一
- [ ] 无冗余CSS
- [ ] JS模块化合理
- [ ] 注释清晰
- [ ] 通过 W3C HTML/CSS验证

---

## 六、附录

### 6.1 REM转换参考表

| 设计稿(px) | REM值 | 用途 |
|-----------|-------|------|
| 12 | 0.12 | 小标签文字 |
| 14 | 0.14 | 辅助文字 |
| 16 | 0.16 | 正文 |
| 18 | 0.18 | 导航文字 |
| 20 | 0.20 | 小标题 |
| 24 | 0.24 | 副标题 |
| 32 | 0.32 | 板块标题 |
| 40 | 0.40 | Hero大标题 |
| 8 | 0.08 | 小间距 |
| 16 | 0.16 | 中间距 |
| 24 | 0.24 | 大间距 |
| 32 | 0.32 | 板块内间距 |
| 64 | 0.64 | 板块间间距 |
| 1200 | 12.00 | 内容区最大宽度 |

### 6.2 颜色变量定义

```scss
// _variables.scss

// 品牌色
$color-primary: #00C853;
$color-primary-hover: #00B34A;
$color-primary-light: #E6F9ED;

// 中性色
$color-black: #1A1A1A;
$color-gray-900: #333333;
$color-gray-600: #666666;
$color-gray-400: #999999;
$color-gray-200: #E5E5E5;
$color-gray-100: #F5F5F5;
$color-white: #FFFFFF;

// 功能色
$color-text-primary: $color-black;
$color-text-secondary: $color-gray-600;
$color-text-tertiary: $color-gray-400;
$color-bg-primary: $color-white;
$color-bg-secondary: $color-gray-100;
$color-bg-dark: $color-black;
```

### 6.3 字体规范

```scss
// _typography.scss

$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;

// 字号映射
$font-sizes: (
  'xs': 0.12rem,    // 12px
  'sm': 0.14rem,    // 14px
  'base': 0.16rem,  // 16px
  'lg': 0.18rem,    // 18px
  'xl': 0.20rem,    // 20px
  '2xl': 0.24rem,   // 24px
  '3xl': 0.32rem,   // 32px
  '4xl': 0.40rem,   // 40px
);

// 行高
$line-height-tight: 1.25;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;
```

---

## 七、风险与应对

| 风险 | 影响 | 应对方案 |
|------|------|---------|
| 设计稿图片质量不足 | 高 | 提前确认图片资源，准备替代方案 |
| 手风琴交互动效复杂 | 中 | 先实现基础功能，再优化动效 |
| 移动端布局变化大 | 中 | 优先实现桌面端，再适配移动端 |
| 字体版权问题 | 低 | 使用系统字体栈，避免商用字体 |
| IE11兼容需求 | 低 | 明确不支持IE11，使用Modernizr检测 |

---

**文档版本**: v1.0  
**创建日期**: 2026-02-06  
**最后更新**: 2026-02-06  
**文档状态**: 待评审
