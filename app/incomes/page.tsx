"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import {
  useAppDispatch,
  useIncomesSelector,
  useYearSelector,
} from "../../store";
import { CURRENT_MONTH_IND, formatter, MONTHS_RU } from "../../consts";
import {
  addIncome,
  getIncomes,
  saveIncomes,
} from "@/services/reducers/incomes";
import { sumSeries } from "@/services/useData";
import Button from "@/components/Button/Button";
import MonthSelect from "@/components/MonthSelect/MonthSelect";
import NoData from "@/components/NoData/NoData";
import type { TFormFieldsIncome } from "../../types";

import styles from "./Incomes.module.css";

export default function Incomes() {
  const { loading, ...rest } = useSelector(useIncomesSelector);
  const selectedYear = useSelector(useYearSelector);
  const incomes = useMemo(
    () => rest?.[selectedYear] ?? {},
    [rest, selectedYear],
  );
  const months = Object.keys(incomes);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (Object.keys(incomes).length == 0) {
      dispatch(getIncomes());
    }
  }, [dispatch, incomes]);

  const { register, handleSubmit, watch, reset } = useForm<TFormFieldsIncome>({
    defaultValues: {
      month: CURRENT_MONTH_IND,
      sum: "",
    },
  });
  const watcher = watch();
  const disableBtn = !watcher.sum || Number(watcher.sum) <= 0;

  const handler = useCallback(
    (values: TFormFieldsIncome): void => {
      if (values.month && values.sum) {
        dispatch(
          saveIncomes(
            addIncome({
              data: rest,
              year: selectedYear,
              ...values,
            }),
          ),
        );
        reset();
      }
    },
    [dispatch, reset, rest, selectedYear],
  );

  return (
    <>
      <form className="inlineform" onSubmit={handleSubmit(handler)}>
        <label htmlFor="incomeInput">Внести доход за</label>
        <MonthSelect {...register("month")} name="month" />

        <input
          {...register("sum")}
          id="incomeInput"
          name="sum"
          type="number"
          placeholder="Сумма"
          className={"input"}
          step=".01"
        />

        <Button type="submit" disabled={disableBtn} />
      </form>

      {months.length === 0 && <NoData loading={loading} />}

      {months.length > 0 && (
        <>
          <div className={styles.grid}>
            {months.map((monthInd, ind) => {
              const cellClassName = ind % 2 === 1 ? "" : styles.lightgreen;
              return (
                <React.Fragment key={`income-${monthInd}`}>
                  <div className={classNames(styles.th, cellClassName)}>
                    {MONTHS_RU[Number(monthInd)]}
                  </div>
                  <div className={classNames(styles.td, cellClassName)}>
                    {formatter.format(incomes[monthInd])}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className={styles.total}>
            {formatter.format(sumSeries(Object.values(incomes)))}
          </div>
        </>
      )}
    </>
  );
}
