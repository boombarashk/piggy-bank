import React from "react";
import classNames from "classnames";
import styles from "./SubTabs.module.css";

interface ISubTabsProps {
  tabs: Array<{
    value: string;
    text: string;
    handleClick: () => void;
  }>;
  activeValue?: string;
}

function SubTabs({
  tabs = [],
  activeValue,
}: ISubTabsProps): React.ReactElement {
  return (
    <ul className={styles.subtabs}>
      {tabs.map(({ value, text, handleClick }) => (
        <li
          key={value}
          className={classNames(styles.subtab, {
            [styles.disabled]: value === activeValue,
          })}
          onClick={handleClick}>
          {text}
        </li>
      ))}
    </ul>
  );
}

export default SubTabs;
