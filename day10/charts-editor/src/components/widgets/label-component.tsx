import type { ComponentData } from "../../lib/types";
// Update the import path for the SCSS module
import styles from "../../styles/widgets/label-component.module.scss";

interface LabelComponentProps {
  component: ComponentData;
}

export default function LabelComponent({ component }: LabelComponentProps) {
  return (
    <div className={styles.labelComponent}>
      <span>{component.data?.text || component.title || "文本标签"}</span>
    </div>
  );
}
