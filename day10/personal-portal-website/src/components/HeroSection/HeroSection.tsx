"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  RightOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./HeroSection.module.scss";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
            <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
            <div className={styles.heroCta}>
              <Link to="/projects">
                <Button
                  type="primary"
                  size="large"
                  className={styles.primaryButton}
                >
                  浏览项目
                  <RightOutlined />
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="large" className={styles.secondaryButton}>
                  查看文档
                </Button>
              </Link>
            </div>
            <div className={styles.heroFeatures}>
              <div className={styles.featureTag}>
                <ThunderboltOutlined className={styles.featureIcon} />
                <span>高性能</span>
              </div>
              <div className={styles.featureTag}>
                <AppstoreOutlined className={styles.featureIcon} />
                <span>可扩展</span>
              </div>
              <div className={styles.featureTag}>
                <CodeOutlined className={styles.featureIcon} />
                <span>开源</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroCodeEditor}>
              <div className={styles.editorHeader}>
                <div className={styles.editorControls}>
                  <span
                    className={`${styles.editorControl} ${styles.controlRed}`}
                  ></span>
                  <span
                    className={`${styles.editorControl} ${styles.controlYellow}`}
                  ></span>
                  <span
                    className={`${styles.editorControl} ${styles.controlGreen}`}
                  ></span>
                </div>
                <div className={styles.editorTitle}>App.jsx</div>
              </div>
              <div className={styles.editorBody}>
                <pre className={styles.codeBlock}>
                  <code>
                    {`import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Router from './router';
import './styles/app.scss';

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;`}
                  </code>
                </pre>
              </div>
            </div>

            <div className={styles.dashboardOverlay}>
              <div className={styles.dashboardTitle}>仪表盘概览</div>
              <div className={styles.dashboardStats}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>95%</div>
                  <div className={styles.statLabel}>性能评分</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>50+</div>
                  <div className={styles.statLabel}>组件数量</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>10ms</div>
                  <div className={styles.statLabel}>响应时间</div>
                </div>
              </div>
            </div>

            <div className={styles.techBadges}>
              <div className={styles.techBadge}>React</div>
              <div className={styles.techBadge}>TypeScript</div>
              <div className={styles.techBadge}>SCSS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
