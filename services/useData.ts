"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DEFAULT_COLORS } from "../consts";
import { getCategoriesData } from "./reducers/categories";
import { getData } from "./reducers/data";
import { TCategory, TColor, TData, TExpense } from "../types";
import {
  useAppDispatch,
  useCategoriesSelector,
  useDataSelector,
} from "../store";

const useData = (): Partial<TData> => {
  const [total, setTotal] = useState({} as Partial<TData>);

  const data = useSelector(useDataSelector);
  const categories: TCategory[] = useSelector(useCategoriesSelector);

  const dispatch = useAppDispatch();
  // Запрашиваем данные при загрузке страницы
  useEffect(() => {
    dispatch(getCategoriesData());
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    const year: string = `${new Date().getFullYear()}`;
    const expenses = data?.[year] as unknown as Record<string, TExpense>;
    const yearsCount: number = (!!expenses && Object.keys(data).length) || 0;
    const monthsCount: number =
      (yearsCount > 0 && !!expenses && Object.keys(expenses).length) || 0;

    const colors: Partial<TColor> = {};

    if (categories?.length && !!expenses) {
      categories.forEach((category, index) => {
        colors[category.id] =
          category.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      });
      const byCategories = {} as Record<string, TExpense[]>;
      const byMonths = {} as TExpense;

      for (const month in expenses) {
        byMonths[month] = 0;

        for (const categoryId in expenses[month]) {
          if (!byCategories[categoryId]) {
            byCategories[categoryId] = [];
          }

          byMonths[month] += expenses[month][categoryId];

          // fixme проверить - нужен ли этот объект, может стоит суммой заменить
          byCategories[categoryId].push({
            [month]: expenses[month][categoryId],
          });
        }

        setTotal({
          year,
          colors,
          yearsCount,
          monthsCount,
          byMonths,
          byCategories,
          noEmptyCategories: categories.filter((category) =>
            Object.keys(byCategories).includes(category.id),
          ),
        });
      }
    }
  }, [categories, data]);

  return total;
};

export default useData;
