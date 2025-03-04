import { getUserClientType } from "@/assets/ts/utils";
import defaultEnginesMap from "@/assets/config/search.json";
import defaultBookMarks from "@/assets/config/bookmarks.json";

// PC 配置
let siderMode = 1;
let itemIconSize = 80;
let itemTitleSize = 20;
let settingPageWidth = 450;
let cardItemWidth = "120px";

// MOBILE 配置
const setMobileValues = () => {
  siderMode = 0;
  itemIconSize = 45;
  itemTitleSize = 15;
  settingPageWidth = 300;
  cardItemWidth = "50px";
};

const searchJump = "_self";
const openBookMarkJump = "_blank";

const contentTheme = {
  light: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
  dark: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
};

const firstCardTitle = "✨ 常用";
const cardTitlePrefix = "📎";

const iconAPI = "https://api.faviconkit.com/";

const enginesMap: { [key: string]: string[] } = defaultEnginesMap;
const defaultEngineKey = "d";

const bookMarks: BookMarks[] = defaultBookMarks;

const client = getUserClientType();
if (client == "MOBILE") {
  setMobileValues();
}

/**
 * 获取网站的 favicon 图片
 * @param item - 书签项
 * @returns {string} - 图片地址
 */
const getFavicon = (item: { link: string; src?: string }) => {
  if (item.src) {
    return item.src; // 直接使用 src 配置的图片
  }

  try {
    // 确保 link 是完整的 URL
    const url = new URL(item.link.startsWith("http") ? item.link : `https://${item.link}`);
    return `${iconAPI}${url.hostname}/64`; // 使用 API 获取网站图标
  } catch (e) {
    console.error("Invalid URL:", item.link);
    return "/default-icon.png"; // 备用默认图标
  }
};

// 处理书签数据，添加 favicon 字段
const processedBookMarks = bookMarks.map(category => ({
  ...category,
  items: category.items.map(item => ({
    ...item,
    favicon: getFavicon(item), // 计算 favicon
  })),
}));

export {
  processedBookMarks as bookMarks, // 导出处理后的书签数据
  itemTitleSize,
  itemIconSize,
  settingPageWidth,
  cardItemWidth,
  contentTheme,
  firstCardTitle,
  cardTitlePrefix,
  iconAPI,
  enginesMap,
  defaultEngineKey,
  searchJump,
  openBookMarkJump,
  siderMode,
};
