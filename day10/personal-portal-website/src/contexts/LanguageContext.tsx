"use client";
import type React from "react";
import { createContext, useContext, useState } from "react";

type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// 简单的翻译字典
const translations: Record<Language, Record<string, string>> = {
  zh: {
    "nav.home": "首页",
    "nav.projects": "项目",
    "nav.components": "组件库",
    "nav.lowcode": "低代码平台",
    "nav.api": "在线接口",
    "nav.visual": "可视化逻辑编排",
    "hero.title": "前端技术创新平台",
    "hero.subtitle": "集成组件库、低代码平台、API接口和可视化逻辑编排工具",
    "projects.title": "精选项目",
    "features.title": "核心功能",
    "stats.title": "平台数据",
    "newsletter.title": "订阅更新",
    // 更多翻译...
  },
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.components": "Components",
    "nav.lowcode": "Low-Code",
    "nav.api": "API",
    "nav.visual": "Visual Logic",
    "hero.title": "Frontend Innovation Platform",
    "hero.subtitle":
      "Integrated component library, low-code platform, API interface and visual logic arrangement tools",
    "projects.title": "Featured Projects",
    "features.title": "Core Features",
    "stats.title": "Platform Stats",
    "newsletter.title": "Subscribe for Updates",
    // 更多翻译...
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "zh",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check for saved language preference or default to 'zh'
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage === "zh" || savedLanguage === "en"
      ? (savedLanguage as Language)
      : "zh";
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
