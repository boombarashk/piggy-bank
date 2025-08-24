import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  clickHandler?: () => void;
  outlined?: boolean;
  additionClassName?: string;
}

function Button({
  text = "OK",
  clickHandler = () => {},
  additionClassName = "",
  outlined,
  ...restProps
}: IButtonProps): React.ReactElement {
  return (
    <button
      className={classNames(styles.btn, additionClassName, {
        [styles.outlined]: outlined,
      })}
      onClick={clickHandler}
      {...restProps}>
      {text}
    </button>
  );
}

export default Button;
