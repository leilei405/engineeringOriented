"use client";
import type React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import {
  RightOutlined,
  CodeOutlined,
  DatabaseOutlined,
  LayoutOutlined,
  BgColorsOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./ProjectsSection.module.scss";

const { Meta } = Card;

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: "components",
      title: "组件库",
      description: "高质量的React组件库，包含50+组件，支持暗黑模式和主题定制",
      icon: <BgColorsOutlined className={styles.projectIcon} />,
      tags: ["React", "TypeScript", "SCSS"],
      href: "/components",
    },
    {
      id: "lowcode",
      title: "低代码平台",
      description: "拖拽式低代码开发平台，快速构建应用，无需编写大量代码",
      icon: <LayoutOutlined className={styles.projectIcon} />,
      tags: ["React", "Ant Design", "JSON Schema"],
      href: "/lowcode",
    },
    {
      id: "api",
      title: "在线接口",
      description: "RESTful API接口管理平台，支持在线调试、文档生成和Mock数据",
      icon: <DatabaseOutlined className={styles.projectIcon} />,
      tags: ["Nest.js", "Swagger", "TypeORM"],
      href: "/api",
    },
    {
      id: "visual",
      title: "可视化逻辑编排",
      description: "流程图式的逻辑编排工具，可视化构建业务逻辑和数据流",
      icon: <ApiOutlined className={styles.projectIcon} />,
      tags: ["React Flow", "Redux", "WebSocket"],
      href: "/visual",
    },
    {
      id: "blog",
      title: "技术博客",
      description: "分享前端开发经验、技术教程和行业动态",
      icon: <CodeOutlined className={styles.projectIcon} />,
      tags: ["React", "MDX", "Vercel"],
      href: "/blog",
    },
  ];

  return (
    <section className={styles.projectsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>{t("projects.title")}</div>
          <h2 className={styles.sectionTitle}>探索我的项目</h2>
          <p className={styles.sectionDescription}>
            精心打造的前端解决方案，满足不同开发场景的需求
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <Card
              key={project.id}
              className={styles.projectCard}
              actions={[
                <Link to={project.href} key="details">
                  <Button type="link" className={styles.detailsButton}>
                    查看详情
                    <RightOutlined />
                  </Button>
                </Link>,
              ]}
            >
              <div className={styles.projectHeader}>
                <div className={styles.projectIconWrapper}>{project.icon}</div>
                <Meta title={project.title} description={project.description} />
              </div>
              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.projectTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.sectionFooter}>
          <Link to="/projects">
            <Button className={styles.viewAllButton}>
              查看全部项目
              <RightOutlined />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
