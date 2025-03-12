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
  Divider,
  Space,
  Row,
  Col,
  Breadcrumb,
  Table,
  Tag,
  Tooltip,
  message,
  Modal,
  TableColumnsType,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

// 责任类型
const responsibilityTypes = [
  {
    label: "R - 负责",
    value: "R",
    color: "green",
    description: "负责执行任务并对结果负责",
  },
  {
    label: "A - 批准",
    value: "A",
    color: "blue",
    description: "批准任务的执行和结果",
  },
  {
    label: "C - 咨询",
    value: "C",
    color: "orange",
    description: "在任务执行前需要咨询的角色",
  },
  {
    label: "I - 知情",
    value: "I",
    color: "purple",
    description: "需要知道任务的执行情况",
  },
  {
    label: "S - 支持",
    value: "S",
    color: "cyan",
    description: "为任务提供支持和资源",
  },
];

interface DataType {
  key: React.Key;
}

const MatrixCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [roles, setRoles] = useState<string[]>([
    "网络工程师",
    "运维主管",
    "网络架构师",
  ]);

  const [tasks, setTasks] = useState<string[]>([
    "网络监控",
    "故障处理",
    "性能优化",
    "安全管理",
  ]);

  const [matrixData, setMatrixData] = useState<
    Record<string, Record<string, string>>
  >({
    网络监控: { 网络工程师: "R", 运维主管: "A", 网络架构师: "C" },
    故障处理: { 网络工程师: "R", 运维主管: "A", 网络架构师: "S" },
    性能优化: { 网络工程师: "S", 运维主管: "I", 网络架构师: "R" },
    安全管理: { 网络工程师: "I", 运维主管: "R", 网络架构师: "C" },
  });

  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // 添加角色
  const handleAddRole = () => {
    setIsEditMode(false);
    setCurrentRole("");
    setIsRoleModalVisible(true);
  };

  // 编辑角色
  const handleEditRole = (role: string) => {
    setIsEditMode(true);
    setCurrentRole(role);
    setIsRoleModalVisible(true);
  };

  // 添加任务
  const handleAddTask = () => {
    setIsEditMode(false);
    setCurrentTask("");
    setIsTaskModalVisible(true);
  };

  // 编辑任务
  const handleEditTask = (task: string) => {
    setIsEditMode(true);
    setCurrentTask(task);
    setIsTaskModalVisible(true);
  };

  // 保存角色
  const handleSaveRole = () => {
    const role = currentRole.trim();
    if (!role) {
      message.error("角色名称不能为空");
      return;
    }

    if (isEditMode) {
      // 更新角色名称
      const newRoles = roles.map((r) => (r === currentRole ? role : r));
      setRoles(newRoles);

      // 更新矩阵数据
      const newMatrixData: Record<string, Record<string, string>> = {};
      for (const task in matrixData) {
        newMatrixData[task] = { ...matrixData[task] };
        if (newMatrixData[task][currentRole] !== undefined) {
          newMatrixData[task][role] = newMatrixData[task][currentRole];
          delete newMatrixData[task][currentRole];
        }
      }
      setMatrixData(newMatrixData);
    } else {
      // 添加新角色
      if (roles.includes(role)) {
        message.error("角色名称已存在");
        return;
      }
      setRoles([...roles, role]);

      // 为新角色在每个任务中添加空值
      const newMatrixData = { ...matrixData };
      for (const task in newMatrixData) {
        newMatrixData[task][role] = "";
      }
      setMatrixData(newMatrixData);
    }

    setIsRoleModalVisible(false);
  };

  // 保存任务
  const handleSaveTask = () => {
    const task = currentTask.trim();
    if (!task) {
      message.error("任务名称不能为空");
      return;
    }

    if (isEditMode) {
      // 更新任务名称
      const newTasks = tasks.map((t) => (t === currentTask ? task : t));
      setTasks(newTasks);

      // 更新矩阵数据
      const newMatrixData = { ...matrixData };
      if (newMatrixData[currentTask]) {
        newMatrixData[task] = { ...newMatrixData[currentTask] };
        delete newMatrixData[currentTask];
      }
      setMatrixData(newMatrixData);
    } else {
      // 添加新任务
      if (tasks.includes(task)) {
        message.error("任务名称已存在");
        return;
      }
      setTasks([...tasks, task]);

      // 为新任务添加所有角色的空值
      const newMatrixData = { ...matrixData };
      newMatrixData[task] = {};
      roles.forEach((role) => {
        newMatrixData[task][role] = "";
      });
      setMatrixData(newMatrixData);
    }

    setIsTaskModalVisible(false);
  };

  // 删除角色
  const handleDeleteRole = (role: string) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除角色 "${role}" 吗？`,
      onOk: () => {
        // 从角色列表中删除
        setRoles(roles.filter((r) => r !== role));

        // 从矩阵数据中删除
        const newMatrixData = { ...matrixData };
        for (const task in newMatrixData) {
          delete newMatrixData[task][role];
        }
        setMatrixData(newMatrixData);
      },
    });
  };

  // 删除任务
  const handleDeleteTask = (task: string) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除任务 "${task}" 吗？`,
      onOk: () => {
        // 从任务列表中删除
        setTasks(tasks.filter((t) => t !== task));

        // 从矩阵数据中删除
        const newMatrixData = { ...matrixData };
        delete newMatrixData[task];
        setMatrixData(newMatrixData);
      },
    });
  };

  // 更新责任类型
  const handleResponsibilityChange = (
    task: string,
    role: string,
    value: string
  ) => {
    const newMatrixData = { ...matrixData };
    if (!newMatrixData[task]) {
      newMatrixData[task] = {};
    }
    newMatrixData[task][role] = value;
    setMatrixData(newMatrixData);
  };

  // 获取责任类型的标签
  const getResponsibilityTag = (type: string) => {
    const respType = responsibilityTypes.find((r) => r.value === type);
    if (!respType) return null;

    return (
      <Tooltip title={respType.description}>
        <Tag color={respType.color}>{type}</Tag>
      </Tooltip>
    );
  };

  // 提交表单
  const handleSubmit = (values: any) => {
    console.log("表单数据:", values);
    console.log("角色:", roles);
    console.log("任务:", tasks);
    console.log("矩阵数据:", matrixData);

    message.success("责任矩阵创建成功");
    navigate("/matrix");
  };

  // 生成表格列
  const columns: TableColumnsType<DataType> = [
    {
      title: "任务/角色",
      dataIndex: "task",
      key: "task",
      fixed: "left",
      width: 150,
      render: (text: string) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{text}</span>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditTask(text)}
          />
        </div>
      ),
    },
    ...roles.map((role) => ({
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>{role}</span>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditRole(role)}
          />
        </div>
      ),
      dataIndex: role,
      key: role,
      width: 120,
      render: (text: string, record: any) => (
        <Select
          value={matrixData[record.task]?.[role] || ""}
          onChange={(value) =>
            handleResponsibilityChange(record.task, role, value)
          }
          style={{ width: "100%" }}
          placeholder="选择"
          allowClear
          dropdownMatchSelectWidth={false}
        >
          {responsibilityTypes.map((type) => (
            <Option key={type.value} value={type.value}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Tag color={type.color}>{type.value}</Tag>
                <span>{type.description}</span>
              </div>
            </Option>
          ))}
        </Select>
      ),
    })),
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_: any, record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteTask(record.task)}
        />
      ),
    },
  ];

  // 生成表格数据
  const tableData = tasks.map((task) => ({
    key: task,
    task,
    ...roles.reduce((acc, role) => {
      acc[role] = matrixData[task]?.[role] || "";
      return acc;
    }, {} as Record<string, string>),
  }));

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link> },
          { title: <Link to="/matrix">责任矩阵</Link> },
          { title: "新增责任矩阵" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: 16 }}
          onClick={() => navigate("/matrix")}
        />
        <h1>新增责任矩阵</h1>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: "draft",
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="matrixName"
                label="矩阵名称"
                rules={[{ required: true, message: "请输入矩阵名称" }]}
              >
                <Input placeholder="请输入矩阵名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="所属部门"
                rules={[{ required: true, message: "请选择所属部门" }]}
              >
                <Select placeholder="请选择">
                  <Option value="network">网络部</Option>
                  <Option value="business">业务部</Option>
                  <Option value="service">客服部</Option>
                  <Option value="data">数据部</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="矩阵描述">
            <TextArea rows={4} placeholder="请输入矩阵描述" />
          </Form.Item>

          <Form.Item name="status" label="状态">
            <Radio.Group>
              <Radio value="draft">草稿</Radio>
              <Radio value="published">发布</Radio>
            </Radio.Group>
          </Form.Item>

          <Divider orientation="left">
            <Space>
              责任矩阵
              <Tooltip title="RACIS责任矩阵用于明确各角色在不同任务中的职责和权限">
                <QuestionCircleOutlined />
              </Tooltip>
            </Space>
          </Divider>

          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddRole}
              >
                添加角色
              </Button>
              <Button icon={<PlusOutlined />} onClick={handleAddTask}>
                添加任务
              </Button>
            </Space>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Space>
              {responsibilityTypes.map((type) => (
                <Tooltip key={type.value} title={type.description}>
                  <Tag color={type.color}>{type.label}</Tag>
                </Tooltip>
              ))}
            </Space>
          </div>

          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{ x: "max-content" }}
            bordered
          />

          <Divider />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Button onClick={() => navigate("/matrix")}>取消</Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </div>
        </Form>
      </Card>

      {/* 角色编辑弹窗 */}
      <Modal
        title={isEditMode ? "编辑角色" : "添加角色"}
        open={isRoleModalVisible}
        onOk={handleSaveRole}
        onCancel={() => setIsRoleModalVisible(false)}
      >
        <Input
          placeholder="请输入角色名称"
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
        />
      </Modal>

      {/* 任务编辑弹窗 */}
      <Modal
        title={isEditMode ? "编辑任务" : "添加任务"}
        open={isTaskModalVisible}
        onOk={handleSaveTask}
        onCancel={() => setIsTaskModalVisible(false)}
      >
        <Input
          placeholder="请输入任务名称"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default MatrixCreate;
