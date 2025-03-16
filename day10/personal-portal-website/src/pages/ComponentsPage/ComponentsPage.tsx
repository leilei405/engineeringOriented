import React, { useState } from "react";
import { Breadcrumb, Tabs, Card, Button, Input, Tag, Divider } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import styles from "./ComponentsPage.module.scss";

const { TabPane } = Tabs;
const { Meta } = Card;

const ComponentsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const componentCategories = [
    { key: "all", tab: "全部" },
    { key: "basic", tab: "基础组件" },
    { key: "form", tab: "表单组件" },
    { key: "data", tab: "数据展示" },
    { key: "feedback", tab: "反馈组件" },
    { key: "navigation", tab: "导航组件" },
    { key: "layout", tab: "布局组件" },
  ];

  const components = [
    {
      id: "button",
      title: "Button 按钮",
      description: "按钮用于开始一个即时操作，触发业务逻辑时使用。",
      category: "basic",
      downloads: 12500,
      tags: ["基础", "交互"],
    },
    {
      id: "input",
      title: "Input 输入框",
      description: "通过鼠标或键盘输入内容，是最基础的表单域的包装。",
      category: "form",
      downloads: 11200,
      tags: ["表单", "数据录入"],
    },
    {
      id: "select",
      title: "Select 选择器",
      description: "下拉选择器，当选项过多时，使用下拉菜单展示并选择内容。",
      category: "form",
      downloads: 10800,
      tags: ["表单", "数据录入"],
    },
    {
      id: "table",
      title: "Table 表格",
      description: "展示行列数据，支持排序、筛选、分页等功能。",
      category: "data",
      downloads: 15200,
      tags: ["数据", "展示"],
    },
    {
      id: "modal",
      title: "Modal 对话框",
      description: "模态对话框，在当前页面打开一个浮层，承载相关操作。",
      category: "feedback",
      downloads: 9800,
      tags: ["反馈", "浮层"],
    },
    {
      id: "menu",
      title: "Menu 导航菜单",
      description: "为页面和功能提供导航的菜单列表。",
      category: "navigation",
      downloads: 8700,
      tags: ["导航", "菜单"],
    },
    {
      id: "layout",
      title: "Layout 布局",
      description: "协助进行页面级整体布局，支持响应式设计。",
      category: "layout",
      downloads: 7500,
      tags: ["布局", "结构"],
    },
    {
      id: "card",
      title: "Card 卡片",
      description: "最基础的卡片容器，可承载文字、列表、图片等内容。",
      category: "data",
      downloads: 9200,
      tags: ["数据", "容器"],
    },
  ];

  const filteredComponents = searchValue
    ? components.filter(
        (comp) =>
          comp.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          comp.description.toLowerCase().includes(searchValue.toLowerCase())
      )
    : components;

  return (
    <div className={styles.componentsPage}>
      <div className="container">
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined /> 首页
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <AppstoreOutlined /> 组件库
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>组件库</h1>
          <p className={styles.pageDescription}>
            高质量的React组件库，包含50+组件，支持暗黑模式和主题定制
          </p>

          <div className={styles.searchBar}>
            <Input
              size="large"
              placeholder="搜索组件..."
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <Tabs defaultActiveKey="all" className={styles.componentTabs}>
          {componentCategories.map((category) => (
            <TabPane tab={category.tab} key={category.key}>
              <div className={styles.componentsGrid}>
                {filteredComponents
                  .filter(
                    (comp) =>
                      category.key === "all" || comp.category === category.key
                  )
                  .map((component) => (
                    <Card key={component.id} className={styles.componentCard}>
                      <Meta
                        title={component.title}
                        description={component.description}
                      />
                      <div className={styles.componentTags}>
                        {component.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                      <Divider />
                      <div className={styles.componentFooter}>
                        <div className={styles.componentDownloads}>
                          <DownloadOutlined />{" "}
                          {component.downloads.toLocaleString()}
                        </div>
                        <div className={styles.componentActions}>
                          <Button type="text" icon={<EyeOutlined />}>
                            预览
                          </Button>
                          <Button type="text" icon={<CodeOutlined />}>
                            文档
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ComponentsPage;
