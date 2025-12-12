---
title: 如何美化uptime kuma(水文章)
published: 2024-12-07T08:51:59.000Z
description: '## 前言'
tags: []
category: 未分类
draft: false
---
## 前言

最近因为手头有点富裕了，所以去土云把之前老板给我那台机器拿来当副主机来用了，先是安装了1panel，然后直接装了uptimekuma。这个是我美化后的图

![](https://www.memxb.top/wp-content/uploads/2024/12/IMG_20241207_164834.jpg)

## 方法(代码)

接下来是美化代码，这个代码是我用ai写的，需要的可以自取

    body {    background-color: #f5f7fa; /* 浅背景色 */    color: #333; /* 字体颜色 */    font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif; /* 使用中文字体 */    margin: 20px; /* 页面边距 */}h1, h2 {    color: #4a90e2; /* 标题颜色 */    font-size: 24px; /* 标题字体大小 */    margin-bottom: 15px; /* 标题下边距 */}.service-container {    background-color: #ffffff; /* 服务容器背景 */    border-radius: 10px; /* 圆角效果 */    padding: 20px; /* 内边距 */    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */    margin-bottom: 20px; /* 外边距 */}.service-item {    display: flex;    justify-content: space-between;    align-items: center;    padding: 10px 0; /* 每个服务项的内边距 */    border-bottom: 1px solid #eaeaea; /* 分隔线 */    overflow: hidden; /* 防止溢出 */}.service-item:last-child {    border-bottom: none; /* 去掉最后一个项的分隔线 */}.service-name {    font-weight: bold; /* 加粗 */    white-space: nowrap; /* 防止换行 */    overflow: hidden; /* 防止溢出 */    text-overflow: ellipsis; /* 超出部分用省略号表示 */}.status-indicator {    color: #2ecc71; /* 状态指示器颜色 */}.progress {    background-color: #e0e0e0; /* 进度条背景 */    border-radius: 15px; /* 圆角进度条 */    height: 10px; /* 进度条高度 */    flex-grow: 1; /* 进度条占据剩余空间 */    margin-left: 10px; /* 左边距 */}.progress-bar {    background-color: #4caf50; /* 进度条颜色 */    height: 100%; /* 进度条高度 */    border-radius: 15px; /* 圆角效果 */}/* 小组件的样式 */.widget {    background-color: #ffffff; /* 小组件背景 */    border-radius: 10px;    padding: 15px; /* 内边距 */    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */}

这个代码在你添加状态页之后复制进自定义css即可

![](https://www.memxb.top/wp-content/uploads/2024/12/Screenshot_2024-12-07-16-50-55-13_df198e732186825c8df26e3c5a10d7cd.jpg)

这个纯属没事更新的文章，有不足欢迎在评论区讨论！
