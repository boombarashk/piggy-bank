"use client";
import type { Options } from "highcharts";
import { Chart as HighChart } from "@highcharts/react";
import { DEFAULT_COLORS, MONTHS_RU, POINT_FORMAT } from "../consts";
import useData from "@/services/useData";

function HomePage() {
  const { year, byMonths } = useData();

  if (!byMonths) return null;

  const chartOptions: Options = {
    legend: {
      enabled: false,
    },
    chart: {
      type: "column",
    },
    title: {
      text: `Расходы за ${year} год`,
    },
    xAxis: {
      categories: MONTHS_RU.filter((_, ind) =>
        Object.keys(byMonths).includes(`${ind}`),
      ),
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    series: [
      {
        type: "column",
        data: Object.values(byMonths),
      },
    ],
    tooltip: {
      pointFormat: POINT_FORMAT,
    },
    colors: DEFAULT_COLORS,
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
  };
  return <HighChart options={chartOptions} />;
}

export default HomePage;
