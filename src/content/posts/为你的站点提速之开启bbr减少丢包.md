---
title: 为你的站点提速之开启BBR减少丢包
published: 2025-10-06T00:00:00.000Z
description: '## 前言'
tags:
  - 服务器
  - 网站优化
category: 网站优化
draft: false
---

## 前言

很多站长在建完一个网站之后通常会选择优化和美化自己的站点，例如WordPress和Typecho等等的框架。

但是有时候这些优化并不一定都有效，而且大多数站长都基本偏向于站点的优化，通常不会对服务器进行优化。所以本篇教程教你优化服服器的TCP传输来降低传输中的网络延迟，以此来达到优化网站加载速度的目的。

注:BBR在不同网络环境下，可能不起作用，甚至会有反作用，请检查你的实际需求再启用。

可能看到这里的你还是有一些疑惑。什么是BBR？那就来做一个小解释吧。

## 什么是BBR？

BBR（Bottleneck Bandwidth and Round-trip propagation time）是由Google在2016年提出的一种TCP拥塞控制算法。它旨在让服务器在高带宽、高延迟的现代网络环境中，更高效地利用好现有的网络资源，同时保持较低的延迟。

说人话: BBR就是一个更聪明的网络调速器，它的目的主要是在尽量不堵车的情况下，让公路跑最多的车。不用BBR就相当于用老方法，而老方法则是等撞车了才刹车，动不动就很容易造成大堵车。这样就能让道路始终处于最佳的状态，这样就能减少丢包和延迟，而对于加速网站也是很有用的。(试过才知道，虽然不一定有用)

## 检查是否开启BBR

因为有些厂商的服务器是默认开启BBR的，所以需要先检查一下有没有开启，如果已经开启了，那可以去到文章最下面看 检测BBR是否开启。

我们需要在服务器终端执行以下指令:

    sysctl net.ipv4.tcp_congestion_control

如果反馈的结果是: net.ipv4.tcp\_congestion\_control = bbr

这说明BBR已经在系统里启用了，无需再进行配置。

我们还可以再看一下，BBR是否已经在内核里开启:

    lsmod | grep bbr

如果有类似以下的输出:

tcp\_bbr 20480 9(右边每个人的数据都不一样)

![](https://www.memxb.top/wp-content/uploads/2025/10/1000009121-1024x244.jpg)

证明服务器已经完全开启了BBR，并且正在使用BBR进行TCP网络拥堵优化，无需再进行下面的操作。

如果你使用 sysctl net.ipv4.tcp\_congestion\_control 显示的是: net.ipv4.tcp\_congestion\_control = cubic 又或者是使用 lsmod | grep bbr 没有任何反馈

![](https://www.memxb.top/wp-content/uploads/2025/10/1000009132-1024x230.jpg)

证明你的服务器现在还没有开启BBR加速，那就看以下的教程开启一下BBR吧！

## 如何开启BBR？

在开启之前，需要检测你当前使用系统的内核版本是否符合BBR开启的要求。我们可以使用这个指令来打印系统的内核版本

    echo "内核版本: $(uname -r)"
    

最低内核版本要求是: Linux主版本为4，次版本号为9

推荐内核版本要求是: Linux主版本为5，次版本为13及以上

如果你满足这些条件(总不能是10年老系统吧)，额不满足的话....我给你点个赞

接下来依次输入以下指令来开启BBR:

    sudo sysctl -w net.core.default_qdisc=fq

    sudo sysctl -w net.ipv4.tcp_congestion_control=bbr

小知识: FQ（Fair Queuing，公平队列）是Linux内核中一种先进的网络数据包调度的算法，它和BBR拥塞控制算法搭配使用能显著提升和改善网络性能。

接下来将配置添加到sysctl 的配置文件中:

    echo "net.core.default_qdisc=fq" | sudo tee -a /etc/sysctl.conf

    echo "net.ipv4.tcp_congestion_control=bbr" | sudo tee -a /etc/sysctl.conf

最后，应用配置。使BBR可以一直保持开启的状态:

    sudo sysctl -p

至此，BBR开启的教程完毕。

## 检测BBR是否开启

为了确保BBR已经开启，需要分别输入之前的指令来检查是否是之前的预期输出。

    sysctl net.ipv4.tcp_congestion_control

    lsmod | grep bbr

如果已经正常启用就可以看到下图的反馈:

![](https://www.memxb.top/wp-content/uploads/2025/10/1000009121-1-1024x244.jpg)

又或者我们可以让系统分别打印以下参数:

    echo "1. 拥塞控制算法: $(sysctl -n net.ipv4.tcp_congestion_control)"
    echo "2. 队列规则: $(sysctl -n net.core.default_qdisc)"
    echo "3. 内核模块: $(if lsmod | grep -q tcp_bbr; then echo "已加载"; else echo "未加载"; fi)"
    echo "4. 活动连接: $(if ss -tin | grep -q bbr; then echo "检测到BBR连接"; else echo "未检测到"; fi)"

![](https://www.memxb.top/wp-content/uploads/2025/10/1000009126-1024x678.jpg)

我们还可以使用 speedtest-cli 工具来测试开启后的服务器的上传速度和下载速度。(需要在未开启前测速和开启后测速进行对比才能看到效果和不同)

    curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -

## 关闭BBR

可能BBR并不一定适合所有人，如果你发现在开启后没有什么效果甚至有副作用，那么你可以选择关闭BBR。

只需要从配置文件中删除BBR相关设置即可:

    sudo sed -i '/net.core.default_qdisc/d' /etc/sysctl.conf

    sudo sed -i '/net.ipv4.tcp_congestion_control/d' /etc/sysctl.conf

又或者直接注释掉相关行即可（更安全一点）

    sudo sed -i 's/^net.core.default_qdisc/#net.core.default_qdisc/g' /etc/sysctl.conf

    sudo sed -i 's/^net.ipv4.tcp_congestion_control/#net.ipv4.tcp_congestion_control/g' /etc/sysctl.conf

接下来保存配置，之后重启服务器即可，然后验证方法和开启的方法一样。

    sudo sysctl -p

只要没有显示bbr的字样，证明已经成功关闭。

好啦，写了快一下午的文章，终于写完了。感谢你能看到这里，希望这篇文章可以帮到你呀。我们下一篇文章见！
