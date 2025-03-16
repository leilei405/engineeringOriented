"use client";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  GlobalOutlined,
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/components", label: t("nav.components") },
    { href: "/lowcode", label: t("nav.lowcode") },
    { href: "/api", label: t("nav.api") },
    { href: "/visual", label: t("nav.visual") },
  ];

  const languageMenu = (
    <Menu
      items={[
        {
          key: "zh",
          label: "中文",
          onClick: () => setLanguage("zh"),
        },
        {
          key: "en",
          label: "English",
          onClick: () => setLanguage("en"),
        },
      ]}
    />
  );

  const themeMenu = (
    <Menu
      items={[
        {
          key: "light",
          label: "浅色模式",
          onClick: () => setTheme("light"),
        },
        {
          key: "dark",
          label: "深色模式",
          onClick: () => setTheme("dark"),
        },
      ]}
    />
  );

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <span className={styles.logoText}>Lucky-DevPortal</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.controls}>
          {/* Theme Toggle */}
          <Dropdown overlay={themeMenu} placement="bottomRight">
            <Button type="text" className={styles.iconButton}>
              {theme === "dark" ? <BulbFilled /> : <BulbOutlined />}
            </Button>
          </Dropdown>

          {/* Language Toggle */}
          <Dropdown overlay={languageMenu} placement="bottomRight">
            <Button type="text" className={styles.iconButton}>
              <GlobalOutlined />
            </Button>
          </Dropdown>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            className={`${styles.iconButton} ${styles.menuButton}`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
