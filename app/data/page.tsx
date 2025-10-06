"use client";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";
import {
  useAppDispatch,
  useCategoriesSelector,
  useDataSelector,
  useLoadedSelector,
} from "../../store";
import type { TExpense, TFormFieldsExpense } from "../../types";
import { CURRENT_MONTH_IND, MONTHS_RU, formatter } from "../../consts";
import { addExpense, saveData } from "@/services/reducers/data";
import Button from "@/components/Button/Button";
import NoData from "@/components/NoData/NoData";
import useData from "@/services/useData";
import styles from "./Data.module.css";

function Expenses(): React.ReactNode | null {
  const dispatch = useAppDispatch();
  const { register, control, handleSubmit, watch, reset } =
    useForm<TFormFieldsExpense>({
      defaultValues: {
        category: "",
        month: CURRENT_MONTH_IND,
        expense: "",
      },
    });
  const watcher = watch();
  const disableBtn =
    !watcher.category || !watcher.expense || Number(watcher.expense) <= 0;

  const data = useSelector(useDataSelector);
  const categories = useSelector(useCategoriesSelector);
  const loaded = useSelector(useLoadedSelector);
  const {
    noEmptyCategories,
    yearsCount = 0,
    monthsCount = 0,
    byMonths,
  } = useData();

  const year = `${new Date().getFullYear()}`;
  const expenses = data?.[year] ?? {};

  // Сохранение данных в файл
  const handleSave = useCallback(
    (formValues: TFormFieldsExpense): void => {
      if (formValues.month && formValues.category && formValues.expense) {
        const newData = addExpense({
          data,
          year,
          month: Number(formValues.month),
          categoryId: formValues.category,
          sum: Number(formValues.expense),
        });
        reset();
        dispatch(saveData(newData));
      }
    },
    [data, year, dispatch, reset],
  );

  return (
    <>
      {loaded && yearsCount === 0 && <NoData />}

      <div id="expenses" className="tab-content active">
        <form
          className={styles.expense_form}
          onSubmit={handleSubmit(handleSave)}>
          <label htmlFor="selectorCategory">Внести расход за</label>
          <select {...register("month")} name="month" className={styles.select}>
            {MONTHS_RU.map((month, ind) => (
              <option key={month} value={`${ind}`}>
                {month.toLowerCase()}
              </option>
            ))}
          </select>

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <select
                {...field}
                className={styles.select}
                id="selectorCategory">
                <option value="" disabled>
                  Выбрать категорию
                </option>
                {categories?.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            )}
          />

          <input
            {...register("expense")}
            name="expense"
            type="number"
            placeholder="Сумма"
            className={styles.input}
            step=".01"
          />

          <Button type="submit" className="ok-button" disabled={disableBtn} />
        </form>

        {yearsCount > 0 && monthsCount > 0 && (
          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `240px repeat(${monthsCount}, 1fr)`,
            }}>
            <div className={classNames(styles.sticky_column, styles.header)}>
              Категории
            </div>
            {Object.keys(expenses).map((monthInd) => (
              <div className={styles.header} key={monthInd}>
                {MONTHS_RU[Number(monthInd)]}
              </div>
            ))}

            {noEmptyCategories &&
              noEmptyCategories?.map((category, ind) => {
                const cellClassName = `${styles.cell} ${ind % 2 === 1 ? styles.lightgreen : ""}`;
                return (
                  <React.Fragment key={category.id}>
                    <div
                      className={classNames(
                        styles.sticky_column,
                        cellClassName,
                      )}>
                      {category.name}
                    </div>
                    {Object.keys(expenses).map((monthInd: string) => (
                      <div
                        className={cellClassName}
                        key={`${category.id}-${monthInd}`}>
                        {
                          (expenses[monthInd] as unknown as TExpense)?.[
                            category.id
                          ]
                        }
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}

            {byMonths && Object.keys(byMonths) && (
              <>
                <div className={styles.total} />
                {Object.values(byMonths).map((totalMonth, ind) => (
                  <div className={styles.total} key={`total-${ind}`}>
                    {formatter.format(totalMonth)}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Expenses;
