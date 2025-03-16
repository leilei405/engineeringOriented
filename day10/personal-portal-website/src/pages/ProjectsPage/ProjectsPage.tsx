import React from "react";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ProjectOutlined,
  FilterOutlined,
} from "@ant-design/icons";
// import { useLanguage } from '../../contexts/LanguageContext';
import styles from "./ProjectsPage.module.scss";

// 导入项目网格组件
import ProjectsGrid from "../../components/ProjectsGrid/ProjectsGrid";

const ProjectsPage: React.FC = () => {
  // const { t } = useLanguage();

  return (
    <div className={styles.projectsPage}>
      <div className="container">
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined /> 首页
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <ProjectOutlined /> 项目
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>项目展示</h1>
          <p className={styles.pageDescription}>
            探索我开发的各种前端项目和解决方案，包括组件库、低代码平台、API接口和可视化工具等
          </p>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterTags}>
            <Button type="primary" className={styles.filterTag}>
              全部
            </Button>
            <Button className={styles.filterTag}>组件库</Button>
            <Button className={styles.filterTag}>低代码</Button>
            <Button className={styles.filterTag}>API</Button>
            <Button className={styles.filterTag}>可视化</Button>
            <Button className={styles.filterTag}>模板</Button>
          </div>
          <Button icon={<FilterOutlined />}>筛选</Button>
        </div>

        <ProjectsGrid />
      </div>
    </div>
  );
};

export default ProjectsPage;
