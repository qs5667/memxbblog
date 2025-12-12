---
title: 如何优化你的WordPress站点，实现网站秒开?
published: 2024-08-21T01:16:38.000Z
description: '前言: 好几天没写文章了，今天写一个关于WordPress的优化教程，注意，本教程需要有一定的WordPress基础，小白可以绕道了。'
tags:
  - 服务器
  - 网站优化
category: 网站优化
draft: false
---
前言: 好几天没写文章了，今天写一个关于WordPress的优化教程，注意，本教程需要有一定的WordPress基础，小白可以绕道了。

1.  服务器的选择
2.  PHP，MySQL和NGINX的配置调优
3.  插件的选择，优化以及主题的设置**(最重要)**
4.  CDN的选择

1.**服务器的选择**

这个是最简单的一步，但同时也是最重要的一步，服务器地域的选择和服务器的宽带，防御，这里面最为重要的就是CPU和内存。我的博客用的是**香港金牌6133的4H8服务器，内存是DDR4**，实际的一些测试我没有跑过，大家访问我的博客应该也能感受的出来他的速度。地区最好的就是选香港了，虽然美国有防御，但是速度实在太慢了，香港的加个cdn之后就安全点，但是不排除有其他的攻击。如果大家要有搭建博客，可以参考我的配置，选8g的原因是因为可以提高nginx，php，mysql的性能，可以容纳更多的人数，你也可以选择4g的，但CPU一定要主频2.5以上的，不是e5或者e3开头的最好，也不能说很烂吧，只能说有更好的就可以选更好的。当然硬盘也可能要选大一点的，虽然30G其实已经够用，但是要考虑到博客的稳定性安装编译的四件套可能占用有点大，况且你为了安全，肯定会要备份的，如果你的网站很大的话，备份一次占用空间自然也会大，这时候30G可能就不太够用了。 另外这里再提一嘴，管理面板推荐使用宝塔，1panel也可以，但是后面装不了Redis插件，反正我试了一下是不可以的，如果你们可以的话可以在评论区说一下你的方法。

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-03-25-41_df198e732186825c8df26e3c5a10d7cd-847x1024.jpg)

2.**PHP，MySQL和NGINX的配置调优**

这一步其实也不难，只需要照着我的图片配置就行了。

这里我的博客使用的套件如下:

PHP7.4(这个是WordPress的最低要求，同时也是相对稳定的一个) MySQL5.7 NGINX1.24 Redis7.2.4

接着去软件商店安装Linux工具箱，PHP守护，堡塔网站加速，这三软件在免费应用的分类里。

接下来就是配置的调优了，首先去应用商店打开PHP的配置，进入第二个选项安装扩展，**这里需要安装fileinfo，opcache，redis，imagemagick这四个扩展**，没有顺序要求都安装了就行，如果可以的话还建议安装一下bt\_safe和xsl。接着打开他的第三个配置修改，然后**把里面的memory\_limit默认128M改成256M**。然后打开性能调整，找到第一个并发方案，然后根据你服务器的内存选择适合的配置，然后如果你的服务器是8g内存及以上，那么可以把运行模式从动态改成静态，这样可以支撑更多的并发。PHP就到这里，其他的都不用改，默认就行，然后保存重启php即可。

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-02-32-52_df198e732186825c8df26e3c5a10d7cd-1024x850.jpg)

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-02-03-31_df198e732186825c8df26e3c5a10d7cd.jpg)

然后是NGINX，这个其实是最简单的了，只需要去性能调整里面看看gzip有没有打开就行。如果你是8g内存及以上，可以把最大并发数改成512000(谨慎修改)。最后保存重启NGINX。

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-00-48-11_df198e732186825c8df26e3c5a10d7cd.jpg)

接着是MySQL，和PHP一样，去性能调整那里把优化方案选上，这里直接看最后一个数值，比如说你是4h8，那么你就该选择4-8，如果你是2h4，那么就选择2-4，以此类推，如果你的内存超过了32G，那么就选最高的那个就行。记得保存，然后重启。

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/microsoft_edge_screenshot_2024年8月21日-GMT08_00-上午10_00_04.png-1024x631.png)

接下来打开Linux工具箱，找到Swap/虚拟内存，然后修改虚拟内存(如果是2G的内存就设置1024，如果是4G内存就设置2048,如果是8G内存也是2048，再高的内存也是2048，因为超过4G内存就没必要加更大了。) 但是我这里是修改的4096，当然你也可以参考上面的。

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-06-34-07_df198e732186825c8df26e3c5a10d7cd-1024x846.jpg)

然后打开堡塔网站加速，把加速开关给打开，专属规则选择WordPress，然后打开全局配置，把缓存大小改成512M，最后保存即可。

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-10-20-35_df198e732186825c8df26e3c5a10d7cd-1024x716.jpg)

