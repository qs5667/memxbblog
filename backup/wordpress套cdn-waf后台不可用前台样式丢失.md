---
title: WordPress套cdn+waf后台不可用前台样式丢失?
published: 2025-03-29T00:00:00.000Z
description: '## 前言'
tags:
  - https
  - WordPress问题解决方法
category: 未分类
draft: false
---

## 前言

现在你们看到我网站可能没问题了，但是之前其实有一段时间一直都是换的框架得状态，显示换到了Typecho然后是halo，最终在一顿折腾之下终于找到了WordPress的重定向的次数过多的问题所在，然后终于又可以用回WordPress了。什么情况会遇到，遇到了又怎么解决呢？

## 什么情况会遇到?

我的是使用waf+cdn然后加上WordPress和argon主题时会出现重定向过多。其实你怎么调设置可能也是没有什么用。就比如我是源服务器部署https但是不强制https，waf也是部署https但是不强制。cdn部署https开强制https就会出现问题了。当然有时候你可能用着用着也会出现这种情况，但是作者暂时没有遇到过这种情况，我当时甚至一度怀疑是argon主题的锅。

![](https://www.memxb.top/wp-content/uploads/2025/03/IMG_20250329_163444-525x1024.jpg)

直到前几周我才找到一个解决方法。接下来我就说说怎么解决

## 怎么解决?

其实也并不难，只要用宝塔面板进入你网站的根目录然后改个文件的配置就可以了。

### 第一步，进入根目录

打开你服务器的宝塔进入你所在网站的根目录。如下图所示

![](https://www.memxb.top/wp-content/uploads/2025/03/IMG_20250329_161441-2-1024x880.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/03/IMG_20250329_161416-1-825x1024.jpg)

### 第二步，找到wp-config.php并编辑

在根目录中找到wp-config.php这个文件并打开(可以双击)。然后添加以下代码

    $_SERVER['HTTPS'] = 'on';define('FORCE_SSL_LOGIN', true);define('FORCE_SSL_ADMIN', true);

关健注意⚠️：以上代码添加时，必须添加在 if ( !defined('ABSPATH') ) 代码之前才能生效！否则可能会导致其他问题的出现！

如果不太确定，可以看看我这里的图。如果没有你那行没有空的地方，那就回车新建几行。大概是在96行插入。如果你怕出问题，可以看一下下面的图(仅供参考)，更改后别忘记保存。

![](https://www.memxb.top/wp-content/uploads/2025/03/Screenshot_2025-03-29-16-24-48-12_df198e732186825c8df26e3c5a10d7cd-1024x880.jpg)

## 大功告成

如果你保存了呢，就可以套两层试一试了。我的话是在改了之后就可以正常的使用waf+cdn的组合了。希望这篇文章可以帮助到你，如果有问题，欢迎在评论区讨论，最近放假，所以我打算多更新几篇文章，记得时不时来看看呀🤗

参考文章📃: WordPress网站开启https后台提示“将您重定向的次数过多”怎么办?【已解决】[https://www.wppop.com/wordpress-redirect-you-too-many-times-error-solution.html](https://www.wppop.com/wordpress-redirect-you-too-many-times-error-solution.html)
