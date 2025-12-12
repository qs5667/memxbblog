---
title: Uptime Kuma美化代码
published: 2025-11-01T10:12:16.000Z
description: '## 前言'
tags:
  - 随笔
category: 美化
draft: false
---
## 前言

各位好啊，好久没有发过啥文章了。并且距离上一个美化代码也快一年了，是时候该换个新样式了。

https://www.memxb.top/archives/402

然后最近用AI写了个Uptime Kuma的美化代码。整体的样式是bootstrap5的样式。(因为我觉得这个UI库确实比较好看)，那就来水篇文章顺便发个代码吧(bushi)

## CSS样式代码

    :root {
      --bs-white: #1a1d23;
      --bs-light: #2d3036;
      --bs-dark: #f8f9fa;
      --bs-blue: #4dabf7;
      --bs-primary: #4dabf7;
      --bs-primary-rgb: 77, 171, 247;
      --bs-success: #51cf66;
      --bs-danger: #ff6b6b;
      --bs-info: #339af0;
      --bs-body-bg: #12141c;
      --bs-border-color: #373b44;
      --bs-card-bg: #1a1d23;
      --bs-text-color: #f8f9fa;
      
      /* 蓝白主题变量 - 深色模式优化 */
      --bg-gradient: linear-gradient(135deg, #1e3a5f 0%, #12141c 100%);
      --card-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
      --card-hover-shadow: 0 8px 24px rgba(13, 110, 253, 0.3);
      --button-hover-bg: #339af0;
    }
    
    body {
      background-color: var(--bs-body-bg) !important;
      color: var(--bs-text-color);
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }
    
    /* 卡片样式 */
    .shadow-box {
      background: var(--bs-card-bg);
      border: 1px solid var(--bs-border-color);
      border-radius: 0.75rem;
      box-shadow: var(--card-shadow) !important;
      margin-top: 1rem !important;
    }
    
    .shadow-box:hover {
      box-shadow: var(--card-hover-shadow) !important;
    }
    
    /* 标题样式 */
    .title-flex {
      font-weight: 700;
      justify-content: center;
      color: var(--bs-primary);
    }
    
    .group-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--bs-primary);
      border-bottom: 2px solid var(--bs-primary);
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* 监控列表布局 */
    .monitor-list .monitor-list {
      min-height: 45px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .monitor-list .item {
      background: var(--bs-card-bg);
      border: 1px solid var(--bs-border-color);
      border-radius: 0.5rem;
      padding: 1rem;
    }
    
    .monitor-list .item:hover {
      background-color: #252932;
      border-color: var(--bs-primary);
    }
    
    .monitor-list .item .info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    
    /* 状态指示器 */
    .status-up {
      color: var(--bs-success) !important;
    }
    
    .status-down {
      color: var(--bs-danger) !important;
    }
    
    /* 按钮样式 */
    .btn-info {
      color: #ffffff;
      background-color: var(--bs-primary);
      border-color: var(--bs-primary);
      border-radius: 0.5rem;
      font-weight: 500;
    }
    
    .btn-info:hover {
      color: #ffffff;
      background-color: var(--button-hover-bg);
      border-color: var(--button-hover-bg);
    }
    
    /* 服务项目标题 */
    .item-name {
      font-weight: 600;
    }
    
    a.item-name {
      color: var(--bs-primary);
      text-decoration: none !important;
    }
    
    a.item-name:hover {
      color: var(--button-hover-bg) !important;
    }
    
    /* 状态徽章 - 简化版，不干扰百分比显示 */
    .info .badge.rounded-pill {
      font-size: 0.75rem;
      padding: 0.35em 0.65em;
      min-width: auto;
    }
    
    .info .badge.rounded-pill.bg-primary {
      background-color: var(--bs-success) !important;
    }
    
    .info .badge.rounded-pill.bg-danger {
      background-color: var(--bs-danger) !important;
    }
    
    /* 响应式设计 */
    @media screen and (max-width: 768px) {
      .monitor-list .monitor-list {
        grid-template-columns: repeat(1, 1fr);
      }
      
      .group-title {
        font-size: 1.75rem;
      }
      
      .col-md-4, .col-md-8 {
        width: 100%;
        max-width: 100%;
      }
    }
    
    /* 底部样式 */
    footer[data-v-b8247e57] {
      margin: 2rem 0 1rem !important;
      padding-top: 1rem;
      border-top: 1px solid var(--bs-border-color);
      text-align: center;
    }
    
    /* 布局调整 */
    .col-md-4 {
      width: 50%;
    }
    
    .col-md-8 {
      max-width: 50%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }
    
    .mb-5 {
      margin-bottom: 2rem !important;
    }
    
    /* 隐藏原始复选框 */
    #ll-footer-toggle {
      display: none;
    }
    
    /* 针对Uptime Kuma深色模式的特殊调整 */
    .dark {
      --bs-white: #1a1d23 !important;
      --bs-body-bg: #12141c !important;
      --bs-dark: #f8f9fa !important;
    }
    
    /* 链接颜色优化 */
    a {
      color: var(--bs-primary);
    }
    
    a:hover {
      color: var(--button-hover-bg);
    }
    
    /* 确保状态图标颜色正确 */
    .info .bg-primary {
      background-color: var(--bs-success) !important;
    }
    
    .info .bg-danger {
      background-color: var(--bs-danger) !important;
    }
    
    /* 确保状态正常显示绿色 */
    .ok {
      color: var(--bs-success) !important;
    }

## 样式展示

![](https://www.memxb.top/wp-content/uploads/2025/11/1000009525-1-725x1024.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/11/1000009517-594x1024.jpg)

如果觉得不太好看的话，可以自己再让AI改改

## 补充和说明

如果你还没有状态页面，那么请去仪表盘处创建一个监测页面，然后点击 该状态页面-编辑状态页面-添加监控项目。

![](https://www.memxb.top/wp-content/uploads/2025/11/1000009531-1024x558.jpg)

如果你已经有一个状态页面，只需要点击 编辑状态页面-自定义CSS 处复制粘贴上面的美化代码即可。

![](https://www.memxb.top/wp-content/uploads/2025/11/1000009529-1024x547.jpg)

好了，教程到这里就结束了(好像啥也没说，不管了)。如果觉得有用，欢迎发个评论支持一下哦
