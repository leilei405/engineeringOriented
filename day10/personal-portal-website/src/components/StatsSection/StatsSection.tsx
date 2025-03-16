"use client";

import type React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  DownloadOutlined,
  UserOutlined,
  StarOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./StatsSection.module.scss";

const StatsSection: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <DownloadOutlined className={styles.statIcon} />,
      title: "50K+",
      description: "下载量",
    },
    {
      icon: <UserOutlined className={styles.statIcon} />,
      title: "1000+",
      description: "活跃用户",
    },
    {
      icon: <StarOutlined className={styles.statIcon} />,
      title: "4.9/5",
      description: "用户评分",
    },
    {
      icon: <GithubOutlined className={styles.statIcon} />,
      title: "500+",
      description: "GitHub Stars",
    },
  ];

  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>{t("stats.title")}</div>
          <h2 className={styles.sectionTitle}>数据一览</h2>
          <p className={styles.sectionDescription}>
            我们的成长离不开每一位用户的支持
          </p>
        </div>

        <Row gutter={[24, 24]} className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className={styles.statCard}>
                <div className={styles.statIconWrapper}>{stat.icon}</div>
                <Statistic value={stat.title} className={styles.statValue} />
                <p className={styles.statDescription}>{stat.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default StatsSection;
