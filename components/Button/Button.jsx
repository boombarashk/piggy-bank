import PropTypes from "prop-types";

import styles from "./Button.module.css";

function Button({
  text = "OK",
  clickHandler = () => {},
  additionClassName = "",
  outlined,
  ...restProps
}) {
  //fixme class combination
  return (
    <button
      className={`${styles.btn} ${additionClassName} ${outlined ? styles.outlined : ""}`}
      onClick={clickHandler}
      {...restProps}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  clickHandler: PropTypes.func,
  outtlined: PropTypes.bool,
  additionClassName: PropTypes.string,
};

export default Button;
