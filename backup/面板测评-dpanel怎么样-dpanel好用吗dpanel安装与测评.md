---
title: 面板测评-Dpanel怎么样，Dpanel好用吗?Dpanel安装与测评
published: 2025-07-05T01:31:20.000Z
description: '## 前言'
tags:
  - Dpanel
  - 服务器
  - 服务器面板
  - 评测
  - 面板
category: 未分类
draft: false
---
## 前言

啊哈哈哈，终于有空更新Dpanel了，额拖得有一点点久，暑假了就好更新了。

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-09-09-50-33_df198e732186825c8df26e3c5a10d7cd-597x1024.jpg)

啊电脑被我玩坏了所以我只能用手机更新了

正好Dpanel现在已经更新了好几个版本了，我的uptimekuma的服务器也才1.6.2，那就让我们看看uptimekuma的最新版本怎么样吧！

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-09-08-59-63_df198e732186825c8df26e3c5a10d7cd-599x1024.jpg)

## 安装

### 安装Docker

这边推荐一个我经常用的docker安装脚本，你可以使用在线脚本安装。

    curl -O https://mirrors.8465.cn/docker.sh && chmod +x docker.sh && ./docker.sh

然后他会问你软件园是否使用http，这个可以随便选(我选的是第二个)。接着他会问你是否安装最新版，建议选是。

![](https://www.memxb.top/wp-content/uploads/2025/07/IMG_20250705_091904-843x1024.jpg)

接着他问你是安装最新版Docker Engine，这里建议显示。然后一直等直到他安装成功。如果这个脚本用不了，可以去网上找其他的脚本。实在不行可以找手动安装的方法。

### 配置镜像源(可选)

如果你的服务器是在国外的话(香港美国等等)，可以直接跳到下面的安装Dpanel。如果你的服务器在中国境内，建议你配置一下镜像源，不然后续可能会出现无法拉取docker镜像的问题。

推荐镜像站

    https://docker.1panel.live/
    https://docker.xuanyuan.me

### 安装Dpanel

这边有两个版本。一个是标准版，标准版是提供了域名绑定及证书功能，需要绑定 80 及 443 端口。如果你不需要安装Lite版即可。

标准版

    docker run -d --name dpanel --restart=always \ -p 80:80 -p 443:443 -p 8807:8080 \ -v /var/run/docker.sock:/var/run/docker.sock \ -v /home/dpanel:/dpanel -e APP_NAME=dpanel dpanel/dpanel:latest

Lite版

    docker run -d --name dpanel --restart=always \ -p 8807:8080 -e APP_NAME=dpanel \ -v /var/run/docker.sock:/var/run/docker.sock \ -v /home/dpanel:/dpanel dpanel/dpanel:lite

回车之后就可以等待他拉取dpanel镜像了，注意这个时候不要退出ssh，需要保持ssh窗口处于活跃状态。

### 开启安全组端口或端口转发。

1.如果你使用的是云服务器，那么请到云服务商的安全组里开放**TCP协议的8807端口**。(有些小厂的服务商可能没有安全组，如果你没有看到的话，那就直接访问即可)。接着在浏览器里输入你的IP+8807即可进入Dpanel管理面板。

2.如果你使用的是NAT服务器，那么需要找到类似于端口转发的字样进入nat端口转发。

![](https://www.memxb.top/wp-content/uploads/2025/07/IMG_20250705_155901-1024x580.jpg)

接着是添加一个转发策略。名称可以随便填，没有要求，但是建议填写Dpanel，后续维护可以更方便一点。(服务器)端口就填**8807**，接着点击添加即可。

有些厂商可能会有对等分配或者不对等分配这两个选项，建议选择不对等分配，协议类型这边建议只选tcp，如果没得选，那就选tcp+udp。如果只有udp那么就去找服务商。

![](https://www.memxb.top/wp-content/uploads/2025/07/IMG_20250705_155916.jpg)

接着同样输入这台机器的IP+转发后的端口即可进入Dpanel管理面板。(即外网地址+外网端口，每家都是差不多的操作。)

Dpanel网页可能加载会较慢，等待一下就行。

### 配置管理员

在你首次登陆的时候，他会提示你配置管理管账号即密码。进行配置就行(应该大概不会有人不知道怎么配置吧？e)。

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-16-07-46-36_df198e732186825c8df26e3c5a10d7cd-1024x876.jpg)

接着就会进入到主页。你也会卡一阵子，这是正常现象(这是说正常还是不正常?😂)

接着你就会进入到Dpanel的主页。

## 评价

Gui还有点小清新的风格。(这样形容应该没错)

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-16-14-01-19_df198e732186825c8df26e3c5a10d7cd-594x1024.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-16-15-17-29_df198e732186825c8df26e3c5a10d7cd-522x1024.jpg)

整个面板流畅度还是挺不错的，只有在第一次进入的时候可能要加载一会儿。(啊，好像每次加载都一样。)

当然如果你不在意加载速度的话，确实可以用Dpanel。因为它的占用确实是比较小，况且界面也比较优美。

左边的菜单分布算是比较清晰吧。可能刚用的时候会摸不清头脑。

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-16-19-55-24_df198e732186825c8df26e3c5a10d7cd-166x1024.jpg)

