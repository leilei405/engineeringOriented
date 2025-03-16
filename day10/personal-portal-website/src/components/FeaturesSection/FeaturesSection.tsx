"use client";

import type React from "react";
import { Card, Row, Col } from "antd";
import {
  BgColorsOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  ThunderboltOutlined,
  CodeOutlined,
  SafetyOutlined,
  RobotOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./FeaturesSection.module.scss";

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BgColorsOutlined className={styles.featureIcon} />,
      title: "主题定制",
      description: "支持深色模式和自定义主题，满足不同场景需求",
    },
    {
      icon: <GlobalOutlined className={styles.featureIcon} />,
      title: "多语言支持",
      description: "内置中英文语言包，轻松切换，支持扩展更多语言",
    },
    {
      icon: <AppstoreOutlined className={styles.featureIcon} />,
      title: "模块化架构",
      description: "采用模块化设计，各功能模块可独立使用和扩展",
    },
    {
      icon: <ThunderboltOutlined className={styles.featureIcon} />,
      title: "高性能",
      description: "优化的性能表现，快速响应，流畅的用户体验",
    },
    {
      icon: <CodeOutlined className={styles.featureIcon} />,
      title: "开发者友好",
      description: "完善的文档和API设计，降低学习成本，提高开发效率",
    },
    {
      icon: <SafetyOutlined className={styles.featureIcon} />,
      title: "安全可靠",
      description: "内置安全防护措施，保障数据和应用安全",
    },
    {
      icon: <RobotOutlined className={styles.featureIcon} />,
      title: "智能化",
      description: "集成AI能力，提供智能代码补全和逻辑优化建议",
    },
    {
      icon: <CheckCircleOutlined className={styles.featureIcon} />,
      title: "质量保障",
      description: "完善的测试覆盖和CI/CD流程，确保代码质量",
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>{t("features.title")}</div>
          <h2 className={styles.sectionTitle}>强大的功能特性</h2>
          <p className={styles.sectionDescription}>
            为开发者和企业提供全方位的前端解决方案
          </p>
        </div>

        <Row gutter={[24, 24]} className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default FeaturesSection;
