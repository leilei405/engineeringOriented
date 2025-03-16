import React from "react";
import { Card, Button, Tag, Rate } from "antd";
import { Link } from "react-router-dom";
import {
  RightOutlined,
  CodeOutlined,
  DatabaseOutlined,
  LayoutOutlined,
  BgColorsOutlined,
  ApiOutlined,
  EyeOutlined,
  StarOutlined,
  ForkOutlined,
} from "@ant-design/icons";
import styles from "./ProjectsGrid.module.scss";

const { Meta } = Card;

const ProjectsGrid: React.FC = () => {
  const projects = [
    {
      id: "components",
      title: "组件库",
      description: "高质量的React组件库，包含50+组件，支持暗黑模式和主题定制",
      icon: <BgColorsOutlined className={styles.projectIcon} />,
      tags: ["React", "TypeScript", "SCSS"],
      stars: 4.8,
      views: 12500,
      forks: 320,
      href: "/components",
    },
    {
      id: "admin-dashboard",
      title: "管理后台模板",
      description:
        "基于React和Ant Design的管理后台模板，包含多种布局和常用功能",
      icon: <LayoutOutlined className={styles.projectIcon} />,
      tags: ["React", "Ant Design", "Redux"],
      stars: 4.6,
      views: 8700,
      forks: 210,
      href: "/templates/admin",
    },
    {
      id: "lowcode",
      title: "低代码平台",
      description: "拖拽式低代码开发平台，快速构建应用，无需编写大量代码",
      icon: <LayoutOutlined className={styles.projectIcon} />,
      tags: ["React", "Ant Design", "JSON Schema"],
      stars: 4.9,
      views: 15200,
      forks: 450,
      href: "/lowcode",
    },
    {
      id: "api",
      title: "在线接口",
      description: "RESTful API接口管理平台，支持在线调试、文档生成和Mock数据",
      icon: <DatabaseOutlined className={styles.projectIcon} />,
      tags: ["Nest.js", "Swagger", "TypeORM"],
      stars: 4.7,
      views: 9800,
      forks: 280,
      href: "/api",
    },
    {
      id: "visual",
      title: "可视化逻辑编排",
      description: "流程图式的逻辑编排工具，可视化构建业务逻辑和数据流",
      icon: <ApiOutlined className={styles.projectIcon} />,
      tags: ["React Flow", "Redux", "WebSocket"],
      stars: 4.8,
      views: 11200,
      forks: 340,
      href: "/visual",
    },
    {
      id: "blog",
      title: "技术博客",
      description: "分享前端开发经验、技术教程和行业动态",
      icon: <CodeOutlined className={styles.projectIcon} />,
      tags: ["React", "MDX", "Vercel"],
      stars: 4.5,
      views: 7500,
      forks: 180,
      href: "/blog",
    },
    {
      id: "e-commerce",
      title: "电商网站模板",
      description: "响应式电商网站模板，包含商品展示、购物车、结算等功能",
      icon: <LayoutOutlined className={styles.projectIcon} />,
      tags: ["React", "Stripe", "MongoDB"],
      stars: 4.6,
      views: 8900,
      forks: 230,
      href: "/templates/ecommerce",
    },
    {
      id: "data-visualization",
      title: "数据可视化工具",
      description: "基于ECharts的数据可视化工具，支持多种图表类型和交互方式",
      icon: <CodeOutlined className={styles.projectIcon} />,
      tags: ["React", "ECharts", "D3.js"],
      stars: 4.7,
      views: 10200,
      forks: 290,
      href: "/visual/data",
    },
  ];

  return (
    <div className={styles.projectsGrid}>
      {projects.map((project) => (
        <Card
          key={project.id}
          className={styles.projectCard}
          cover={
            <div className={styles.projectCover}>
              <div className={styles.projectIconLarge}>{project.icon}</div>
            </div>
          }
          actions={[
            <div key="views" className={styles.projectStat}>
              <EyeOutlined /> {project.views.toLocaleString()}
            </div>,
            <div key="stars" className={styles.projectStat}>
              <StarOutlined /> {project.stars}
            </div>,
            <div key="forks" className={styles.projectStat}>
              <ForkOutlined /> {project.forks}
            </div>,
          ]}
        >
          <Meta title={project.title} description={project.description} />
          <div className={styles.projectTags}>
            {project.tags.map((tag) => (
              <Tag key={tag} className={styles.projectTag}>
                {tag}
              </Tag>
            ))}
          </div>
          <div className={styles.projectRating}>
            <Rate disabled defaultValue={project.stars} allowHalf />
          </div>
          <Link to={project.href}>
            <Button type="primary" className={styles.viewButton} block>
              查看详情 <RightOutlined />
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsGrid;
