"use client";

import type React from "react";
import { useState } from "react";
import { Modal, Table, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ChartOption } from "../../types";

interface ChartSelectorProps {
  visible: boolean;
  onCancel: () => void;
  onSelect: (chartId: string, chartName: string, chartType: string) => void;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({
  visible,
  onCancel,
  onSelect,
}) => {
  const [searchParams, setSearchParams] = useState({
    businessType: "全部",
    chartType: "全部",
    name: "",
    periodType: "全部",
    status: "全部",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<ChartOption | null>(null);

  // 模拟数据，实际项目中应该从API获取
  const chartOptions: ChartOption[] = [
    {
      id: "1",
      businessType: "无线网",
      periodType: "月",
      chartType: "曲线图",
      name: "话务量月报",
      description: "本地、国际话务量",
      creator: "张XX",
      createTime: "2025-01-01",
      status: "启用",
    },
    {
      id: "2",
      businessType: "无线网",
      periodType: "月",
      chartType: "柱状图",
      name: "数据量月报",
      description: "手机、数据终端流量",
      creator: "张XX",
      createTime: "2025-01-01",
      status: "启用",
    },
    {
      id: "3",
      businessType: "无线网",
      periodType: "月",
      chartType: "饼状图",
      name: "话务量月报",
      description: "本地、国际话务量",
      creator: "张XX",
      createTime: "2025-01-01",
      status: "启用",
    },
    {
      id: "4",
      businessType: "无线网",
      periodType: "月",
      chartType: "进度图",
      name: "数据量月报",
      description: "手机、数据终端流量",
      creator: "张XX",
      createTime: "2025-01-01",
      status: "启用",
    },
  ];

  const columns = [
    { title: "序号", dataIndex: "id", key: "id" },
    { title: "业务类别", dataIndex: "businessType", key: "businessType" },
    { title: "期间类型", dataIndex: "periodType", key: "periodType" },
    { title: "图示类型", dataIndex: "chartType", key: "chartType" },
    { title: "图示名称", dataIndex: "name", key: "name" },
    { title: "图示描述", dataIndex: "description", key: "description" },
    { title: "创建人", dataIndex: "creator", key: "creator" },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    { title: "状态", dataIndex: "status", key: "status" },
  ];

  const handleSearch = () => {
    // 实际项目中这里会调用API进行搜索
    console.log("搜索参数:", searchParams);
  };

  const handleRowClick = (record: ChartOption) => {
    setSelectedRowKeys([record.id]);
    setSelectedRow(record);
  };

  const handleConfirm = () => {
    if (selectedRow) {
      onSelect(
        selectedRow.id,
        selectedRow.name,
        getChartTypeValue(selectedRow.chartType)
      );
    }
  };

  const getChartTypeValue = (chartTypeName: string): string => {
    const typeMap: Record<string, string> = {
      柱状图: "bar",
      曲线图: "line",
      饼状图: "pie",
      进度图: "progress",
    };
    return typeMap[chartTypeName] || "bar";
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys as string[]);
      const selected = chartOptions.find((item) => item.id === keys[0]);
      if (selected) {
        setSelectedRow(selected);
      }
    },
    type: "radio" as const,
  };

  return (
    <Modal
      title="图示选择"
      open={visible}
      onCancel={onCancel}
      width="80%"
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={handleConfirm}
          disabled={!selectedRow}
        >
          确定
        </Button>,
      ]}
    >
      <div className="selector-filters">
        <div className="filter-row">
          <div className="filter-item">
            <label>业务类别</label>
            <Select
              value={searchParams.businessType}
              onChange={(value) =>
                setSearchParams({ ...searchParams, businessType: value })
              }
              style={{ width: 200 }}
            >
              <Select.Option value="全部">全部</Select.Option>
              <Select.Option value="无线网">无线网</Select.Option>
              <Select.Option value="有线网">有线网</Select.Option>
            </Select>
          </div>
          <div className="filter-item">
            <label>图示类型</label>
            <Select
              value={searchParams.chartType}
              onChange={(value) =>
                setSearchParams({ ...searchParams, chartType: value })
              }
              style={{ width: 200 }}
            >
              <Select.Option value="全部">全部</Select.Option>
              <Select.Option value="柱状图">柱状图</Select.Option>
              <Select.Option value="曲线图">曲线图</Select.Option>
              <Select.Option value="饼状图">饼状图</Select.Option>
            </Select>
          </div>
          <div className="filter-item">
            <label>图示名称</label>
            <Input
              value={searchParams.name}
              onChange={(e) =>
                setSearchParams({ ...searchParams, name: e.target.value })
              }
              style={{ width: 200 }}
            />
          </div>
          <div className="filter-item">
            <label>期间类型</label>
            <Select
              value={searchParams.periodType}
              onChange={(value) =>
                setSearchParams({ ...searchParams, periodType: value })
              }
              style={{ width: 200 }}
            >
              <Select.Option value="全部">全部</Select.Option>
              <Select.Option value="日">日</Select.Option>
              <Select.Option value="月">月</Select.Option>
              <Select.Option value="年">年</Select.Option>
            </Select>
          </div>
          <div className="filter-item">
            <label>状态</label>
            <Select
              value={searchParams.status}
              onChange={(value) =>
                setSearchParams({ ...searchParams, status: value })
              }
              style={{ width: 200 }}
            >
              <Select.Option value="全部">全部</Select.Option>
              <Select.Option value="启用">启用</Select.Option>
              <Select.Option value="停用">停用</Select.Option>
            </Select>
          </div>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            className="lightning-button"
          >
            查询
          </Button>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={chartOptions}
        rowKey="id"
        pagination={{ pageSize: 10, total: 21, showSizeChanger: true }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </Modal>
  );
};

export default ChartSelector;
