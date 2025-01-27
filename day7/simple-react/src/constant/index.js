// 表示 React 元素的类型
export const REACT_ELEMENT = Symbol('react.element');

// 表示 React 函数组件 forwardRef 的类型
export const REACT_FORWARD_REF = Symbol('react.forward_ref');

// 表示 React 文本节点的类型
export const REACT_TEXT_ELEMENT = Symbol('react.text.element');

// diff 算法的操作类型 移动
export const MOVE = Symbol('dom.diff.move')

// diff 算法的操作类型 创建
export const CREATE = Symbol('dom.diff.create')

// memo 组件的类型
export const REACT_MEMO = Symbol('react.memo')


// 定义常量 Symbol 类型
// 1. 防止属性名冲突
// 2. 防止属性名被修改
// 3. 防止属性名被遍历
// 4. 防止属性名被删除
// 5. 防止属性名被覆盖
// 6. 防止属性名被继承
// 7. 防止属性名被比较
// 8. 防止属性名被转换为字符串
// 9. 防止属性名被转换为布尔值
// 10. 防止属性名被转换为数字
// 11. 防止属性名被转换为对象
// 12. 防止属性名被转换为数组
// 13. 防止属性名被转换为函数
// 14. 防止属性名被转换为正则
// 15. 防止属性名被转换为日期
// 16. 防止属性名被转换为错误