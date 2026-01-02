"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart as HighChart } from "@highcharts/react";

import { Pie } from "@highcharts/react/series";
import Head from "next/head";
import { MONTHS_RU_SHORT, POINT_FORMAT } from "../../consts";
import useData from "@/services/useData";
import {
  useAppDispatch,
  useExpensesSelector,
  useMonthSelector,
  useYearSelector,
} from "../../store";
import { setSelectedMonth } from "@/services/reducers/options";
import NoData from "@/components/NoData/NoData";
import SubTabs from "@/components/SubTabs/SubTabs";
import { TExpense } from "../../types";

const Chart = (): React.ReactNode => {
  const selectedYear = useSelector(useYearSelector);
  const selectedMonth = useSelector(useMonthSelector);
  const data = useSelector(useExpensesSelector);
  const { noEmptyCategories, colors } = useData();

  const dispatch = useAppDispatch();

  const [expenses, setExpenses] = useState<TExpense>({});

  useEffect(() => {
    if (data && data[selectedYear]) {
      setExpenses(data[selectedYear]);

      const months = Object.keys(expenses ?? {});
      if (months.length > 0) {
        dispatch(setSelectedMonth(months[months.length - 1]));
      }
    }
  }, [dispatch, data, selectedYear, expenses]);

  if (!expenses || !expenses[selectedMonth]) return <NoData />;

  const expenseInMonth = Object.entries(expenses[selectedMonth]).map(
    ([categoryId, value]) => ({
      name: noEmptyCategories?.find((caterory) => caterory.id === categoryId)
        ?.name,
      y: value,
      color: colors?.[categoryId],
    }),
  );

  return (
    <>
      <Head>
        <title>Диаграмма расходов за месяц</title>
      </Head>

      <SubTabs
        activeValue={selectedMonth}
        tabs={Object.keys(expenses).map((month) => ({
          value: month,
          text: MONTHS_RU_SHORT[Number(month)],
          handleClick: () => {
            dispatch(setSelectedMonth(month));
          },
        }))}
      />

      <div id="chart" style={{ maxHeight: 360 }}>
        <HighChart
          options={{
            chart: {
              type: "pie",
            },
            title: {
              text: "",
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: "pointer",
                showInLegend: false,
              },
            },
            tooltip: {
              pointFormat: POINT_FORMAT,
            },
          }}>
          <Pie.Series data={expenseInMonth} />
        </HighChart>
      </div>
    </>
  );
};

export default Chart;
