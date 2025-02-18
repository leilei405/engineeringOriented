import SyncExternalStoreCom from './study/redux'
// import TransitionUseCom from './study/useTransition'
// import DeferredValueUseCom from './study/useDeferredValue'
// import EffectUseCom from './study/effect/effectUse.tsx'
import CompareEffect from './study/compareEffect'
import DemoContext from './study/useContext'
function App() {
  return (
      <div>
          <h1>Hello React</h1>
          <h2>1. SyncExternalStoreCom</h2>
          <SyncExternalStoreCom/>
          {/*<h2>2. TransitionUseCom</h2>*/}
          {/*<TransitionUseCom/>*/}
          {/*<h2>3. DeferredValueUseCom</h2>*/}
          {/*<DeferredValueUseCom />*/}
          {/*<h2>4. EffectUseCom</h2>*/}
          {/*<EffectUseCom a={"账单"} />*/}
          <h2>5. CompareEffect</h2>
          <CompareEffect />
          <h2>6. useContext</h2>
          <DemoContext />
      </div>
  )
}

export default App
