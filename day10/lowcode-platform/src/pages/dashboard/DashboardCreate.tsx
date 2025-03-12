"use client";

import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Card,
  Steps,
  Divider,
  Row,
  Col,
  Breadcrumb,
  InputNumber,
} from "antd";
import {
  ArrowLeftOutlined,
  DashboardOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DotChartOutlined,
  TableOutlined,
  FileTextOutlined,
  PictureOutlined,
  DragOutlined,
} from "@ant-design/icons";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

// 拖拽组件
const DraggableComponent = ({
  id,
  children,
  type,
}: {
  id: string;
  children: React.ReactNode;
  type: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { type },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

// 放置区域
const DroppableArea = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: "droppable-area",
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: "#1E0047",
        position: "relative",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};

// 组件项
const ComponentItem = ({
  icon,
  label,
  type,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
}) => {
  return (
    <DraggableComponent id={`${type}-${Date.now()}`} type={type}>
      <div className="component-item">
        <div className="component-item-icon">{icon}</div>
        <div className="component-item-text">{label}</div>
      </div>
    </DraggableComponent>
  );
};

const DashboardCreate = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [dashboardItems, setDashboardItems] = useState<
    Array<{
      id: string;
      type: string;
      x: number;
      y: number;
      width: number;
      height: number;
    }>
  >([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const steps = [
    {
      title: "基本信息",
      content: (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: "active",
            width: 1920,
            height: 1080,
            backgroundColor: "#1E0047",
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="dashboardName"
                label="大屏名称"
                rules={[{ required: true, message: "请输入大屏名称" }]}
              >
                <Input placeholder="请输入大屏名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="periodType"
                label="数据期间"
                rules={[{ required: true, message: "请选择数据期间" }]}
              >
                <Select placeholder="请选择">
                  <Option value="realtime">实时</Option>
                  <Option value="daily">日</Option>
                  <Option value="monthly">月</Option>
                  <Option value="quarterly">季</Option>
                  <Option value="yearly">年</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="dashboardDesc" label="大屏描述">
            <TextArea rows={4} placeholder="请输入大屏描述" />
          </Form.Item>

          <Form.Item
            name="viewPermission"
            label="查看权限"
            rules={[{ required: true, message: "请选择查看权限" }]}
          >
            <Select placeholder="请选择">
              <Option value="all">全部</Option>
              <Option value="province">省公司</Option>
              <Option value="city">地市公司</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="状态">
            <Radio.Group>
              <Radio value="active">启用</Radio>
              <Radio value="inactive">停用</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="大屏尺寸">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="width" label="宽度" noStyle>
                  <InputNumber min={800} max={3840} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="height" label="高度" noStyle>
                  <InputNumber min={600} max={2160} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item name="backgroundColor" label="背景色">
            <Row gutter={16}>
              <Col span={4}>
                <Input type="color" />
              </Col>
              <Col span={8}>
                <Input />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "大屏设计",
      content: (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="dashboard-designer">
            <div className="component-panel">
              <h3>组件库</h3>
              <Divider />

              <h4>文本与图片</h4>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <ComponentItem
                    icon={<FileTextOutlined style={{ fontSize: 24 }} />}
                    label="文本"
                    type="text"
                  />
                </Col>
                <Col span={12}>
                  <ComponentItem
                    icon={<PictureOutlined style={{ fontSize: 24 }} />}
                    label="图片"
                    type="image"
                  />
                </Col>
              </Row>

              <h4 style={{ marginTop: 16 }}>指标</h4>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <ComponentItem
                    icon={<DotChartOutlined style={{ fontSize: 24 }} />}
                    label="指标卡片"
                    type="indicator"
                  />
                </Col>
                <Col span={12}>
                  <ComponentItem
                    icon={<DotChartOutlined style={{ fontSize: 24 }} />}
                    label="进度图"
                    type="progress"
                  />
                </Col>
              </Row>

              <h4 style={{ marginTop: 16 }}>图表</h4>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <ComponentItem
                    icon={<BarChartOutlined style={{ fontSize: 24 }} />}
                    label="柱状图"
                    type="bar"
                  />
                </Col>
                <Col span={12}>
                  <ComponentItem
                    icon={<LineChartOutlined style={{ fontSize: 24 }} />}
                    label="曲线图"
                    type="line"
                  />
                </Col>
                <Col span={12}>
                  <ComponentItem
                    icon={<PieChartOutlined style={{ fontSize: 24 }} />}
                    label="饼状图"
                    type="pie"
                  />
                </Col>
                <Col span={12}>
                  <ComponentItem
                    icon={<DashboardOutlined style={{ fontSize: 24 }} />}
                    label="仪表盘"
                    type="gauge"
                  />
                </Col>
              </Row>

              <h4 style={{ marginTop: 16 }}>表格</h4>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <ComponentItem
                    icon={<TableOutlined style={{ fontSize: 24 }} />}
                    label="表格"
                    type="table"
                  />
                </Col>
              </Row>
            </div>

            <DroppableArea>
              {dashboardItems.map((item) => (
                <div
                  key={item.id}
                  className="dashboard-item"
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                  }}
                >
                  {getIconForType(item.type)}
                  <div className="dashboard-item-handle">
                    <DragOutlined className="dashboard-item-icon" />
                  </div>
                </div>
              ))}

              <DragOverlay>
                {activeId ? (
                  <div
                    style={{
                      width: 200,
                      height: 150,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "2px dashed rgba(255, 255, 255, 0.3)",
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getIconForType(activeId.split("-")[0])}
                  </div>
                ) : null}
              </DragOverlay>
            </DroppableArea>
          </div>
        </DndContext>
      ),
    },
    {
      title: "预览",
      content: (
        <div>
          <Card title="大屏预览">
            <div
              className="dashboard-preview"
              style={{
                height: 600,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "rgba(255, 255, 255, 0.7)",
                  textAlign: "center",
                }}
              >
                <DashboardOutlined style={{ fontSize: 64, marginBottom: 16 }} />
                <p>大屏预览</p>
              </div>

              {dashboardItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getIconForType(item.type)}
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
  ];

  function getIconForType(type: string) {
    const style = { fontSize: 32, color: "rgba(255, 255, 255, 0.7)" };

    switch (type) {
      case "text":
        return <FileTextOutlined style={style} />;
      case "image":
        return <PictureOutlined style={style} />;
      case "indicator":
        return <DotChartOutlined style={style} />;
      case "progress":
        return <DotChartOutlined style={style} />;
      case "bar":
        return <BarChartOutlined style={style} />;
      case "line":
        return <LineChartOutlined style={style} />;
      case "pie":
        return <PieChartOutlined style={style} />;
      case "gauge":
        return <DashboardOutlined style={style} />;
      case "table":
        return <TableOutlined style={style} />;
      default:
        return <DashboardOutlined style={style} />;
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);

    const { active, over } = event;

    if (over && over.id === "droppable-area") {
      // 获取拖拽结束时的坐标
      const { x, y } = event.delta;

      // 获取组件类型
      const type = (active.id as string).split("-")[0];

      // 添加新组件到大屏
      setDashboardItems([
        ...dashboardItems,
        {
          id: active.id as string,
          type,
          x: x,
          y: y,
          width: 200,
          height: 150,
        },
      ]);
    }
  }

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    // 保存逻辑
    console.log("表单数据:", form.getFieldsValue());
    console.log("大屏组件:", dashboardItems);
    // 保存成功后跳转到列表页
    navigate("/dashboards");
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link> },
          { title: <Link to="/dashboards">大屏管理</Link> },
          { title: "新增大屏" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: 16 }}
          onClick={() => navigate("/dashboards")}
        />
        <h1>新增大屏</h1>
      </div>

      <Card>
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div>{steps[currentStep].content}</div>

        <Divider />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {currentStep > 0 && <Button onClick={prev}>上一步</Button>}
          {currentStep === 0 && (
            <Button onClick={() => navigate("/dashboards")}>取消</Button>
          )}
          <div>
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                下一步
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleSave}>
                保存
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCreate;
