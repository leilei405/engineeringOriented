import { useTransition, useState } from 'react';
import './index.css'
const mockList1 = new Array(20).fill('tab1').map((item,index)=>item+'--'+index )
const mockList2 = new Array(20).fill('tab2').map((item,index)=>item+'--'+index )
const mockList3 = new Array(20).fill('tab3').map((item,index)=>item+'--'+index )

const tab: {[key: string]: string[]} = {
    tab1: mockList1,
    tab2: mockList2,
    tab3: mockList3
}

function TransitionUseCom () {
    const [active, setActive] = useState('tab1') //立即响应的任务，立即更新任务
    const [renderData, setRenderData] = useState(tab[active]) //不需要立即响应的任务，过渡任务
    const [isPending, startTransition] = useTransition();

    const handleChangeTab = (activeItem: string) => {
        setActive(activeItem)       //立即更新
        startTransition(()=>{ //startTransition里面的任务优先级低
            setRenderData(tab[activeItem])
        })
    }
    return <div>
        <div className='tab' >
            { Object.keys(tab).map((item)=> <span className={active === item ? 'active' : '' } onClick={()=>handleChangeTab(item)} >{ item }</span> ) }
        </div>
        <ul className='content' >
            { isPending && <div> loading... </div> }
            { renderData.map(item=> <li key={item} >{item}</li>) }
        </ul>
    </div>
}

export default TransitionUseCom