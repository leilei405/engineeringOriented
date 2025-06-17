import React, { useEffect, JSX } from 'react';

/**
 * 倒计时组件
 * @param {Object} props - 组件属性
 * @param {number} props.targetTime - 目标时间的时间戳（毫秒）
 * @returns {JSX.Element} - 渲染的倒计时组件
 */
interface PropsTypes {
    targetTime: number;
}
const Countdown = ({ targetTime }: PropsTypes): JSX.Element => {
  const [timeLeft, setTimeLeft] = React.useState(targetTime - Date.now());

    useEffect(() => {
        let timeoutId: any;
        const updateTime = () => {
            const newTimeLeft = targetTime - Date.now();
            setTimeLeft(newTimeLeft);
            if (newTimeLeft > 0) {
                // 计算距离下一秒的剩余时间，最小为 1 毫秒
                const delay = Math.max(1, 1000 - (Date.now() % 1000));
                timeoutId = setTimeout(updateTime, delay);
            }
        };
        updateTime();
        return () => clearTimeout(timeoutId);
    }, [targetTime]);

  if (timeLeft <= 0) {
    return <div>倒计时结束</div>;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
      <div style={{ color: 'red', fontSize: '20px' }}>
        倒计时组件-----剩余时间: {days} 天 {hours} 小时 {minutes} 分钟 {seconds} 秒
      </div>
  );
};

export default Countdown;