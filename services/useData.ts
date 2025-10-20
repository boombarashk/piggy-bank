"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { CURRENT_YEAR, DEFAULT_COLORS } from "../consts";
import { getCategoriesData } from "./reducers/categories";
import { getExpensesData } from "./reducers/expenses";
import { getIncomes } from "./reducers/incomes";
import { TCategory, TColor, TData, TExpense, TIncome } from "../types";
import {
  useAppDispatch,
  useCategoriesSelector,
  useExpensesSelector,
  useIncomesSelector,
} from "../store";

export const sumSeries = (arr: number[]): number =>
  arr.reduce((accum, currentValue) => accum + currentValue, 0);

const useData = (): Partial<TData> => {
  const [total, setTotal] = useState({} as Partial<TData>);

  const data = useSelector(useExpensesSelector);
  const categories: TCategory[] = useSelector(useCategoriesSelector);
  const incomesState = useSelector(useIncomesSelector);
  const incomes = useMemo(
    () => incomesState?.[CURRENT_YEAR] ?? {},
    [incomesState],
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategoriesData());
    dispatch(getExpensesData());
    dispatch(getIncomes());
  }, [dispatch]);

  useEffect(() => {
    const expenses = data?.[CURRENT_YEAR] as unknown as Record<
      string,
      TExpense
    >;
    const yearsCount: number = (!!expenses && Object.keys(data).length) || 0;
    const monthsCount: number =
      (yearsCount > 0 && !!expenses && Object.keys(expenses).length) || 0;

    const colors: Partial<TColor> = {};

    if (categories?.length && !!expenses) {
      categories.forEach((category, index) => {
        colors[category.id] =
          category.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      });
      const expensesByCategories = {} as Record<string, TExpense[]>;
      const expensesByMonths = {} as TExpense;
      const incomesByMonths = {} as TIncome;

      for (const month in expenses) {
        expensesByMonths[month] = 0;
        incomesByMonths[month] = incomes?.[month] ?? 0;

        for (const categoryId in expenses[month]) {
          if (!expensesByCategories[categoryId]) {
            expensesByCategories[categoryId] = [];
          }

          expensesByMonths[month] += expenses[month][categoryId];

          // fixme проверить - нужен ли этот объект, может стоит суммой заменить
          expensesByCategories[categoryId].push({
            [month]: expenses[month][categoryId],
          });
        }

        setTotal({
          year: CURRENT_YEAR,
          colors,
          yearsCount,
          monthsCount,
          expensesByMonths,
          expensesByCategories,
          incomesByMonths, //fixme check no zero
          noEmptyCategories: categories.filter((category) =>
            Object.keys(expensesByCategories).includes(category.id),
          ),
        });
      }
    }
  }, [categories, data, incomes]);

  return total;
};

export default useData;
