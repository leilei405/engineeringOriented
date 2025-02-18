import React, { useEffect, useCallback, useState } from 'react'

const DemoChildren = React.memo((props: { getInfo: (s: string) => void })=>{
    console.log('子组件更新', props)
    useEffect(()=>{
        props.getInfo('子组件')
    },[])
    return <div>子组件</div>
})

const DemoUseCallback=({ id }:{id: number})=>{
    const [number, setNumber] = useState(1)

    const getInfo  = useCallback((sonName: string)=>{
        console.log(sonName)
    }, [id]) // 只有当 id 发生变化时，才会重新创建 getInfo 函数

    return (
        <div>
            <button onClick={ ()=> setNumber(number + 1) }>增加{number}</button>
            <DemoChildren getInfo={getInfo} />
        </div>
    )
}

export default DemoUseCallback