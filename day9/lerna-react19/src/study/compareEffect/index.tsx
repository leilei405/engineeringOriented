import React from 'react'

const CompareEffect = () => {
    React.useEffect(() => {
        // console.log('useEffect 执行');
    }, []);

    React.useLayoutEffect(() => {
        // console.log('useLayoutEffect 执行');
    }, []);

    React.useInsertionEffect(() => {
        // console.log('useInsertionEffect 执行');
        /* 动态创建style标签插入到head中 */
        const style = document.createElement('style');
        style.innerHTML = `
            .css-in-js {
                color: red;
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    }, []);

    return <div className="css-in-js">hello, useInsertionEffect</div>
}

export default CompareEffect