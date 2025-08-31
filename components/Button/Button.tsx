import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
  clickHandler?: () => void;
  outlined?: boolean;
}

function Button({
  text = "OK",
  clickHandler = () => {},
  className,
  outlined,
  ...restProps
}: IButtonProps): React.ReactElement {
  return (
    <button
      className={classNames(styles.btn, className, {
        [styles.outlined]: outlined,
      })}
      onClick={clickHandler}
      {...restProps}>
      {text}
    </button>
  );
}

export default Button;
