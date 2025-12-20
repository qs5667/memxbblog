---
title: 通过certimate项目实现低成本ssl证书自动续期功能(edgeone子账户配置)
published: 2025-07-24T09:21:08.000Z
description: '# 前言'
tags:
  - 域名
  - 小白搭建教程
  - 服务器
  - 网站优化
category: 未分类
draft: false
---
# 前言

最近主站用上了edgeone的免费套餐。节点也还行，速度也变快了。但是感觉限制还是比较多，比如不支持quic和自动优化以及图片优化。同时b站上也有很多人说edgeone要手动上传证书。但其实自动续期并不难，需要的只是一台服务器,甚至是nat机就可以实现。同时我也没有看到相关的文章出现。所以就打算写一篇关于certimate和edgeone的文章，前面都是配置certimate。

_整个教程都是以debian12为例，请确保您选择的系统是debian12。如果是其他系统，请自行寻找教程。如果你选择的是debian，请自行搜索并更换镜像源。_

如果你想查看edgeone子账号的配置和证书部署，请在左侧拉到 配置Certimate-配置主机提供商-edgeone 一栏。 那么就让我们开始吧!

## 项目介绍

Certimate 是一个主要使用 Go 语言 开发，并利用 ACME 协议 与各大证书颁发机构（CA）进行自动化交互，实现证书的申请和续期的开源工具。

项目的Github地址:

 [GitHub](https://github.com/ "Github")

[certimate-go/certimate](https://github.com/certimate-go/certimate)

## 安装和访问Certimate

### 购买一台便宜的机器

机器其实并没有什么要求，这边建议去使用特机或者是nat机器。因为这个项目就算用docker容器跑占用也不是很高，所以就没有必要使用服务器。(还要多一个公网IP的费用)。**建议购买1h1g,1h2g或者2h2g即可**

如果你用服务器的话可以去选大厂的99的或79的机器，这边推荐阿里云,腾讯云,浪浪云([https://langlangy.cn/?i4bb12a](https://langlangy.cn/?i4bb12a)),以及雨云([https://www.rainyun.com/memxb\_](https://www.rainyun.com/memxb_))。 nat机器只能是小厂的便宜，这边可以看看廉价云([https://cheapyun.com/#/?s=b44797](https://cheapyun.com/#/?s=b44797))。推荐配置和上面nat机器的一样。

**注:以上不算是推广,只是做推荐,没有特别的意思。且这里的几家我都用了至少半年以上。**

docker和compose的安装过程比较长，如果你已经安装好了docker和docker-compose。咱可以直接跳到安装Certimate那里

### 安装Docker和Compose

#### 安装Docker

这边给一个一键安装脚本，是我经常使用的(脚本请谨慎选择)。你也可以去网络上找其他的安装脚本。

    curl -O https://mirrors.8465.cn/docker.sh && chmod +x docker.sh && ./docker.sh

运行之后一直回车即可。基本不会有太大问题，如果遇到安装失败，请再试一次。或者寻找其他的安装方法。

安装完之后应该会看到如下图的提示

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002233-1024x481.jpg)

#### 安装Docker-compose

\# Ubuntu/Debian使用以下指令安装:

    sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

\# CentOS/RHEL使用以下指令安装:

    sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

接着赋予执行权限

    sudo chmod +x /usr/local/bin/docker-compose

## 配置镜像源(可选)

如果你使用的是香港或美国等非国内服务器，那么就可以忽略这一步，当然也可以进行这一步骤。如果你是国内的服务器，请务必记住此步骤，否则可能会导致后续certimate镜像拉取失败。这个方法也是通用方法，同样适用于docker镜像无法拉取的问题。

为了防止更换后出现问题，请先备份原来的镜像源。

    sudo cp /etc/docker/daemon.json /etc/docker/daemon.json.bak 

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002235-1024x163.jpg)

接着执行更换镜像源的指令。把这个粘贴进去就可以了。我这里一共是有十几个镜像源。当然也可以自行更换其他镜像源。因为_不知道什么问题，后面可能只能添加上5个。_

    sudo tee /etc/docker/daemon.json <<'EOF'
    {
      "registry-mirrors": [
        "https://mirror.ccs.tencentyun.com",
        "http://hub-mirror.c.163.com",
        "https://reg-mirror.qiniu.com",
        "https://www.daocloud.io/mirror",
        "https://docker.1panel.live",
        "https://dockerproxy.cn",
        "https://docker.tencentcloudcr.com",
        "https://docker.m.daocloud.io",
        "https://docker.westus.cdn.azure.cn",
        "https://docker.buaa.cuctvns.cn",
        "https://docker.lug.ustc.edu.cn",
        "https://docker.mirrors.sjtug.sjtu.edu.cn",
        "https://docker.geekmirror.net"
      ]
    }
    EOF

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002259-1024x978.jpg)

接下来重启docker服务

    sudo systemctl restart docker

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002261-1024x159.jpg)

