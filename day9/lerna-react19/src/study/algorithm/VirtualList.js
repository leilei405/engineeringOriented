const container = document.getElementById('container'); // 容器
const placeholder = document.getElementById('placeholder'); // 占位符
const list = document.getElementById('list'); // 列表

const totalItems = 10000; // 总数据量
const itemHeight = 30; // 每个数据项的高度
const containerHeight = container.clientHeight; // 容器高度
const visibleItems = Math.ceil(containerHeight / itemHeight); // 可见数据项数量
const buffer = 5; // 缓冲区数量
const renderCount = visibleItems + buffer * 2; // 渲染数据项数量

// 模式生成10000个数据
const data = Array.from({ length: totalItems }, (_, index) => ({
  id: index,
  value: `Item ${index}`,
}));

// 设置占位容器的高度
placeholder.style.height = `${totalItems * itemHeight}px`;

// 渲染可视区域列表
function renderVirtualList(scrollTop) {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(totalItems -1, startIndex + renderCount - 1);

  // 计算偏移量
  const offsetY = startIndex * itemHeight;
  list.style.transform = `translateY(${offsetY}px)`;

  // 渲染可见内容
  list.innerHTML = data.slice(startIndex, endIndex + 1).map(item => `<div style="color: red; height: ${itemHeight}px">${item.value}</div>`).join('');
}

// 初始化渲染
let ticking = false;
container.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      renderVirtualList(container.scrollTop);
      ticking = false;
    });
    ticking = true;
  }
});
renderVirtualList(0);
