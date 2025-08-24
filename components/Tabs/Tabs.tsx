import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TAB_PAGES } from "../../consts";
import styles from "./Tabs.module.css";

function Tabs(): React.ReactElement {
  const pathname = usePathname();

  return (
    <ul className={styles.tabs}>
      <li className={`${styles.tab} ${pathname === "/" ? styles.active : ""}`}>
        <Link href="/">
          <i className="material-icons">home</i>
        </Link>
      </li>
      {TAB_PAGES.map((tab) => (
        <li
          key={tab.route}
          className={`${styles.tab} ${pathname === tab.route ? styles.active : ""}`}>
          <Link href={tab.route}>{tab.text}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