这个时候理论上来说，第二步就已经完成了，接下来就进入到重中之重的环节了。

3.**插件的选择，优化以及主题的设置(最重要)**

首先要选择一些优化插件，后面你才能流畅的安装主题和配置WordPress，redis这里我用的优化插件是 由柴郡猫大佬博客里的Redis Object Cache Pro破解的插件，用了好几天了，感觉没有什么问题，这里配置可以参考他博客里面的教程[https://www.cheshirex.com/7363.html](https://www.cheshirex.com/7363.html) 还有一个就是WP Fastest Cache，这个可以在WordPress的商店里面搜索 还有一个插件就是不知道算不算优化，是由大佬开发的wpopt插件[https://www.lovestu.com/wpopt.html](https://www.lovestu.com/wpopt.html)

然后就是优化插件的配置了，WP Fastest Cache的配置如下图，这里除了第二个预加载可以自定义设置，你也可以默认，然后还有一个就是**新文章发布时**，这里我选的是第二个，可以参考第二张图。

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-22-53-01_df198e732186825c8df26e3c5a10d7cd-1-890x1024.jpg)

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-23-20-92_df198e732186825c8df26e3c5a10d7cd.jpg)

Redis Object Cache Pro，只需要启动了就行，其他不用管。

wpopt就比较自由了，这里你看下方的小字应该就能看懂，就没必要再说了，如果你有问题可以评论。

接下来我就分享我博客里面在用的插件了，具体怎么用这里就不讲那么多了，感兴趣可以自己探索一下。这里的图片容易过大，我放在一个图床了。[https://wmimg.com/i/780/2024/08/66c551c9b8bc1.jpg](https://wmimg.com/i/780/2024/08/66c551c9b8bc1.jpg)

然后教大家怎么选好插件，就是去必应搜索一些插件推荐，然后你按照他给你的插件名称装上这个插件，去itdog给网站测个速(不是ping延迟)看看速度有没有变慢，如果变慢那就证明这个插件有问题，如果你不卸载这个插件的话，可能就会拖慢你博客的速度。当然选择完之后也不能掉以轻心，就让他一直开着开个几天然后再看看有没有影响到网页的速度，如果这都没事的话，那就证明你的插件已经没问题了可以一直用了。

接下来就是主题的选择了。我这里选择的是argon主题，当然你也可以用其他的，我没有意见。因为这里不可能把所有主题的优化都列出来，所以就以我在用的argon作为教程，其他的都大差不差。后续我会再考虑出一个argon美化的教程。

4.**CDN的选择和配置**

恭喜你来到了最后一步，这一步其实没有那么重要，但最近发现挺影响速度的，用上之后可以大大的加快网站的访问速度。这里呢我推荐一个cdn厂商就是我网站页脚那个cdn的图标，点进去就可以看到了。这个厂商的cdn支持ipv6，节点至少在今天是有80多个，每个地方的都有。如果你想再加快你的网站访问速度，可以试一试那个厂商的。这里我也以那个厂商的cdnfly系统作为教程。

首先先充值去购买一个套餐，或者你也可以试试免费的套餐，然后添加一个自己网站域名，比如说www.memxb.top，然后去配置一个ssl证书，如果你想要通配符可以去[https://letsencrypt.osfipin.com/jump/share?code=ODYG38PD](https://letsencrypt.osfipin.com/jump/share?code=ODYG38PD)或者另一个免费的厂商[https://www.cersign.com/free-ssl-certificate.html](https://www.cersign.com/free-ssl-certificate.html)都可以。 然后去配置cname记录，记录值可以看基本信息里的cname，类似于＊.cnmnmsl.top的记录就是了，这里放上我的配置:

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-55-23-09_df198e732186825c8df26e3c5a10d7cd-1-1024x307.jpg)

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-53-01-43_df198e732186825c8df26e3c5a10d7cd-459x1024.jpg)

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-53-20-90_df198e732186825c8df26e3c5a10d7cd-459x1024.jpg)

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-53-24-09_df198e732186825c8df26e3c5a10d7cd-459x1024.jpg)

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-53-31-95_df198e732186825c8df26e3c5a10d7cd-459x1024.jpg)

![](https://meuibook.oss-cn-hongkong.aliyuncs.com/js/2024/08/Screenshot_2024-08-21-10-53-35-05_df198e732186825c8df26e3c5a10d7cd-459x1024.jpg)

至此这个教程算是写完了。可能有很多没有写到的地方，后面会慢慢完善的，有问题可以发在评论区。就这样了。

参考链接:

[https://www.zibll.com/forum-post/16745.html](https://www.zibll.com/forum-post/16745.html)
