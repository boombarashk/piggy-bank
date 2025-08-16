import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_COLORS } from "../consts";
import { getCategoriesData } from "./reducers/categories";
import { getData } from "./reducers/data";

const useData = () => {
  const [total, setTotal] = useState({});

  const data = useSelector((state) => state.data);
  const categories = useSelector((state) => state.categories.data);

  const dispatch = useDispatch();
  // Запрашиваем данные при загрузке страницы
  useEffect(() => {
    dispatch(getCategoriesData());
    dispatch(getData());
  }, []);

  useEffect(() => {
    const year = `${new Date().getFullYear()}`;
    const expenses = data?.[year];
    const yearsCount = (!!expenses && Object.keys(data).length) || 0;
    const monthsCount =
      (yearsCount > 0 && !!expenses && Object.keys(expenses).length) || 0;

    const colors = {};

    if (categories?.length && !!expenses) {
      categories.forEach((category, index) => {
        colors[category.id] =
          category.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      });
      const byCategories = {};
      const byMonths = {};

      for (let month in expenses) {
        byMonths[month] = 0;

        for (let categoryId in expenses[month]) {
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
          colors,
          year,
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
