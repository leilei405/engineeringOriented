import { useRef, forwardRef, useImperativeHandle, useState } from 'react';

interface ChildRef {
    focusInput: () => void;
    getValue: () => string;
    resetValue: () => void;
}

// 子组件（使用 forwardRef + useImperativeHandle）
const ChildComponent = forwardRef((_props, ref ) => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
        // 聚焦输入框
        focusInput: () => {
            // @ts-ignore
            inputRef.current!.focus();
        },
        // 获取输入值
        getValue: () => {
            return value;
        },
        // 重置输入
        resetValue: () => {
            setValue('');
            // @ts-ignore
            inputRef.current!.value = '';
        }
    }));

    return (
        <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="请输入内容"
        />
    );
});

// 父组件
const ParentComponent = () => {
    const childRef = useRef<ChildRef>(null);

    const handleFocus = () => {
        childRef.current!.focusInput();
    };

    const handleGetValue = () => {
        alert('子组件值: ' + childRef.current!.getValue());
    };

    const handleReset = () => {
        childRef.current!.resetValue();
    };

    return (
        <div>
            <ChildComponent ref={childRef} />
            <div style={{ marginTop: 20 }}>
                <button onClick={handleFocus}>聚焦输入框</button>
                <button onClick={handleGetValue}>获取值</button>
                <button onClick={handleReset}>重置</button>
            </div>
        </div>
    );
};

export default ParentComponent;