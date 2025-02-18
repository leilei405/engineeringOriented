import { useState, useRef, useEffect } from 'react'

/* 模拟数据交互 */
function getUserInfo(a: string){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                name:a,
                age:16,
            })
        },500)
    })
}

interface ResultProps {
    name?: string;
    age?: number;
}


const EffectUseCom = ({ a }: { a:string }) => {
    const [userMessage, setUserMessage] = useState<ResultProps>({});
    const [number, setNumber] = useState(0);
    const div = useRef(null);

    /* 模拟事件监听处理函数 */
    const handleResize = () => {};

    /* useEffect使用 */
    useEffect(() => {
        /* 请求数据 */
        getUserInfo(a).then((res) => {
            setUserMessage(res as ResultProps);
        });

        /* 定时器 延时器等 */
        const timer = setInterval(() => console.log(666), 1000);

        /* 操作dom */
        console.log(div.current, '====div==='); /* div */

        /* 事件监听等 */
        window.addEventListener('resize', handleResize);

        /* 此函数用于清除副作用 */
        return function() {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
        };
        /* 只有当 props -> a 和 state -> number 改变的时候, useEffect副作用函数重新执行，如果此时数组为空[]，证明函数只有在初始化的时候执行一次，相当于componentDidMount */
    }, [a, number]);

    return (
        <div ref={div}>
            <span>{userMessage.name}</span>
            <span>{userMessage.age}</span>
            <div onClick={() => setNumber(1)}>{number}</div>
        </div>
    );
};

export default EffectUseCom