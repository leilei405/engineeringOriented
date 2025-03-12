import React from "react"
import ReactDOM from "react-dom/client"
import { ConfigProvider } from "antd"
import zhCN from "antd/lib/locale/zh_CN"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>,
)

