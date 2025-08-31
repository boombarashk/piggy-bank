import React, {
  DetailedHTMLProps,
  DialogHTMLAttributes,
  useEffect,
} from "react";

import Button from "../Button/Button";

import styles from "./Dialog.module.css";

interface IDialogProps
  extends DetailedHTMLProps<
    DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  id: string;
  text?: string;
  okHandler: () => void;
  withCancelButton?: boolean;
  children?: React.ReactNode;
}

export const handlerOpenDialogModal = (idDialog: string) =>
  !!idDialog &&
  (document.getElementById(idDialog) as HTMLDialogElement)?.showModal();

function Dialog({
  id,
  children,
  text,
  okHandler,
  withCancelButton = false,
}: IDialogProps): React.ReactElement {
  // close on click backdrop
  useEffect(() => {
    const closeDialog = (ev: MouseEvent) => {
      const dialog = document.getElementById(id) as HTMLDialogElement;
      const targetElement = ev.target as Element | null;
      if (!targetElement || !dialog.contains(targetElement)) return;
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

export default Dialog;
