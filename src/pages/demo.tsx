import React from "react";
import styles from "./demo.module.scss";
<style>.foot{}</style>;
const page = () => {
  return (
    <div className="foot">
      <div className={styles.page}>
        <a href="#">page1</a>
      </div>
      <div className={styles.page}>
        <a href="#">page2</a>
      </div>
      <div className={styles.page}>
        <a href="#"> page3</a>
      </div>
    </div>
  );
};
export default page;
