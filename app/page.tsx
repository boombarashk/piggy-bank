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
    months,
    totalIncomes,
    totalExpenses,
  } = useData();

  const expensesByMonthsValues = Object.values(expensesByMonths ?? {});
  const incomesByMonthsValues: number[] = Object.values(incomesByMonths ?? {});

  const isIncomesDefined = incomesByMonthsValues?.find((i) => i > 0);

  let currentYearIncomes = 0;
  const currentYearExpenses = sumSeries(expensesByMonthsValues);

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
    currentYearIncomes = sumSeries(incomesByMonthsValues);
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
      categories: MONTHS_RU.filter((_, ind) => months?.includes(`${ind}`)),
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
      {year && <HighChart options={chartOptions} />}

      {currentYearExpenses > 0 && (
        <p>
          &#931; расходов за текущий год:{" "}
          <b>{formatter.format(currentYearExpenses)}</b>{" "}
          {expensesByMonthsValues.length > 2 && (
            <>
              (ср. расход в месяц{" "}
              <b>
                {formatter.format(
                  currentYearExpenses / expensesByMonthsValues.length,
                )}
              </b>
              )
            </>
          )}
        </p>
      )}

      {Number(isIncomesDefined) > 0 && (
        <p>
          &#931; доходов за текущий год:{" "}
          <b>{formatter.format(currentYearIncomes)}</b>
        </p>
      )}

      <>
        Остаток средств:{" "}
        <b>{formatter.format(Number(totalIncomes) - Number(totalExpenses))}</b>
      </>
    </>
  );
}

export default HomePage;
