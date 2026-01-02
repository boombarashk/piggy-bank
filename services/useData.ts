"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { DEFAULT_COLORS } from "../consts";
import { getCategoriesData } from "./reducers/categories";
import { getExpensesData } from "./reducers/expenses";
import { getIncomes } from "./reducers/incomes";
import { TCategory, TColor, TData, TExpense, TIncome } from "../types";
import {
  useAppDispatch,
  useCategoriesSelector,
  useExpensesSelector,
  useIncomesSelector,
  useYearSelector,
} from "../store";

export const sumSeries = (arr: number[]): number =>
  arr.reduce((accum, currentValue) => accum + currentValue, 0);

const useData = (): Partial<TData> => {
  const [total, setTotal] = useState({} as Partial<TData>);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncomes, setTotalIncomes] = useState<number>(0);

  const selectedYear = useSelector(useYearSelector);
  const data = useSelector(useExpensesSelector);
  const categories: TCategory[] = useSelector(useCategoriesSelector);
  const incomesState = useSelector(useIncomesSelector);
  const incomes = useMemo(
    () => incomesState?.[selectedYear] ?? {},
    [incomesState, selectedYear],
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategoriesData());
    dispatch(getExpensesData());
    dispatch(getIncomes());
  }, [dispatch]);

  useEffect(() => {
    const expenses = data?.[selectedYear] as unknown as Record<
      string,
      TExpense
    >;
    const setYears = new Set([
      ...Object.keys(data ?? {}),
      ...Object.keys(incomesState).filter((key) => key !== "loading"),
    ]);

    const setMonths = new Set([
      ...Object.keys(incomes),
      ...Object.keys(expenses ?? {}),
    ]);
    const months = setYears.size > 0 ? [...setMonths] : [];

    const colors: Partial<TColor> = {};

    if (categories?.length) {
      categories.forEach((category, index) => {
        colors[category.id] =
          category.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      });
      const expensesByCategories = {} as Record<string, number>;
      const expensesByMonths = {} as TExpense;
      const incomesByMonths = {} as TIncome;

      months.forEach((month) => {
        expensesByMonths[month] = 0;
        incomesByMonths[month] = incomes?.[month] ?? 0;

        if (expenses) {
          for (const categoryId in expenses[month]) {
            if (!expensesByCategories[categoryId]) {
              expensesByCategories[categoryId] = 0;
            }

            expensesByMonths[month] += expenses[month][categoryId];

            expensesByCategories[categoryId] += expenses[month][categoryId];
          }
        }

        setTotal({
          colors,
          years: [...setYears].sort(),
          months,
          expensesByMonths,
          expensesByCategories,
          incomesByMonths,
          noEmptyCategories: categories.filter((category) =>
            Object.keys(expensesByCategories).includes(category.id),
          ),
        });
      });
    }
  }, [categories, data, incomes, incomesState]);

  useEffect(() => {
    let calculatedTotalExpenses = 0;
    for (const yearKey in data) {
      Object.values(data[yearKey]).forEach((seriesObject) => {
        calculatedTotalExpenses += sumSeries(Object.values(seriesObject));
      });
      setTotalExpenses(calculatedTotalExpenses);
    }
  }, [data]);

  useEffect(() => {
    let calculatedTotalIncomes = 0;
    for (const key in incomesState) {
      if (key !== "loading") {
        calculatedTotalIncomes += sumSeries(
          Object.values(incomesState[key] as unknown as Array<number>),
        );
      }
    }
    setTotalIncomes(calculatedTotalIncomes);
  }, [incomesState]);

  return { ...total, totalIncomes, totalExpenses };
};

export default useData;
