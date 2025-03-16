import React from "react";
import { Breadcrumb, Button, Card, Steps, Divider, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  DragOutlined,
  SettingOutlined,
  CodeOutlined,
  PlayCircleOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styles from "./LowCodePage.module.scss";

const { Step } = Steps;

const LowCodePage: React.FC = () => {
  return (
    <div className={styles.lowCodePage}>
      <div className="container">
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined /> 首页
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <AppstoreOutlined /> 低代码平台
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>低代码平台</h1>
          <p className={styles.pageDescription}>
            拖拽式低代码开发平台，快速构建应用，无需编写大量代码
          </p>
          <div className={styles.headerButtons}>
            <Button type="primary" size="large">
              开始使用
            </Button>
            <Button size="large">查看文档</Button>
          </div>
        </div>

        <div className={styles.platformDemo}>
          <div className={styles.demoHeader}>
            <h2 className={styles.demoTitle}>可视化搭建流程</h2>
            <p className={styles.demoDescription}>
              通过简单的拖拽操作，快速构建功能完善的应用
            </p>
          </div>

          <Steps current={1} className={styles.demoSteps}>
            <Step title="拖拽组件" icon={<DragOutlined />} />
            <Step title="配置属性" icon={<SettingOutlined />} />
            <Step title="绑定数据" icon={<CodeOutlined />} />
            <Step title="预览测试" icon={<PlayCircleOutlined />} />
            <Step title="发布应用" icon={<CloudUploadOutlined />} />
          </Steps>

          <div className={styles.demoPreview}>
            <div className={styles.demoEditor}>
              <div className={styles.editorSidebar}>
                <div className={styles.sidebarTitle}>组件库</div>
                <div className={styles.componentList}>
                  <div className={styles.componentItem}>
                    <div className={styles.componentIcon}>
                      <AppstoreOutlined />
                    </div>
                    <div className={styles.componentName}>表单</div>
                  </div>
                  <div className={styles.componentItem}>
                    <div className={styles.componentIcon}>
                      <AppstoreOutlined />
                    </div>
                    <div className={styles.componentName}>表格</div>
                  </div>
                  <div className={styles.componentItem}>
                    <div className={styles.componentIcon}>
                      <AppstoreOutlined />
                    </div>
                    <div className={styles.componentName}>图表</div>
                  </div>
                  <div className={styles.componentItem}>
                    <div className={styles.componentIcon}>
                      <AppstoreOutlined />
                    </div>
                    <div className={styles.componentName}>按钮</div>
                  </div>
                  <div className={styles.componentItem}>
                    <div className={styles.componentIcon}>
                      <AppstoreOutlined />
                    </div>
                    <div className={styles.componentName}>卡片</div>
                  </div>
                </div>
              </div>
              <div className={styles.editorCanvas}>
                <div className={styles.canvasHeader}>
                  <div className={styles.canvasTitle}>画布</div>
                  <div className={styles.canvasControls}>
                    <Button type="text" icon={<PlayCircleOutlined />}>
                      预览
                    </Button>
                    <Button type="text" icon={<CloudUploadOutlined />}>
                      保存
                    </Button>
                  </div>
                </div>
                <div className={styles.canvasContent}>
                  <div className={styles.canvasPlaceholder}>
                    <DragOutlined className={styles.placeholderIcon} />
                    <div className={styles.placeholderText}>拖拽组件到此处</div>
                  </div>
                </div>
              </div>
              <div className={styles.editorProperties}>
                <div className={styles.propertiesTitle}>属性配置</div>
                <div className={styles.propertiesContent}>
                  <div className={styles.propertyGroup}>
                    <div className={styles.propertyTitle}>基础属性</div>
                    <div className={styles.propertyItem}>
                      <div className={styles.propertyLabel}>标题</div>
                      <div className={styles.propertyValue}>
                        <div className={styles.propertyInput}></div>
                      </div>
                    </div>
                    <div className={styles.propertyItem}>
                      <div className={styles.propertyLabel}>宽度</div>
                      <div className={styles.propertyValue}>
                        <div className={styles.propertyInput}></div>
                      </div>
                    </div>
                    <div className={styles.propertyItem}>
                      <div className={styles.propertyLabel}>高度</div>
                      <div className={styles.propertyValue}>
                        <div className={styles.propertyInput}></div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.propertyGroup}>
                    <div className={styles.propertyTitle}>样式属性</div>
                    <div className={styles.propertyItem}>
                      <div className={styles.propertyLabel}>背景色</div>
                      <div className={styles.propertyValue}>
                        <div className={styles.propertyInput}></div>
                      </div>
                    </div>
                    <div className={styles.propertyItem}>
                      <div className={styles.propertyLabel}>边框</div>
                      <div className={styles.propertyValue}>
                        <div className={styles.propertyInput}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className={styles.features}>
          <h2 className={styles.featuresTitle}>核心功能</h2>

          <Row gutter={[24, 24]} className={styles.featuresGrid}>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <DragOutlined />
                </div>
                <h3 className={styles.featureTitle}>拖拽式开发</h3>
                <p className={styles.featureDescription}>
                  通过简单的拖拽操作，快速搭建应用界面，无需编写复杂代码
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <SettingOutlined />
                </div>
                <h3 className={styles.featureTitle}>可视化配置</h3>
                <p className={styles.featureDescription}>
                  所见即所得的界面配置，实时预览效果，快速调整组件属性
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <CodeOutlined />
                </div>
                <h3 className={styles.featureTitle}>逻辑编排</h3>
                <p className={styles.featureDescription}>
                  可视化的业务逻辑编排，支持条件判断、循环、API调用等操作
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <AppstoreOutlined />
                </div>
                <h3 className={styles.featureTitle}>丰富组件</h3>
                <p className={styles.featureDescription}>
                  内置50+常用组件，覆盖表单、表格、图表、地图等多种场景
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <CloudUploadOutlined />
                </div>
                <h3 className={styles.featureTitle}>一键发布</h3>
                <p className={styles.featureDescription}>
                  支持一键发布应用，自动生成部署包，快速部署到云端或本地服务器
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <CheckCircleOutlined />
                </div>
                <h3 className={styles.featureTitle}>模板复用</h3>
                <p className={styles.featureDescription}>
                  支持将常用功能保存为模板，在不同项目中复用，提高开发效率
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default LowCodePage;
