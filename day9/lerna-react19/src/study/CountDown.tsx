import { useState, useEffect } from 'react';

const Countdown = ({ initialTime = 60 }) => {
    // 定义倒计时的剩余时间状态
    const [timeLeft, setTimeLeft] = useState(initialTime);
    // 定义是否开始倒计时的状态
    const [isCounting, setIsCounting] = useState(false);

    // 启动倒计时
    const startCountdown = () => {
        setIsCounting(true);
    };

    // 重置倒计时
    const resetCountdown = () => {
        setIsCounting(false);
        setTimeLeft(initialTime);
    };

    useEffect(() => {
        let timer;
        const tick = () => {
            if (timeLeft > 0 && isCounting) {
                setTimeLeft(prevTime => prevTime - 1);
                // 使用 setTimeout 递归调用 tick 函数
                timer = setTimeout(tick, 1000);
            } else {
                setIsCounting(false);
            }
        };

        if (isCounting) {
            // 开始第一次计时
            timer = setTimeout(tick, 1000);
        }

        // 组件卸载或状态变化时清除定时器
        return () => clearTimeout(timer);
    }, [isCounting, timeLeft]);

    return (
        <div>
            <p>倒计时: {timeLeft} 秒</p>
            {!isCounting && <button onClick={startCountdown}>开始</button>}
            {isCounting && <button onClick={resetCountdown}>重置</button>}
        </div>
    );
};

export default Countdown;