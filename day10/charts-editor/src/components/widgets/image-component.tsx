import type { ComponentData } from "../../lib/types";
import styles from "../../styles/widgets/image-component.module.scss";

interface ImageComponentProps {
  component: ComponentData;
}

export default function ImageComponent({ component }: ImageComponentProps) {
  const imageUrl =
    component.data?.url || "/placeholder.svg?height=150&width=250";

  return (
    <div className={styles.imageComponent}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={component.title || "图片"}
          className={styles.image}
        />
      </div>
    </div>
  );
}
