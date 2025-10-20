"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";
import {
  useAppDispatch,
  useCategoriesSelector,
  useExpensesSelector,
  useLoadingSelector,
} from "../../store";
import type { TExpense, TFormFieldsExpense } from "../../types";
import {
  CURRENT_MONTH_IND,
  CURRENT_YEAR,
  MONTHS_RU,
  formatter,
} from "../../consts";
import { addExpense, saveExpensesData } from "@/services/reducers/expenses";
import MonthSelect from "@/components/MonthSelect/MonthSelect";
import Button from "@/components/Button/Button";
import NoData from "@/components/NoData/NoData";
import useData from "@/services/useData";
import styles from "./Expenses.module.css";

function Expenses(): React.ReactNode | null {
  const refLastColumn = useRef<HTMLDivElement>(null);
  useEffect(() => {
    refLastColumn?.current?.scrollIntoView({ block: "end" });
  });

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

  const data = useSelector(useExpensesSelector);
  const categories = useSelector(useCategoriesSelector);
  const loading = useSelector(useLoadingSelector);

  const {
    noEmptyCategories,
    yearsCount = 0,
    monthsCount = 0,
    expensesByMonths,
  } = useData();

  const expenses = data?.[CURRENT_YEAR] ?? {};

  // Сохранение данных в файл
  const handleSave = useCallback(
    (formValues: TFormFieldsExpense): void => {
      if (formValues.month && formValues.category && formValues.expense) {
        const newData = addExpense({
          data,
          year: CURRENT_YEAR,
          month: Number(formValues.month),
          categoryId: formValues.category,
          sum: Number(formValues.expense),
        });
        reset();
        dispatch(saveExpensesData(newData));
      }
    },
    [data, dispatch, reset],
  );

  return (
    <>
      <div id="expenses" className="tab-content active">
        <form className={"inlineform"} onSubmit={handleSubmit(handleSave)}>
          <label htmlFor="selectorCategory">Внести расход за</label>
          <MonthSelect {...register("month")} name="month" />

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <select {...field} className={"select"} id="selectorCategory">
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
            className={"input"}
            step=".01"
          />

          <Button type="submit" className="ok-button" disabled={disableBtn} />
        </form>

        {yearsCount === 0 && <NoData loading={loading} />}

        {yearsCount > 0 && monthsCount > 0 && (
          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `240px repeat(${monthsCount}, 1fr)`,
            }}>
            <div className={classNames(styles.sticky_column, styles.header)}>
              Категории
            </div>
            {Object.keys(expenses).map((monthInd, ind) => {
              const params: Partial<{
                ref: React.RefObject<HTMLDivElement | null>;
              }> = {};
              if (Object.keys(expenses).length === ind + 1) {
                params["ref"] = refLastColumn;
              }
              return (
                <div className={styles.header} key={monthInd} {...params}>
                  {MONTHS_RU[Number(monthInd)]}
                </div>
              );
            })}

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

            {expensesByMonths && Object.keys(expensesByMonths) && (
              <>
                <div className={styles.total} />
                {Object.values(expensesByMonths).map((totalMonth, ind) => (
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