有点可惜的是快捷访问竟然是pro版本的用户才能使用，我觉得这个嘛应该是要让普通用户也能用，毕竟这个可以提高访问效率。反正我觉得这个功能对于免费用户来说，可有可无。(没有这个好像也没有什么大问题。)

再来看看容器的创建页面怎么样？嗯，可自定义的选项确实比较多。

![](https://www.memxb.top/wp-content/uploads/2025/07/IMG_20250705_162504-344x1024.jpg)

但是又带来了另一个问题: 如果我只想简单创建个容器，岂不是都要把它都配置一遍? NO NO NO，如果不是你自己制作的容器，一般都会有docker compose，即任务编排。用这个东西很快就能创建完成，而且不用经过一个个繁琐的配置。

我们可以在Dpanel的菜单 Compose➡创建任务 中可以添加一个compose编排，在 Compose➡任务管理 中可以找的你刚刚创建的编排。是不是非常银杏性化呢?)

因为Dpanel还有应用商店，啊，所以这个东西啊一般都不用，除非在各大的面板应用商店都找不到的东西才需要编排。况且有些甚至你可以直接用一条docker run指令就能解决。

既然Dpanel是管理docker容器的，那就让我们看看容器管理都有什么东西吧！

上面的创建容器已经讲过一遍了，所以我们就直接到第二个 - 容器管理

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-16-38-59-35_df198e732186825c8df26e3c5a10d7cd-1024x465.jpg)

这个容器管理界面可谓是非常的漂亮，占用率下边还有两个图标，展示就比之前更直观了。(旧版本是没有这两个，只有两个数字在下边)

接着往右边滑还可以看到容器的运行状态，镜像名称，还有创建时间。对于我来说这些显示都是比较直观，查看资源占用的时候非常方便。点击运行状态的图标，还可以看到运行的时间(这功能挺实用)

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-16-41-41-89_df198e732186825c8df26e3c5a10d7cd-1-1024x458.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-16-40-22-48_df198e732186825c8df26e3c5a10d7cd-1024x464.jpg)

右边的4个操作分别是 ①日志 ②控制台 ③文件管理 ④编辑 就算你第一眼看到他，应该也能看出来大概是什么操作。这个操作跟1panel的操作都差不多的。日志和1palel也比较像，也是同样支持下载日志，获取日志的条数。

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-16-48-09-79_df198e732186825c8df26e3c5a10d7cd-581x1024.jpg)

可能对我来说比较方便的就是日志查找了吧，其他倒是没有什么。

对于我来说比较难懂的就是Dpanel的能力配置，虽然说旁边有问号可以看注释。但是还是挺不方便的。不过对于一些docker大佬来说应该这些没什么问题。

![](https://www.memxb.top/wp-content/uploads/2025/07/Screenshot_2025-07-05-17-03-03-69_df198e732186825c8df26e3c5a10d7cd-1007x1024.jpg)

接下来就总结一下他的优点和缺点吧。(内容太多，写不下这么多)

## 总结

优点: UI精美，功能比较丰富，支持配置的选项较多(特别是容器那个能力配置)。支持容器快照和计划任务。可自定义化程度较高。

支持应用商店安装，比传统方式安装更为便捷。支持多服务端管理，免费功能确实比较香。

缺点:

首次加载速度较慢，配置较为繁琐(具有两面性)，没有通知设置(不知道有没有，我是没找到)。

系统更新需要手动执行命令不太方便，不支持定时更新。

以上就是我的一些个人看法。我觉得Dpanel这个面板还可以做的更好，希望作者以后能改进这些体验吧。

好了，非常感谢你能看到这里。如果你有对我的文章有疑问，欢迎在评论区发表你的观点和看法。(第一次写这种文章可能写的不太好)
