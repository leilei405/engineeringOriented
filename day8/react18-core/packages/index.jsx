import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))

let element = <div>
  <h1>Hello World</h1>
  <p>Hello React</p>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</div>

root.render(element)