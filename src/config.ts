import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "默小班的博客",
	subtitle: "一个初中生的小站点",
	lang: "zh_CN", // 语言代码，例如：'en', 'zh_CN', 'ja' 等
	themeColor: {
		hue: 250, // 主题颜色的默认色调，从0到360。例如：红色: 0, 青色: 200, 蓝绿色: 250, 粉色: 345
		fixed: false, // 对访客隐藏主题颜色选择器
	},
	banner: {
		enable: true,
		src: "https://api.dujin.org/bing/1920.php", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
		position: "top", // 等同于 object-position，仅支持 'top', 'center', 'bottom'。默认为 'center'
		credit: {
			enable: false, // 显示横幅图片的版权信息
			text: "", // 要显示的版权文本
			url: "", // （可选）指向原始作品或艺术家页面的URL链接
		},
	},
	toc: {
		enable: true, // 在文章右侧显示目录
		depth: 2, // 目录中显示的最大标题深度，从1到3
	},
	favicon: [
		// 将此数组留空以使用默认favicon
		// {
		//   src: '/favicon/icon.png',    // favicon的路径，相对于 /public 目录
		//   theme: 'light',              // （可选）'light' 或 'dark'，仅在为浅色和深色模式有不同的favicon时设置
		//   sizes: '32x32',              // （可选）favicon的尺寸，仅在有不同的尺寸时设置
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/saicaca/fuwari", // 内部链接不应包含基础路径，因为它会自动添加
			external: true, // 显示外部链接图标，并在新标签页中打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/memxb-avatar.png", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
	name: "默小班",
	bio: "一个啥都玩的初中生，喜爱Minecraft和折腾自己的服务器.",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github", // 访问 https://icones.js.org/ 获取图标代码
			// 如果尚未包含相应的图标集，您需要安装它
			// `pnpm add @iconify-json/<图标集名称>`
			url: "https://github.com/qs5667",
		},
		{
			name: "QQ",
			icon: "fa6-brands:qq",
			url: "https://qm.qq.com/q/J65yD89aQC",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（例如背景颜色）正在被覆盖，请参阅 astro.config.mjs 文件
	// 请选择深色主题，因为此博客主题目前仅支持深色背景颜色
	theme: "github-dark",
};