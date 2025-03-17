import type React from "react";
import { Table } from "antd";
import type { CanvasElement } from "../../types";

interface TableElementProps {
  element: CanvasElement;
}

const TableElement: React.FC<TableElementProps> = ({ element }) => {
  const { properties } = element;
  const {
    // tableName = "未选择表格",
    pageSize = 10,
    fontSize = 14,
    fontColor = "#000000",
    backgroundColor = "#ffffff",
    headerBgColor = "#fafafa",
    borderColor = "#e8e8e8",
    borderWidth = 1,
    borderStyle = "solid",
    columns = [
      { title: "公司", dataIndex: "company", key: "company" },
      { title: "碳排放量 (t)", dataIndex: "emission", key: "emission" },
    ],
    data = [
      { key: "1", company: "石家庄", emission: "55452" },
      { key: "2", company: "承担", emission: "55452" },
      { key: "3", company: "张家口", emission: "55452" },
      { key: "4", company: "秦皇岛", emission: "55452" },
      { key: "5", company: "唐山", emission: "55452" },
      { key: "6", company: "雄安", emission: "55452" },
      { key: "7", company: "保定", emission: "55452" },
    ],
  } = properties;

  return (
    <div
      className="table-element"
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        pointerEvents: "none",
        backgroundColor,
        border:
          borderWidth > 0
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : "none",
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize }}
        size="small"
        scroll={{ y: element.size.height - 100 }}
        style={{ fontSize: `${fontSize}px`, color: fontColor }}
        className="custom-table"
      />
      <style>
        {`
          .custom-table .ant-table-thead > tr > th {
            background-color: ${headerBgColor};
            color: ${fontColor};
            font-size: ${fontSize}px;
          }
          .custom-table .ant-table-tbody > tr > td {
            color: ${fontColor};
            font-size: ${fontSize}px;
          }
        `}
      </style>
    </div>
  );
};

export default TableElement;
