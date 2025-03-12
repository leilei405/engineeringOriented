"use client";

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
  Space,
  Row,
  Col,
  Breadcrumb,
  Table,
  Checkbox,
  Tooltip,
  Modal,
  InputNumber,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

// 可拖拽的表格列项
const DraggableRow = ({ children, ...props }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
    ...(isDragging ? { background: "rgba(24, 144, 255, 0.1)" } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </tr>
  );
};

const TableCreate = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [columns, setColumns] = useState<any[]>([
    {
      key: "1",
      title: "序号",
      dataIndex: "id",
      width: 80,
      fixed: true,
      type: "number",
    },
    {
      key: "2",
      title: "基站名称",
      dataIndex: "name",
      width: 150,
      type: "string",
    },
    {
      key: "3",
      title: "基站类型",
      dataIndex: "type",
      width: 120,
      type: "string",
    },
    {
      key: "4",
      title: "所属区域",
      dataIndex: "area",
      width: 150,
      type: "string",
    },
    {
      key: "5",
      title: "连接数",
      dataIndex: "connections",
      width: 100,
      type: "number",
    },
  ]);
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false);
  const [currentColumn, setCurrentColumn] = useState<any>(null);
  const [columnForm] = Form.useForm();

  // 模拟数据
  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "基站A",
      type: "4G",
      area: "石家庄",
      connections: 1245,
    },
    {
      key: "2",
      id: 2,
      name: "基站B",
      type: "5G",
      area: "石家庄",
      connections: 2456,
    },
    {
      key: "3",
      id: 3,
      name: "基站C",
      type: "4G",
      area: "保定",
      connections: 987,
    },
  ];

  // 可用的指标列表
  const availableIndicators = [
    { label: "4G连接基站数", value: "station4g" },
    { label: "5G连接基站数", value: "station5g" },
    { label: "连接基站数", value: "stationTotal" },
    { label: "用户数", value: "userCount" },
    { label: "网络覆盖率", value: "coverage" },
    { label: "流量使用量", value: "dataUsage" },
  ];

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
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="tableName"
                label="表格名称"
                rules={[{ required: true, message: "请输入表格名称" }]}
              >
                <Input placeholder="请输入表格名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="periodType"
                label="数据期间"
                rules={[{ required: true, message: "请选择数据期间" }]}
              >
                <Select placeholder="请选择">
                  <Option value="day">日</Option>
                  <Option value="month">月</Option>
                  <Option value="quarter">季</Option>
                  <Option value="year">年</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="tableDesc" label="表格描述">
            <TextArea rows={4} placeholder="请输入表格描述" />
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

          <Form.Item
            name="dataSource"
            label="数据来源"
            rules={[{ required: true, message: "请选择数据来源" }]}
          >
            <Select placeholder="请选择">
              <Option value="indicator">指标数据</Option>
              <Option value="api">API接口</Option>
              <Option value="manual">人工填报</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="状态">
            <Radio.Group>
              <Radio value="active">启用</Radio>
              <Radio value="inactive">停用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "表格设计",
      content: (
        <div>
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setCurrentColumn(null);
                  columnForm.resetFields();
                  setIsColumnModalVisible(true);
                }}
              >
                添加列
              </Button>
              <span style={{ marginLeft: 8, color: "rgba(0, 0, 0, 0.45)" }}>
                拖动行可调整列顺序
              </span>
            </div>
            <Space>
              <Button icon={<EyeOutlined />}>预览表格</Button>
            </Space>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={columns.map((col) => col.key)}
              strategy={verticalListSortingStrategy}
            >
              <Table
                components={{
                  body: {
                    row: DraggableRow,
                  },
                }}
                rowKey="key"
                columns={[
                  {
                    title: "列名称",
                    dataIndex: "title",
                    key: "title",
                  },
                  {
                    title: "字段",
                    dataIndex: "dataIndex",
                    key: "dataIndex",
                  },
                  {
                    title: "数据类型",
                    dataIndex: "type",
                    key: "type",
                  },
                  {
                    title: "宽度",
                    dataIndex: "width",
                    key: "width",
                  },
                  {
                    title: "固定",
                    dataIndex: "fixed",
                    key: "fixed",
                    render: (fixed: boolean) => (fixed ? "是" : "否"),
                  },
                  {
                    title: "操作",
                    key: "action",
                    render: (_: any, record: any) => (
                      <Space size="small">
                        <Button
                          type="text"
                          icon={<EditOutlined />}
                          onClick={() => {
                            setCurrentColumn(record);
                            columnForm.setFieldsValue({
                              title: record.title,
                              dataIndex: record.dataIndex,
                              type: record.type,
                              width: record.width,
                              fixed: record.fixed,
                            });
                            setIsColumnModalVisible(true);
                          }}
                        >
                          编辑
                        </Button>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteColumn(record.key)}
                        >
                          删除
                        </Button>
                      </Space>
                    ),
                  },
                ]}
                dataSource={columns}
                pagination={false}
              />
            </SortableContext>
          </DndContext>

          <Divider />

          <h3>数据预览</h3>
          <Table
            columns={columns.map((col) => ({
              title: col.title,
              dataIndex: col.dataIndex,
              key: col.key,
              width: col.width,
              fixed: col.fixed ? "left" : undefined,
            }))}
            dataSource={dataSource}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </div>
      ),
    },
    {
      title: "数据绑定",
      content: (
        <div>
          <Form layout="vertical">
            <Form.Item
              label={
                <span>
                  选择数据指标
                  <Tooltip title="选择要在表格中显示的指标数据">
                    <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                  </Tooltip>
                </span>
              }
            >
              <Row gutter={[16, 16]}>
                {availableIndicators.map((indicator) => (
                  <Col span={8} key={indicator.value}>
                    <Checkbox value={indicator.value}>
                      {indicator.label}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Form.Item>

            <Form.Item label="数据过滤条件">
              <Card>
                <div style={{ marginBottom: 16 }}>
                  <Select
                    style={{ width: 150, marginRight: 8 }}
                    placeholder="选择字段"
                    options={columns.map((col) => ({
                      label: col.title,
                      value: col.dataIndex,
                    }))}
                  />
                  <Select
                    style={{ width: 100, marginRight: 8 }}
                    placeholder="条件"
                    options={[
                      { label: "等于", value: "eq" },
                      { label: "不等于", value: "neq" },
                      { label: "大于", value: "gt" },
                      { label: "小于", value: "lt" },
                      { label: "包含", value: "contains" },
                    ]}
                  />
                  <Input
                    style={{ width: 200, marginRight: 8 }}
                    placeholder="输入值"
                  />
                  <Button type="primary">添加</Button>
                </div>
                <div>
                  <p>暂无过滤条件</p>
                </div>
              </Card>
            </Form.Item>

            <Form.Item label="数据排序">
              <Card>
                <div style={{ marginBottom: 16 }}>
                  <Select
                    style={{ width: 150, marginRight: 8 }}
                    placeholder="选择字段"
                    options={columns.map((col) => ({
                      label: col.title,
                      value: col.dataIndex,
                    }))}
                  />
                  <Select
                    style={{ width: 100, marginRight: 8 }}
                    placeholder="排序方式"
                    options={[
                      { label: "升序", value: "asc" },
                      { label: "降序", value: "desc" },
                    ]}
                  />
                  <Button type="primary">添加</Button>
                </div>
                <div>
                  <p>暂无排序条件</p>
                </div>
              </Card>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "样式设置",
      content: (
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="表格主题">
                <Radio.Group defaultValue="default">
                  <Radio value="default">默认主题</Radio>
                  <Radio value="striped">条纹主题</Radio>
                  <Radio value="bordered">边框主题</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="表格大小">
                <Radio.Group defaultValue="default">
                  <Radio value="large">大</Radio>
                  <Radio value="default">中</Radio>
                  <Radio value="small">小</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="表头背景色">
                <Input
                  type="color"
                  defaultValue="#f0f0f0"
                  style={{ width: 120 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="表头文字颜色">
                <Input
                  type="color"
                  defaultValue="#000000"
                  style={{ width: 120 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="行背景色（偶数行）">
                <Input
                  type="color"
                  defaultValue="#ffffff"
                  style={{ width: 120 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="行背景色（奇数行）">
                <Input
                  type="color"
                  defaultValue="#f9f9f9"
                  style={{ width: 120 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="表格预览">
            <div
              style={{
                border: "1px solid #f0f0f0",
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Table
                columns={columns.map((col) => ({
                  title: col.title,
                  dataIndex: col.dataIndex,
                  key: col.key,
                  width: col.width,
                }))}
                dataSource={dataSource.slice(0, 2)}
                pagination={false}
                size="small"
              />
            </div>
          </Form.Item>
        </Form>
      ),
    },
  ];

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.key === active.id);
        const newIndex = items.findIndex((item) => item.key === over.id);

        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);

        return newItems;
      });
    }
  }

  function handleDeleteColumn(key: string) {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这一列吗？",
      onOk: () => {
        setColumns(columns.filter((col) => col.key !== key));
      },
    });
  }

  function handleAddOrUpdateColumn(values: any) {
    if (currentColumn) {
      // 更新列
      setColumns(
        columns.map((col) =>
          col.key === currentColumn.key ? { ...col, ...values } : col
        )
      );
    } else {
      // 添加新列
      const newColumn = {
        key: `${Date.now()}`,
        ...values,
      };
      setColumns([...columns, newColumn]);
    }
    setIsColumnModalVisible(false);
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
    console.log("表格列:", columns);
    // 保存成功后跳转到列表页
    navigate("/tables");
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link> },
          { title: <Link to="/tables">表格管理</Link> },
          { title: "新增表格" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: 16 }}
          onClick={() => navigate("/tables")}
        />
        <h1>新增表格</h1>
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
            <Button onClick={() => navigate("/tables")}>取消</Button>
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

      {/* 列编辑弹窗 */}
      <Modal
        title={currentColumn ? "编辑列" : "添加列"}
        open={isColumnModalVisible}
        onCancel={() => setIsColumnModalVisible(false)}
        onOk={() => columnForm.submit()}
        destroyOnClose
      >
        <Form
          form={columnForm}
          layout="vertical"
          onFinish={handleAddOrUpdateColumn}
        >
          <Form.Item
            name="title"
            label="列名称"
            rules={[{ required: true, message: "请输入列名称" }]}
          >
            <Input placeholder="请输入列名称" />
          </Form.Item>
          <Form.Item
            name="dataIndex"
            label="字段名"
            rules={[{ required: true, message: "请输入字段名" }]}
          >
            <Input placeholder="请输入字段名" />
          </Form.Item>
          <Form.Item
            name="type"
            label="数据类型"
            rules={[{ required: true, message: "请选择数据类型" }]}
          >
            <Select placeholder="请选择">
              <Option value="string">文本</Option>
              <Option value="number">数字</Option>
              <Option value="date">日期</Option>
              <Option value="boolean">布尔值</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="width"
            label="列宽度"
            rules={[{ required: true, message: "请输入列宽度" }]}
          >
            <InputNumber
              min={50}
              max={500}
              placeholder="请输入列宽度"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="fixed" valuePropName="checked" label="是否固定列">
            <Checkbox>固定在左侧</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableCreate;