接着验证有没有生效。

    docker info | grep -A 12 Mirrors

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002265-1024x768.jpg)

如果有显示之前配置的镜像源列表。就可以安装certimate了。

如果有问题请恢复到之前的配置。

    sudo mv /etc/docker/daemon.json.bak /etc/docker/daemon.json && sudo systemctl restart docker

接着和上面一样验证是否恢复成功。

    docker info | grep -A 12 Mirrors

如果还是有问题的话，那就只能自己去查找解决方法了。

## 安装Certimate

这里我使用最方便的docker-compose进行安装为了方便安装，这里使用的都是一键指令。

\# 创建目录并进入

    mkdir certimate-docker && cd certimate-docker

\# 创建 docker-compose.yaml 文件

    cat > docker-compose.yml <<'EOF'
    version: "3.0"
    services:
      certimate:
        image: registry.cn-shanghai.aliyuncs.com/usual2970/certimate:latest
        container_name: certimate_server
        ports:
          - 8090:8090
        volumes:
          - ./data:/app/pb_data
        restart: unless-stopped
    EOF

#创建持久化数据目录

    mkdir data

\# 接着去拉取最新版本的镜像

    docker pull registry.cn-shanghai.aliyuncs.com/usual2970/certimate:latest

\# 然后根据docker-compose配置创建容器

    docker-compose up -d

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002274-1024x556.jpg)

## 配置端口和访问(看情况)

❶如果你使用的是服务器。那么可能会有两种况:

1.如果你使用的是大厂云服务器，例如腾讯云或阿里云等，请你去安全组端口放行tcp协议的8090端口。接着通过**ip+8090**访问管理页面。

2.如果你使用的是小厂云服务器，可以先试着直接ip+端口访问管理页面。如果可以访问，那就直接跳过这步到下一步，如果没有请自行请问服务商或查看服务器详情页是否有安全组的选项，和第一种情况一样配置端口。

❷如果你使用的是nat服务器，例如廉价云的nat服务器。那么请去nat端口或端口转发字样的页面配置**tcp协议的8090端口**。如果有外网端口，忽略即可。配置完成之后用转发页面的ip+转发后的端口 访问即可。

**默认的账户密码如下:**

    用户名：admin@certimate.fun
    密码：1234567890

登陆之后可以前往设置更改登录账号和密码，这里就不再过多赘述。

## 配置Certimate

### 配置证书颁发机构

如果你只想使用Let's Encrypt机构的证书，那么可以直接跳过这一步。如果你想使用其他机构的证书例如ZeroSSL，那么请看以下步骤。

要添加证书颁发机构授权，请前往授权管理-证书颁发机构-新建授权，选择你想要添加的授权。我这里以zerossl为例

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002276-1024x555.jpg)

接着输入你想要这个授权的名称，一般情况下使用这个颁发机构的名称即可。

zerossl要求你填入两个值，ACME EAB KID和ACME EAB HMAC Key。此时需要我们去zerossl的官网注册一个账号。[https://app.zerossl.com/signup](https://app.zerossl.com/signup)

注册登录后需要进入[_https://app.zerossl.com/developer_](https://app.zerossl.com/developer) **获取ACME EAB KID** 和 **ACME EAB HMAC Key**

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002283.jpg)

点击Generate即可创建一个凭据。

将此凭据的ACME EAB KID和ACME EAB HMAC Key复制进去提交即可。复制的时候要注意一下顺序。

### 配置DNS服务商(子账号)

DNS服务商太多了，所以这边以腾讯云作为演示。首先进入腾讯云控制台访问管理的用户列表。[https://console.cloud.tencent.com/cam](https://console.cloud.tencent.com/cam)

点击 新建用户-快速创建。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002288-1024x554.jpg)

用户名建议起的标准一点，后面好辨别。访问这边建议只勾选编程访问，不勾选控制台访问。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002292-1024x411.jpg)

接着为子账号授予权限。只要授予_QcloudDNSPodFullAccess_和_QcloudDNSPubFullAccess_即可。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002294-1024x976.jpg)

不勾选 需要重置密码。点击创建用户即可。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002296-1024x808.jpg)

