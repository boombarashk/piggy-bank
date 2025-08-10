import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ID_DIALOG_ADD_PROPERTY } from "../../consts";
import Button from "@/components/Button/Button";
import Dialog, { handlerOpenDialogModal } from "@/components/Dialog/Dialog";
import {
  getCategoriesData,
  saveCategories,
} from "@/services/reducers/categories";
import styles from "./Categories.module.css";
import DefinitionList from "@/components/DefinitionList/DefinitionList";

function Categories() {
  const [newCategory, setNewCategory] = useState("");

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);

  useEffect(() => {
    // Запрашиваем категории при загрузке страницы
    dispatch(getCategoriesData());
  }, []);

  const handleSave = (category) => {
    // Отправка списка категорий на сервер
    dispatch(
      saveCategories({
        data: [...categories, { id: uuidv4(), name: category }],
      }),
    );
  };

  return (
    <div className="tab-content">
      {categories?.length === 0 && <p>Нет данных.</p>}

      <Button
        text="Добавить категорию"
        clickHandler={() => handlerOpenDialogModal(ID_DIALOG_ADD_PROPERTY)}
      />

      {categories?.length > 0 && <DefinitionList data={categories} />}

      <Dialog
        id={ID_DIALOG_ADD_PROPERTY}
        okHandler={() => {
          handleSave(newCategory);
          setNewCategory("");
        }}
        text={"Сохранить"}>
        <p>Название категории:</p>
        <input
          type="text"
          className={styles.input}
          value={newCategory}
          onChange={(ev) => setNewCategory(ev.target.value)}
        />
      </Dialog>
    </div>
  );
}

export default Categories;
