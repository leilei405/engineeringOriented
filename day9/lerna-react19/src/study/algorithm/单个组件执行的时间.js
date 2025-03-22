import React, { useEffect, useState } from 'react';

const Child = () => {
  return <div>
    <p>11111111111</p>
  </div>
}

const TimedComponent = () => {
  const [startTime, setStartTime] = useState(new Date().getTime());

  useEffect(() => {
    const endTime = new Date().getTime();
    const renderTime = endTime - startTime;
    console.log(`TimedComponent 渲染时间: ${renderTime} 毫秒`);
  });

  return (
      <div>
        <p>这是一个带计时功能的函数组件</p>
        <Child />
      </div>
  );
};

export default TimedComponent;