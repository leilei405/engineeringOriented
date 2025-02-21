import { memo, useCallback, useState } from "react";


function ParentComponent() {
    const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log("handleClick");
      setCount(count + 1);
  }, []);
  //   const handleClick = () => {
  //       console.log("handleClick");
  //       setCount(count + 1);
  //   }
  //   return <div>
  //       <p>Count: {count}</p>
  //       <ChildComponent handleClick={handleClick} />
  //   </div>;
    return <MemoizedChild handleClick={handleClick} />;
}

function ChildComponent(props: { handleClick: () => void }) {
    console.log("ChildComponent")
  return <button onClick={props.handleClick}>Click me</button>;
}
const MemoizedChild = memo(ChildComponent);

export default ParentComponent;