如果你只勾选编程访问，那么这里就应该有SecretId和SecretKey。如果像我一样，那请你去用户列表找到刚刚创建的子账户，申请一个API密钥即可。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002343-1024x766.jpg)

然后回到Certimate配置腾讯dns服务商即可。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002300-1024x535.jpg)

### 配置主机提供商

#### edgeone

要配置edgeone的子账号。需要参考腾讯云dns服务商添加子账号的步骤。就是上面创建腾讯云子账号那一些步骤。权限方面只要给予**QcloudSSLFullAccess和QcloudTEOFullAccess**即可。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002302.jpg)

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002304.jpg)

然后我去控制台分别添加这两个授权。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002306.jpg)

#### 多吉云

多吉云的需要在 用户中心-密钥管理中查看AccessKey和SecretKey。查看之后复制粘贴到Certimate那边即可。**https://console.dogecloud.com/user/keys**

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002308-1024x451.jpg)

#### 雨云

雨云的API密钥在 用户-账号设置-API密钥。点击复制复制一篇密钥添加到 Certimate中 **_雨云 API 密钥_** 即可。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002310-1024x407.jpg)

## 工作流创建和分享

要添加工作流可前往左侧添加一个工作流，可以选择标准模板。接着输入工作流名称和描述。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002312-1024x783.jpg)

我这里是删掉了部署成功和部署失败的分支和一些节点。如果你不方便配置通知，建议删掉通知节点。

Certimate工作流中的所有内容都要填写或选择才可以发布更改，如果你添加了通知，但不配置通知节点，那么是无法发布更改的。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002314-953x1024.jpg)

接着就可以在申请的后面添加一个部署节点。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002316-1024x861.jpg)

接下来是一步步的配置。首先在开始的配置节点中需要配置为自动触发。Cron的表达式可以查一下，也可以使用默认的表达式，配置完成，点击保存之后进行下一步。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002318-1024x794.jpg)

接下来是配置申请节点，点击配置节点。点击右边的按钮配置域名。点击添加域名。如果你需要配置通配符证书，请在域名前加上: \*.。下面是一个示例域名，将后半段改成你的域名即可。添加泛域名后还需要添加一个主域名(如果你需要使用主域名)

    *.example.com

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002323-1024x357.jpg)

联系邮箱处，填写自己常用的邮箱。也可以填写自己不常用的邮箱。不建议乱填。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002325-1024x632.jpg)

DNS 提供商授权这里不能选错。一定要选有DNS权限的子账户的那项。然后后面申请会出错。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002327-1024x429.jpg)

证书颁发机构可以选择Let's Encrypt，也可以选择自己添加的授权。证书算法保持默认即可。

高级设置处建议你们只填写最后一项。因为很多DNS服务商，如果你不购买他们DNS服务的专业版，他们给你提供的默认最短解析时间都是600秒，这边填600就行。如果你明确你们域名所在的DNS服务商的解析时间，就可以往600以下填。如果你不确定，那么填600就行。(我也没有试过不填，可以试一下)

我这里还额外勾选了阻止API续期，如果你不确定，建议你先用默认的选项进行尝试，不行再勾选上。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002329-1024x819.jpg)

重复申请可改可不改，默认使用30天就行，一般不会有什么大问题。

接着到部署的节点，这个节点主要是选择你要部署到哪个地方。如果你前面添加了cdn比如腾讯云edgeone。那么按如下图即可。**注意不要选成ecdn**。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002331-1024x791.jpg)

加速运明天先你托管在edgeone的加速域名。站点ID请在**[https://console.cloud.tencent.com/edgeone/zones](https://console.cloud.tencent.com/edgeone/zones)**服务总览-站点/站点id处查看即可。也可以看一下图的黄色部分以及箭头指向的地方。复制这里的ID粘贴即可。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002334-1024x833.jpg)

接着通知那边由于太过复杂，打算后面再讲。这次整篇文章讲的内容也差不多了。本来是想直接从部署那里开始。但是写着写着发现自己连安装docker和docker composer的部分也写了。这就显得整篇文章非常长

这次讲的是一个通用方法，其他的cdn服务器什么的也是差不多的。这边都只讲一个示例而已。最后再分享一下我的工作流。

![](https://www.memxb.top/wp-content/uploads/2025/07/1000002336-422x1024.jpg)

这边为了保护隐私啊，我给一些东西打了点码。

这就是本文章的全部内容。我从上午写到下午，中间一大部分时间都是解决那个docker和dockercompose的问题，如果你觉得这篇文章对你有帮助，欢迎分享给其他更多的人。我们下一篇文章见(又不知道要鸽多久了)。如果有问题也欢迎发在评论区。
