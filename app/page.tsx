"use client";
import type { Options, SeriesOptionsType } from "highcharts";
import { Chart as HighChart } from "@highcharts/react";
import {
  BG_INCOME_COLOR,
  DEFAULT_COLORS,
  formatter,
  MONTHS_RU,
  POINT_FORMAT,
  POINT_FORMAT_WITH_NAME,
} from "../consts";
import useData, { sumSeries } from "@/services/useData";

function HomePage() {
  const {
    year,
    expensesByMonths,
    incomesByMonths,
    monthsCount = 1,
  } = useData();

  if (!expensesByMonths) return null;

  const expensesByMonthsValues = Object.values(expensesByMonths);
  const incomesByMonthsValues: number[] = Object.values(incomesByMonths ?? {});
  const isIncomesDefined = incomesByMonthsValues?.find((i) => i > 0);
  let totalIncomes = 0;
  const totalExpenses = sumSeries(expensesByMonthsValues);

  const series: SeriesOptionsType[] = [
    {
      name: "Расходы",
      type: "column",
      data: expensesByMonthsValues,
      colors: DEFAULT_COLORS,
    },
  ];

  if (isIncomesDefined) {
    series.unshift({
      name: "Доходы",
      type: "column",
      data: incomesByMonthsValues,
      colors: [BG_INCOME_COLOR],
    });
    totalIncomes = sumSeries(incomesByMonthsValues);
  }

  const chartOptions: Options = {
    legend: {
      enabled: false,
    },
    chart: {
      type: "column",
    },
    title: {
      text: isIncomesDefined ? "Финансы" : `Расходы за ${year} год`,
    },
    xAxis: {
      categories: MONTHS_RU.filter((_, ind) =>
        Object.keys(expensesByMonths).includes(`${ind}`),
      ),
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    series,
    tooltip: {
      pointFormat: isIncomesDefined ? POINT_FORMAT_WITH_NAME : POINT_FORMAT,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
  };
  return (
    <>
      <HighChart options={chartOptions} />

      <p>
        &#931; расходов за текущий период:{" "}
        <b>{formatter.format(totalExpenses)}</b> (ср. расход в месяц{" "}
        <b>{formatter.format(totalExpenses / monthsCount)}</b>)
      </p>

      {isIncomesDefined && (
        <>
          <p>
            &#931; доходов: <b>{formatter.format(totalIncomes)}</b>
          </p>
          Итого: <b>{formatter.format(totalIncomes - totalExpenses)}</b>
        </>
      )}
    </>
  );
}

export default HomePage;
