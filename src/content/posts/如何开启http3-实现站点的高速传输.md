---
title: 如何开启http3，实现站点的高速传输?
published: 2025-03-31T00:33:40.000Z
description: '## 前言'
tags:
  - http3
  - 网站优化
category: 网站优化
draft: false
---
## 前言

之前在逛张洪大佬的博客时候发现了一篇http3的文章，想着自己的WordPress站点速度慢一言难尽，索性就打算试试看。然后打算出一篇教程放在小站点上，不然之后又没什么时间更新文章了(虽然有了，但还是想水一篇哈哈)。但由于作者不会啥理论技能，不太好解释什么是http3，所以这篇文章只会介绍如何启用http3。

## 宝塔站点开启http3

### nginx版本切换

首先打开nginx管理页面-左侧切换版本\[_首页没有可以去软件商店-已安装找到nginx然后打开_\]，然后**将nginx的版本改成1.25或者以上的版本**即可。 截止2025年3月30日nginx有1.25,1.26和1.27这三个版本是支持的，其他的作者没试过也不知道行不行。现在我也不太敢乱整腾了，站点很容易坏，喜欢折腾的可以用其它版本试试(网站整坏了别找我啊)

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-30-21-16-39-97_df198e732186825c8df26e3c5a10d7cd.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-30-21-19-24-32_df198e732186825c8df26e3c5a10d7cd-1024x735.jpg)

### 修改配置文件

接着回到 Nginx管理-左侧配置修改，然后滑倒大概81行，加上这段代码。

注意：开启此项请确保项目能够防止重放攻击。

    ssl_early_data on;

当然这里没有一个确定的行数，加在 就行了，这里为了方便大家给个我这里的配置图

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-30-21-29-59-89_df198e732186825c8df26e3c5a10d7cd-1024x806.jpg)

### 设置TLS版本

进入网站-高级设置-TLS设置，然后关掉**TLSv1和TLSv2这两个选项**，保存即可。

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-30-21-44-39-72_df198e732186825c8df26e3c5a10d7cd-1024x716.jpg)

### 开放udp的443端口

#### 宝塔安全开放端口

接着进入宝塔面板的 安全-添加端口规则，协议udp–端口443–入站–备注可以写http3也可以不写，如下图配置。然后确定即可

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-30-21-50-59-07_df198e732186825c8df26e3c5a10d7cd-960x1024.jpg)

#### 云服务器安全组开放端口

如果你是云服务器或者轻量应用服务器，还需要在对应的云服务商开启和上面同样的端口。即使你记得开了udp443，也要去检查一下。这里以腾讯云的安全组为例，可以参照下图：

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-30-22-27-33-16_df198e732186825c8df26e3c5a10d7cd-1024x363.jpg)

### 为网站添加QUIC监听

去网站-站点修改-配置文件看看有没有添加上这几个监听，如果有就不用换了，如果没有，缺了哪个就加上哪个即可

![](https://www.memxb.top/wp-content/uploads/2025/03/IMG_20250331_075253-621x1024.jpg)

第一个添加的网站

    listen  443 quic reuseport;

以后添加的网站

    listen  443 quic;

ipv6的http3(服务器支持)

如果你的网站服务器支持ipv6，可以增加这两行以增加对ipv6的支持

    listen  [::]:443 ssl;
    listen  [::]:443 quic;

即可

### cdn开启http3

#### Cdnfly系统开启http3

接着去你的cdn厂商开启http3的按钮，这里的http3的地方都不一样，我这里只给cdnfly通用系统(不知道你cdn什么系统可以问一下cdn客服或者问一下如何开启http3)和多吉云的两张图和两个步骤。

cdnfly的是在https设置往下滑就能看到了，开启即可。ssl协议配置也要和之前的一样，勾选优先服务器套件。

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-31-08-07-41-54_df198e732186825c8df26e3c5a10d7cd-623x1024.jpg)

#### 多吉云开启http3

多吉云的差不多 在https配置这里，开启QUIC即可 注意⚠️：这里的http3是要付费的，如果你开启的话会有额外计费(也不贵说实话，如果你受不了怕破产可以去找家cdnfly的系统的cdn使用)

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-31-08-12-44-40_df198e732186825c8df26e3c5a10d7cd-1024x450.jpg)

### 检查是否支持H3

接着我们去这个网站[https://http3.wcode.net/](https://http3.wcode.net/)看看是否支持http3并且有h3的字样。如果有，那么你此时已经是配置成功了

![](https://www.memxb.top/wp-content/uploads/2025/03/IMG_20250331_080435-619x1024.jpg)

如果没有，那么可能是你的cdn不支持开启http3或者还有一部没有配置好。再次回到站点的配置文件，滑到大概29行左右，看看有没有下图的配置

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-31-08-16-39-93_df198e732186825c8df26e3c5a10d7cd-1024x830.jpg)

如果没有或者不够，那么这里可以加上这个代码。二选一，第一个是洪哥的，第二个是我的。(那个能用就用哪个，都能用也可以随便选) 我这里是29行有这个 add\_header Alt-svc字段，我们把他们全选，然后复制下面这段代码粘贴进去即可。

    add_header Alt-Svc 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"';

    add_header Alt-Svc 'quic=":443"; h3=":443"; h3-29=":443"; h3-27=":443";h3-25=":443"; h3-T050=":443"; h3-Q050=":443";h3-Q049=":443";h3-Q048=":443"; h3-Q046=":443"; h3-Q043=":443"';

### 大功告成

至此宝塔启用http3的教程到这里就差不多了，如果你有问题可以在评论区下面讨论或者找找其他大佬的文章。我这篇文章的最后也有参考文章可以去看看。

## NGINX反向代理开启HTTP3

和宝塔开启http3的方法大同小异，一样是在配置文件里加上一段代码即可。

首次添加的网站

    listen  443 quic reuseport;

之后添加的网站

    listen  443 quic;

然后去开启一下缓存，点击已关闭的按钮开启即可。然后在location里添加我们之前文章中说的响应头即可。然后就可以回到之前那一把检查http3了。

参考文章📃

宝塔Nginx反代上游服务器不支持HTTP3，如何启用HTTP3 [https://blog.zhheo.com/p/6zuz70vr.html](https://blog.zhheo.com/p/6zuz70vr.html)

宝塔如何开启HTTP3，启用HTTP3使用QUIC进行高性能传输 [https://blog.zhheo.com/p/ftcah0lq.html](https://blog.zhheo.com/p/ftcah0lq.html)
