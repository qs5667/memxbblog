---
title: 如何做搜索功能优化，增加网站的b格
published: 2024-10-03T00:00:00.000Z
description: '## 前言'
tags:
  - 网站优化
category: 网站优化
draft: false
---

## 前言

很多人在使用WordPress自带的搜索的时候，不太喜欢他自带的样式，虽然我们已经可以固定每一篇文章的访问链接，但是搜索的时候还是会显示出例如https://www.memxb.top/?s=1这样的?s=1的后缀。当然这里像这样的叫做动态链接，具体是什么我也不是能将很清楚，但是这里有个方法可以把这个动态搜索改成静态。

## 作用

其实也没什么用，但是对于一些折腾功能的人来说可能有用。他似乎还有利于seo的优化，因为搜索已经像是一个api一样的东西了/search/内容 就可以搜索下来，可以提升网站的b格😅

## 做法

把下面这个代码复制到 外观-主题文件编辑器 **functions.php**，滑到最下面粘贴上即可，做法如下图。最后点击更新文件即可。

![](https://www.memxb.top/wp-content/uploads/2024/10/Screenshot_2024-10-03-13-46-09-71_df198e732186825c8df26e3c5a10d7cd-1.jpg)

    // 功能：纯代码实现WordPress站内搜索页面url静态化function tongleer_search_url_rewrite() {if ( is_search() && ! empty( $_GET['s'] ) ) {wp_redirect( home_url( "/search/" ) . urlencode( get_query_var( 's' ) ) );exit();}}add_action( 'template_redirect', 'tongleer_search_url_rewrite' );

### 另一个做法(附加)

这个是为了提示不会用这个的一点提示。看着没啥用(确实没啥用) 这个可做可不做，效果大概就长这样。

![](https://www.memxb.top/wp-content/uploads/2024/10/Screenshot_2024-10-03-13-52-29-94_df198e732186825c8df26e3c5a10d7cd.jpg)

在你的网站创建一个叫做 **search** 的文件夹，然后新建一个 _index.php_ 的文件，最后加入我随便找的屎山代码就行了，记得改下面那个改成你博客的链接就行了。这个代码会的可以改一改发在评论区，就这样了。

![](https://www.memxb.top/wp-content/uploads/2024/10/Screenshot_2024-10-03-13-54-10-30_df198e732186825c8df26e3c5a10d7cd.jpg)

    <!DOCTYPE html><html><head>未传入对应参数(搜索内容)，请添加/后填写要搜索的内容。</body></html><br><a href="https://www.memxb.top/search/演示">点击演示跳转</a>

参考文章 [https://yi.tips/1346.html](https://yi.tips/1346.html) 有其他问题可以发在评论区。感谢阅读。

新文章在写了，这个随便写的，不要介意😗
