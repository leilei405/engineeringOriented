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
  Upload,
  message,
  Tabs,
  Table,
  Switch,
  InputNumber,
} from "antd";
import {
  ArrowLeftOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const TemplateCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileType, setFileType] = useState("excel");
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fields, setFields] = useState<any[]>([
    { key: "1", name: "基站名称", type: "string", required: true },
    { key: "2", name: "基站类型", type: "string", required: true },
    { key: "3", name: "所属区域", type: "string", required: true },
    { key: "4", name: "连接数", type: "number", required: false },
    { key: "5", name: "创建时间", type: "date", required: false },
  ]);

  // 上传配置
  const uploadProps: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: (file) => {
      const isValidType = checkFileType(file);
      if (!isValidType) {
        message.error(`${file.name} 不是有效的模板文件类型`);
      }
      return isValidType || Upload.LIST_IGNORE;
    },
    onChange(info) {
      let newFileList = [...info.fileList];

      // 限制只能上传一个文件
      newFileList = newFileList.slice(-1);

      // 更新状态
      setFileList(newFileList);

      if (info.file.status === "done") {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
    fileList,
  };

  // 检查文件类型
  const checkFileType = (file: any) => {
    const validTypes: Record<string, string[]> = {
      excel: [".xlsx", ".xls"],
      word: [".docx", ".doc"],
      pdf: [".pdf"],
      text: [".txt"],
    };

    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    return validTypes[fileType].includes(extension);
  };

  // 获取文件类型图标
  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "excel":
        return <FileExcelOutlined style={{ color: "#217346", fontSize: 24 }} />;
      case "word":
        return <FileWordOutlined style={{ color: "#2b579a", fontSize: 24 }} />;
      case "pdf":
        return <FilePdfOutlined style={{ color: "#f40f02", fontSize: 24 }} />;
      default:
        return <FileTextOutlined style={{ color: "#8c8c8c", fontSize: 24 }} />;
    }
  };

  // 字段表格列
  const fieldColumns = [
    {
      title: "字段名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "字段类型",
      dataIndex: "type",
      key: "type",
      render: (text: string) => {
        const typeMap: Record<string, string> = {
          string: "文本",
          number: "数字",
          date: "日期",
          boolean: "布尔值",
        };
        return typeMap[text] || text;
      },
    },
    {
      title: "是否必填",
      dataIndex: "required",
      key: "required",
      render: (required: boolean, record: any) => (
        <Switch
          checked={required}
          onChange={(checked) => {
            const newFields = fields.map((field) =>
              field.key === record.key ? { ...field, required: checked } : field
            );
            setFields(newFields);
          }}
        />
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            setFields(fields.filter((field) => field.key !== record.key));
          }}
        />
      ),
    },
  ];

  // 添加字段
  const handleAddField = () => {
    const newField = {
      key: Date.now().toString(),
      name: `字段${fields.length + 1}`,
      type: "string",
      required: false,
    };
    setFields([...fields, newField]);
  };

  // 提交表单
  const handleSubmit = (values: any) => {
    console.log("表单数据:", values);
    console.log("文件类型:", fileType);
    console.log("上传文件:", fileList);
    console.log("字段配置:", fields);

    message.success("模板创建成功");
    navigate("/templates");
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link> },
          { title: <Link to="/templates">文件模板</Link> },
          { title: "新增模板" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: 16 }}
          onClick={() => navigate("/templates")}
        />
        <h1>新增模板</h1>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            fileType: "excel",
            status: "draft",
          }}
        >
          <Tabs defaultActiveKey="basic">
            <TabPane tab="基本信息" key="basic">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="templateName"
                    label="模板名称"
                    rules={[{ required: true, message: "请输入模板名称" }]}
                  >
                    <Input placeholder="请输入模板名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="category"
                    label="模板分类"
                    rules={[{ required: true, message: "请选择模板分类" }]}
                  >
                    <Select placeholder="请选择">
                      <Option value="report">报表模板</Option>
                      <Option value="document">报告模板</Option>
                      <Option value="form">表单模板</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="description" label="模板描述">
                <TextArea rows={4} placeholder="请输入模板描述" />
              </Form.Item>

              <Form.Item
                name="fileType"
                label="文件类型"
                rules={[{ required: true, message: "请选择文件类型" }]}
              >
                <Radio.Group onChange={(e) => setFileType(e.target.value)}>
                  <Space>
                    <Radio value="excel">
                      <Space>
                        <FileExcelOutlined style={{ color: "#217346" }} /> Excel
                      </Space>
                    </Radio>
                    <Radio value="word">
                      <Space>
                        <FileWordOutlined style={{ color: "#2b579a" }} /> Word
                      </Space>
                    </Radio>
                    <Radio value="pdf">
                      <Space>
                        <FilePdfOutlined style={{ color: "#f40f02" }} /> PDF
                      </Space>
                    </Radio>
                    <Radio value="text">
                      <Space>
                        <FileTextOutlined /> 文本
                      </Space>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="上传模板文件" required>
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
                <div style={{ marginTop: 8, color: "rgba(0, 0, 0, 0.45)" }}>
                  支持上传{" "}
                  {fileType === "excel"
                    ? ".xlsx, .xls"
                    : fileType === "word"
                    ? ".docx, .doc"
                    : fileType === "pdf"
                    ? ".pdf"
                    : ".txt"}{" "}
                  格式文件
                </div>
              </Form.Item>

              <Form.Item name="status" label="状态">
                <Radio.Group>
                  <Radio value="draft">草稿</Radio>
                  <Radio value="published">发布</Radio>
                </Radio.Group>
              </Form.Item>
            </TabPane>

            <TabPane tab="字段配置" key="fields">
              <div style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddField}
                >
                  添加字段
                </Button>
              </div>

              <Table
                columns={fieldColumns}
                dataSource={fields}
                pagination={false}
                rowKey="key"
              />
            </TabPane>

            <TabPane tab="权限设置" key="permissions">
              <Form.Item name="viewPermission" label="查看权限">
                <Select placeholder="请选择" mode="multiple">
                  <Option value="all">全部</Option>
                  <Option value="network">网络部</Option>
                  <Option value="business">业务部</Option>
                  <Option value="service">客服部</Option>
                  <Option value="data">数据部</Option>
                </Select>
              </Form.Item>

              <Form.Item name="editPermission" label="编辑权限">
                <Select placeholder="请选择" mode="multiple">
                  <Option value="admin">管理员</Option>
                  <Option value="network">网络部</Option>
                  <Option value="business">业务部</Option>
                  <Option value="service">客服部</Option>
                  <Option value="data">数据部</Option>
                </Select>
              </Form.Item>

              <Form.Item name="downloadLimit" label="下载限制">
                <InputNumber
                  min={0}
                  placeholder="0表示不限制"
                  style={{ width: 200 }}
                />
              </Form.Item>
            </TabPane>
          </Tabs>

          <Divider />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Button onClick={() => navigate("/templates")}>取消</Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default TemplateCreate;
