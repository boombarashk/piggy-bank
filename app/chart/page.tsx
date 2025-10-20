"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Chart as HighChart } from "@highcharts/react";

import { Pie } from "@highcharts/react/series";
import Head from "next/head";
import { CURRENT_MONTH_IND, MONTHS_RU_SHORT, POINT_FORMAT } from "../../consts";
import useData from "@/services/useData";
import NoData from "@/components/NoData/NoData";
import SubTabs from "@/components/SubTabs/SubTabs";
import { useExpensesSelector } from "../../store";

const Chart = (): React.ReactNode => {
  const data = useSelector(useExpensesSelector);
  const { year, noEmptyCategories, colors } = useData();

  const expenses = year ? data?.[year] : {};

  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH_IND);

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
            setSelectedMonth(month);
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
