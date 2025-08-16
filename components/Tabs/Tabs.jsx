import Link from "next/link";
import { usePathname } from "next/navigation";
import { TAB_PAGES } from "../../consts";
import styles from "./Tabs.module.css";

function Tabs() {
  const pathname = usePathname();

  return (
    <ul className={styles.tabs}>
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
