import { useRef } from "react";
const DemoUseRef = () => {
    const dom = useRef(null);
    const handleSubmit = () => {
        // <div>表单组件</div> DOM节点
        console.log(dom.current);
    }

    const status = useRef(false);

    /* 改变状态 */
    const handleChangeStatus = () => {
        status.current = true;
    }

    return (
        <div>
            {/* ref标记当前DOM节点 */}
            <div ref={dom}>表单组件</div>
            <button onClick={handleSubmit}>提交</button>
            <div>{status.current}</div>
            <button onClick={handleChangeStatus}>change</button>
        </div>
    );
}
export default DemoUseRef