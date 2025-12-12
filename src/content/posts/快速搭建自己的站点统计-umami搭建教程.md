---
title: 快速搭建自己的站点统计！(umami搭建教程)
published: 2025-08-12T12:07:12.000Z
description: '## 起因'
tags:
  - 服务器
category: 未分类
draft: false
---
## 起因

前几天给我的站点换上了自己搭建的统计服务，因为之前听说51la在晚上会跳转颜色站点。前几周一直用的umami.is那边的统计服务。但是我觉得访问速度不够快索性就自己搭建了一个.

## 前言

简单讲一下用1panel搭建一个umami统计，再使用edgeone加速统计服务，这么久没更新，是不知道因为啥.(顺便也想水一篇文章 bushi)

## Umami介绍

(部分信息来自1panel)

### 简介

Umami 是 Google Analytics 的**简单、快速、注重隐私的替代方案**。您可以使用Umami来查看每个页面的浏览信息，更好的了解您的站点。

### 主要功能

· 实时数据监控：提供实时网站访问数据，包括访客数量、页面浏览量等

· 流量来源追踪：分析和显示网站访问流量的来源，包括搜索引擎、推荐网站等

· 地理位置分析：展示访客的地理位置分布情况，帮助了解用户所在地区分布

· 关键指标跟踪：提供关键指标如会话时长、页面停留时间等，帮助优化用户体验和网站内容

## Umami的部分优势

1.开源免费: Umami 是开源项目，用户可以免费使用和定制自己想要的功能。同时开源也能保证代码的安全性和隐私性。

2.交互友好:页面简单直观，使用和导航较为便利。

## ①安装1panel

以下是1panel官方的安装脚本如果没有安装docker，它会提示你安装。 \[如果安装遇到问题可以去查一下解决方法。(emm，docker安装那篇文章估计要拖有点久)\]

    bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"

## ②安装PostgreSQL

由于umami的运行需要一个数据库，所以需要去安装一个数据库，这里的数据库可以选择Mysql或者PostgreSQL，这里我就安装PostgreSQL。

直接搜索 **PostgreSQL** 安装即可。如果你不想搜索，可以去翻一下。

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004231.jpg)

建议:如果没有什么特殊的需求，建议关闭 端口外部访问 (在同一个服务器安装的应用不需要使用ip链接)  

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004233-1024x680.jpg)

这里的其他配置信息一般默认即可。

## ③安装Umami

直接搜索 Umami 然后安装即可。

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004235.jpg)

数据库服务这里要把MySQL改成PostgreSQL。

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004237-1024x558.jpg)

下面有两个选择:

1\. 如果你需要绑定域名(使用反代服务，那么就可以不用勾选端口外部访问)

2\. 如果你不使用反代服务(直接通过配置cdn的端口然后绑定域名 或者 不想用域名访问)那就勾选上端口外部访问。

其他信息都默认，然后安装即可。

## ④安装OpenResty (搭建反代服务)

如果你的博客站点是https(应该都是吧)，如果不使用cdn或者反代服务。使用默认的ip+端口是不行的，获取不到任何数据。

前往1panel的应用商店，找到 OpenResty 安装即可。\[**别忘了勾选端口外部访问**\]

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004267.jpg)

安装之后转到 网站-网站-创建网站 类型选择反向代理，输入你想要添加统计服务的域名。这里可以勾选 监听ipv6

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004261-1024x993.jpg)

代理地址的地方配置:

类型选择http，然后在右边的框填写 127.0.0.1:3000 也可以直接选择 应用-Umami都可以。

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004269-1024x786.jpg)

接着点击添加即可

## ⑥配置Cdn加速 (可选)

配置cdn可以加速统计站点。 因为cdn的添加方法基本都是大同小异，这里我就以edgeone为例子。

登录腾讯云的控制台，搜索edgeone。进入edgeone的控制台。

这里放一个国内站的链接:[https://console.cloud.tencent.com/edgeone](https://console.cloud.tencent.com/edgeone)

接着添加域名(如果没有添加的话)。这里由于我添加过了就不细讲了，如果有问题可以去搜索一下。 注:接入方式的话，如果你不希望托管到腾讯云的话请选择Cname接入方式

在操作处点击域名管理，进入到域名的管理页面。

然后去 **基础服务-域名服务-站点管理** 处添加一个和上面一样的域名即可。

配置建议:❶建议开启对ipv6的支持

❷在 回原配置-源站配置处填写你搭建Umami的服务器ip地址

❸回源协议和回源部分的其它配置默认即可

❹推荐模板可选可不选。(要选的话建议选择网站加速)加速域名的填写说明:

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004263.jpg)

添加之后去dns的解析商添加Cname解析即可。

配置指引:[https://cloud.tencent.com/document/product/1552/90434](https://cloud.tencent.com/document/product/1552/90434)

修改成功之后要等待第1次部署成功.

最后再配置一下域名证书即可，直接选择申请免费证书最省事，提交之后接着等待第2次部署成功。

免费证书添加方法:[https://cloud.tencent.com/document/product/1552/90437](https://cloud.tencent.com/document/product/1552/90437)

其他cdn提供商可以去看文档，或者去查找通用教程。

等到第2次部署成功之后就可以通过HTTPS访问统计服务啦，还能享受到cdn的加速！

## ⑥配置Umami

安装之后请使用默认账密登录:

    用户名：admin
    密码：umami

登录之后可以先更改Umami的语言在 语言(Language) 处搜索中文，点击之后即可修改。

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004239-1-1024x431.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004241.jpg)

更改完语言之后一定要记得修改用户名和密码(防止被别人登录)

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004271-866x1024.jpg)

接着来到 设置-网站 处添加网站

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004248-1024x444.jpg)

名字没有规定，然后域名不需要带https和/之类的，只需要输入域名即可例如www.memxb.top

添加之后去点击 编辑-跟踪代码 复制这里的跟着代码

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004247-1024x145.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004272-1024x463.jpg)

然后统计代码需要添加到网站的头部。

如果你和我一样使用的是Argon主题，那么添加在 页头脚本 处即可，或者通过插件插入页头代码即可。

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004252-1024x935.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004273-1024x630.jpg)

总之添加上即可，如果你不清楚你在使用的主题的添加方法，可以去必应搜索对应的添加方法。

## ⑦大功告成

添加成功之后，在 **设置-查看** 即可看到自己的站点流量啦。

![](https://www.memxb.top/wp-content/uploads/2025/08/1000004258-1024x895.jpg)

如果并没有显示，则可能是:

\_1.添加统计时域名填写不正确

\_2.网站是https，统计服务http则无法使用

\_3.代码没有正确添加到头部或者添加不正确。

如果你添加的时候并没有显示数据，请你仔细检查有没有以上问题，如果找不到问题可以发在评论区，我会尽量帮助解决。

好啦，Umami的搭建教程到这里就结束了。不愧是我，又水了一篇文章呢(bushi

感谢看到这里，我们下一篇文章见
