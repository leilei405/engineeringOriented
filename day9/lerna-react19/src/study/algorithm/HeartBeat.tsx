import React from 'react'

const HeartBeat = () => {
    React.useEffect(() => {
        let timer = 0;
        function fn() {
            console.log('心跳')
            timer = setTimeout(fn, 1000)
        }
        timer = setTimeout(fn, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [])
    return <div>心跳组件</div>
}

export {
    HeartBeat
}