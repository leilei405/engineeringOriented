// 表示函数组件 对应的是 FunctionComponentFiber
export const FunctionComponent = 0;

// 表示类组件 对应的是 ClassComponentFiber
export const ClassComponent = 1;

// 表示不确定的组件 对应的是 IndeterminateComponentFiber
export const IndeterminateComponent = 2;

// 表示宿主环境根节点 对应的是 RootFiber
export const HostRoot = 3;

// 表示 Portal 组件 对应的是 HostPortalFiber
export const HostPortal = 4;

// 表示原生组件 对应的是 HostComponentFiber
export const HostComponent = 5;

// 表示文本节点 对应的是 HostTextFiber
export const HostText = 6;

// 表示 Fragment 组件 对应的是 FragmentFiber
export const Fragment = 7;

// 表示 Context.Provider 组件 对应的是 ContextProviderFiber
export const ContextProvider = 8;

// 表示 Context.Consumer 组件 对应的是 ContextConsumerFiber
export const ContextConsumer = 9;

// 表示 React.memo 组件 对应的是 MemoComponentFiber
export const MemoComponent = 10;

// 表示 React.forwardRef 组件 对应的是 ForwardRefFiber
export const ForwardRef = 11;

// 表示 React.Profiler 组件 对应的是 ProfilerFiber
export const Profiler = 12;

// 表示 React.Suspense 组件 对应的是 SuspenseComponentFiber
export const SuspenseComponent = 13;

// 表示 React.memo 组件 对应的是 SimpleMemoComponentFiber
export const SimpleMemoComponent = 14;
