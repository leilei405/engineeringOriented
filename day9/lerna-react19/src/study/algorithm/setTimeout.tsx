import React from "react";

export const CustomComponent = () => {
  const custom = (callback: Function, delay: number) => {
    let timer: any = 0;
    function tick() {
      timer = setTimeout(() => {
        callback();
        tick();
      }, delay);
    }
    tick();

    return () => {
      clearTimeout(timer);
    };
  };

  const stop = custom(() => {
    console.log("hello world");
  }, 1000);

  React.useEffect(() => {
    setTimeout(() => {
      console.log("stop");
      stop();
    }, 3000);
  });

  return <div>停止自定义定时器</div>;
};
