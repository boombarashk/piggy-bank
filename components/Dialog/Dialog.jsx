import { useEffect } from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";

import styles from "./Dialog.module.css";

export const handlerOpenDialogModal = (idDialog) =>
  !!idDialog && document.getElementById(idDialog).showModal();

function Dialog({ id, children, text, okHandler, withCancelButton = false }) {
  // close on click backdrop
  useEffect(() => {
    const closeDialog = (ev) => {
      const dialog = document.getElementById(id);
      if (!ev.target.contains(dialog)) return;
      dialog.close();
    };
    document.addEventListener("click", closeDialog);
    return () => {
      document.removeEventListener("click", closeDialog);
    };
  }, [id]);

  return (
    <dialog id={id} className={styles.popover}>
      <form method="dialog">
        {children}

        <Button value="default" text={text} clickHandler={okHandler} />
        {withCancelButton && (
          <Button text={"Отмена"} value="cancel" formMethod="dialog" outlined />
        )}
      </form>
    </dialog>
  );
}

Dialog.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  okHandler: PropTypes.func,
  withCancelButton: PropTypes.bool,
};

export default Dialog;
