import PropTypes from "prop-types";

import styles from "./SubTabs.module.css";

function SubTabs({ tabs = [], activeValue }) {
  return (
    <ul className={styles.subtabs}>
      {tabs.map(({ value, text, handleClick }) => (
        <li
          key={value}
          className={`${styles.subtab} ${value === activeValue ? styles.disabled : ""}`}
          onClick={handleClick}>
          {text}
        </li>
      ))}
    </ul>
  );
}

SubTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeValue: PropTypes.string,
};

export default SubTabs;
