import PropTypes from "prop-types";

import styles from "./Button.module.css";

function Button({ text, clickHandler, outlined, ...restProps }) {
  //fixme class combination
  return (
    <button
      className={`${styles.btn} ${outlined ? styles.outlined : ""}`}
      onClick={clickHandler}
      {...restProps}>
      {text}
    </button>
  );
}
//fixme default not working
Button.defaultProps = {
  text: "ОК",
  clickHandler: () => {},
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  outtlined: PropTypes.bool,
};

export default Button;
