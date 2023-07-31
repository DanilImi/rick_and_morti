import { FC } from "react";
import styles from "./error.module.scss";

export const Error: FC = () => {
  return (
    <div className={styles["error-container"]}>
      <h2 className={styles["error-heading"]}>Error</h2>
      <p className={styles["error-message"]}>Something was wrong</p>
    </div>
  );
};
