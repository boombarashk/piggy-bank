"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

import { ID_DIALOG_ADD_PROPERTY } from "../../consts";
import {
  useAppDispatch,
  useCategoriesSelector,
  useLoadingSelector,
} from "../../store";
import Button from "@/components/Button/Button";
import Dialog, { handlerOpenDialogModal } from "@/components/Dialog/Dialog";
import DefinitionList from "@/components/DefinitionList/DefinitionList";
import NoData from "@/components/NoData/NoData";
import { saveCategories } from "@/services/reducers/categories";
import useData from "@/services/useData";

import styles from "./Categories.module.css";

function Categories(): React.ReactNode {
  const [newCategory, setNewCategory] = useState("");

  const dispatch = useAppDispatch();
  const categories = useSelector(useCategoriesSelector);
  const loading = useSelector(useLoadingSelector);
  useData();

  // Отправка списка категорий в файл
  const handleSaveCategories = (category: string): void => {
    dispatch(
      saveCategories({
        data: [...categories, { id: uuidv4(), name: category }],
      }),
    );
  };

  return (
    <div className="tab-content">
      <Head>
        <title>Категории расходов</title>
      </Head>

      <Button
        text="Добавить категорию расхода"
        clickHandler={() => handlerOpenDialogModal(ID_DIALOG_ADD_PROPERTY)}
      />

      {categories?.length === 0 && <NoData loading={loading} />}

      {categories?.length > 0 && <DefinitionList data={categories} />}

      <Dialog
        id={ID_DIALOG_ADD_PROPERTY}
        okHandler={() => {
          handleSaveCategories(newCategory);
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
