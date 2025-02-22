// let str = '123'
// const s = str.repeat(5)
// console.log(s)

import {useEffect, useState, ChangeEvent} from 'react'

function useDebounce (value: string, delay: number) {
  const [defaultValue, setDefaultValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
        setDefaultValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    }
  })
  return defaultValue;
}

function TextComponent () {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }


  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <p>输入内容：{text}</p>
      <p>防抖后内容：{debouncedText}</p>
    </div>
  )
}

export default TextComponent;