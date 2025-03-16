import type { ComponentData } from "../../lib/types";
import styles from "../../styles/widgets/text-component.module.scss";

interface TextComponentProps {
  component: ComponentData;
}

export default function TextComponent({ component }: TextComponentProps) {
  return (
    <div className={styles.textComponent}>
      <div>
        {component.data?.text ||
          "这是一个文本框，可以输入任意文本内容。例如碳排放与用能分析的描述信息..."}
      </div>
    </div>
  );
}
