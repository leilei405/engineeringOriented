import React from "react";
import { Breadcrumb, Button, Card, Tabs, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  NodeIndexOutlined,
  PlayCircleOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined,
  CodeOutlined,
  ApiOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import styles from "./VisualPage.module.scss";

const { TabPane } = Tabs;

const VisualPage: React.FC = () => {
  return (
    <div className={styles.visualPage}>
      <div className="container">
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined /> 首页
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NodeIndexOutlined /> 可视化逻辑编排
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>可视化逻辑编排</h1>
          <p className={styles.pageDescription}>
            流程图式的逻辑编排工具，可视化构建业务逻辑和数据流
          </p>
          <div className={styles.headerButtons}>
            <Button type="primary" size="large">
              开始使用
            </Button>
            <Button size="large">查看文档</Button>
          </div>
        </div>

        <Card className={styles.visualEditor}>
          <div className={styles.editorHeader}>
            <div className={styles.editorTitle}>
              <h2>流程编辑器</h2>
            </div>
            <div className={styles.editorActions}>
              <Button icon={<PlayCircleOutlined />}>运行</Button>
              <Button icon={<SaveOutlined />}>保存</Button>
              <Button icon={<CodeOutlined />}>查看代码</Button>
            </div>
          </div>

          <div className={styles.editorContent}>
            <div className={styles.editorSidebar}>
              <Tabs defaultActiveKey="nodes">
                <TabPane tab="节点" key="nodes">
                  <div className={styles.nodeList}>
                    <div className={styles.nodeCategory}>基础节点</div>
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIcon}>
                        <PlusOutlined />
                      </div>
                      <div className={styles.nodeName}>开始</div>
                    </div>
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIcon}>
                        <DeleteOutlined />
                      </div>
                      <div className={styles.nodeName}>结束</div>
                    </div>
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIcon}>
                        <SettingOutlined />
                      </div>
                      <div className={styles.nodeName}>条件</div>
                    </div>
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIcon}>
                        <CodeOutlined />
                      </div>
                      <div className={styles.nodeName}>脚本</div>
                    </div>

                    <div className={styles.nodeCategory}>数据节点</div>
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIcon}>
                        <ApiOutlined />
                      </div>
                      <div className={styles.nodeName}>API请求</div>
                    </div>
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIcon}>
                        <DatabaseOutlined />
                      </div>
                      <div className={styles.nodeName}>数据库</div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="模板" key="templates">
                  <div className={styles.templateList}>
                    <div className={styles.templateItem}>
                      <div className={styles.templateTitle}>用户登录</div>
                      <div className={styles.templateDescription}>
                        包含登录验证、Token生成等流程
                      </div>
                    </div>
                    <div className={styles.templateItem}>
                      <div className={styles.templateTitle}>数据同步</div>
                      <div className={styles.templateDescription}>
                        定时从外部API获取数据并存储
                      </div>
                    </div>
                    <div className={styles.templateItem}>
                      <div className={styles.templateTitle}>表单处理</div>
                      <div className={styles.templateDescription}>
                        表单数据验证、处理和存储流程
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>

            <div className={styles.editorCanvas}>
              <div className={styles.canvasContent}>
                <div
                  className={styles.flowNode}
                  style={{ top: "50px", left: "100px" }}
                >
                  <div className={styles.flowNodeHeader}>开始</div>
                </div>
                <div
                  className={styles.flowNode}
                  style={{ top: "150px", left: "250px" }}
                >
                  <div className={styles.flowNodeHeader}>API请求</div>
                </div>
                <div
                  className={styles.flowNode}
                  style={{ top: "250px", left: "400px" }}
                >
                  <div className={styles.flowNodeHeader}>条件</div>
                </div>
                <div
                  className={styles.flowNode}
                  style={{ top: "350px", left: "250px" }}
                >
                  <div className={styles.flowNodeHeader}>数据库</div>
                </div>
                <div
                  className={styles.flowNode}
                  style={{ top: "450px", left: "100px" }}
                >
                  <div className={styles.flowNodeHeader}>结束</div>
                </div>

                <svg className={styles.flowConnections}>
                  <path d="M120,80 L250,150" className={styles.flowPath} />
                  <path d="M270,180 L400,250" className={styles.flowPath} />
                  <path d="M400,280 L270,350" className={styles.flowPath} />
                  <path d="M250,380 L120,450" className={styles.flowPath} />
                </svg>
              </div>
            </div>

            <div className={styles.editorProperties}>
              <div className={styles.propertiesHeader}>
                <h3>属性配置</h3>
              </div>
              <div className={styles.propertiesContent}>
                <div className={styles.propertyGroup}>
                  <div className={styles.propertyTitle}>基本信息</div>
                  <div className={styles.propertyItem}>
                    <div className={styles.propertyLabel}>节点名称</div>
                    <div className={styles.propertyValue}>
                      <div className={styles.propertyInput}>API请求</div>
                    </div>
                  </div>
                  <div className={styles.propertyItem}>
                    <div className={styles.propertyLabel}>节点类型</div>
                    <div className={styles.propertyValue}>
                      <div className={styles.propertyInput}>API</div>
                    </div>
                  </div>
                </div>
                <div className={styles.propertyGroup}>
                  <div className={styles.propertyTitle}>API配置</div>
                  <div className={styles.propertyItem}>
                    <div className={styles.propertyLabel}>请求方法</div>
                    <div className={styles.propertyValue}>
                      <div className={styles.propertyInput}>GET</div>
                    </div>
                  </div>
                  <div className={styles.propertyItem}>
                    <div className={styles.propertyLabel}>请求地址</div>
                    <div className={styles.propertyValue}>
                      <div className={styles.propertyInput}>/api/users</div>
                    </div>
                  </div>
                  <div className={styles.propertyItem}>
                    <div className={styles.propertyLabel}>超时时间</div>
                    <div className={styles.propertyValue}>
                      <div className={styles.propertyInput}>5000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Divider />

        <div className={styles.features}>
          <h2 className={styles.featuresTitle}>核心功能</h2>

          <Row gutter={[24, 24]} className={styles.featuresGrid}>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <h3 className={styles.featureTitle}>可视化流程设计</h3>
                <p className={styles.featureDescription}>
                  通过拖拽方式设计流程图，直观呈现业务逻辑和数据流向
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <h3 className={styles.featureTitle}>丰富的节点类型</h3>
                <p className={styles.featureDescription}>
                  提供条件判断、循环、API调用、数据库操作等多种节点类型
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <h3 className={styles.featureTitle}>实时调试与测试</h3>
                <p className={styles.featureDescription}>
                  支持流程实时调试和测试，快速验证流程正确性
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <h3 className={styles.featureTitle}>代码自动生成</h3>
                <p className={styles.featureDescription}>
                  自动生成对应的代码，支持多种编程语言和框架
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <h3 className={styles.featureTitle}>版本管理</h3>
                <p className={styles.featureDescription}>
                  内置版本管理功能，记录流程变更历史，支持回滚操作
                </p>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.featureCard}>
                <h3 className={styles.featureTitle}>团队协作</h3>
                <p className={styles.featureDescription}>
                  支持多人协作编辑，实时同步流程变更，提高团队效率
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default VisualPage;
